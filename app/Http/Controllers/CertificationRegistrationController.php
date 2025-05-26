<?php

namespace App\Http\Controllers;

use App\Models\AdminCertification;
use App\Models\CertificationRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CertificationRegistrationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * List all available certifications
     */
    public function index()
    {
        try {
            // Ambil semua sertifikasi yang tersedia (tanggal selesai > hari ini)
            $certifications = AdminCertification::where('tanggalSelesai', '>=', now())
                ->get();

            // Tambahkan informasi jumlah pendaftar dan ketersediaan kuota
            foreach ($certifications as $certification) {
                $pendaftar = $certification->jumlahPendaftar();
                $certification->pendaftar = $pendaftar;
                $certification->tersedia = $certification->kuota - $pendaftar;
                $certification->status_pendaftaran = 'Belum Mendaftar';

                // Cek apakah user sudah mendaftar
                $user = Auth::user();
                $pendaftaran = CertificationRegistration::where('user_id', $user->id)
                    ->where('sertifikasi_id', $certification->id)
                    ->first();

                if ($pendaftaran) {
                    $certification->status_pendaftaran = $pendaftaran->status;
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Data sertifikasi berhasil diambil',
                'data' => $certifications
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get detail of a certification
     */
    public function show($id)
    {
        try {
            $certification = AdminCertification::findOrFail($id);

            // Tambahkan informasi jumlah pendaftar dan ketersediaan kuota
            $pendaftar = $certification->jumlahPendaftar();
            $certification->pendaftar = $pendaftar;
            $certification->tersedia = $certification->kuota - $pendaftar;
            $certification->status_pendaftaran = 'Belum Mendaftar';

            // Cek apakah user sudah mendaftar
            $user = Auth::user();
            $pendaftaran = CertificationRegistration::where('user_id', $user->id)
                ->where('sertifikasi_id', $certification->id)
                ->first();

            if ($pendaftaran) {
                $certification->status_pendaftaran = $pendaftaran->status;
                $certification->alasan = $pendaftaran->alasan;
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Data sertifikasi berhasil diambil',
                'data' => $certification
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Apply for a certification
     */
    public function apply(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $certification = AdminCertification::findOrFail($id);

            // Check if certification is still open
            if ($certification->tanggalSelesai < now()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Pendaftaran sertifikasi sudah ditutup'
                ], 400);
            }

            // Check if user already applied
            $existingApplication = CertificationRegistration::where('user_id', $user->id)
                ->where('sertifikasi_id', $id)
                ->first();

            if ($existingApplication) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Anda sudah mendaftar pada sertifikasi ini',
                    'data' => $existingApplication
                ], 400);
            }

            // Check if quota is still available
            if (!$certification->isAvailable()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Kuota sertifikasi sudah penuh'
                ], 400);
            }

            // Create registration
            $pendaftaran = CertificationRegistration::create([
                'user_id' => $user->id,
                'sertifikasi_id' => $id,
                'status' => 'Menunggu'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Pendaftaran sertifikasi berhasil',
                'data' => $pendaftaran
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mendaftar sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cancel application
     */
    public function cancel($id)
    {
        try {
            $user = Auth::user();

            $pendaftaran = CertificationRegistration::where('user_id', $user->id)
                ->where('sertifikasi_id', $id)
                ->first();

            if (!$pendaftaran) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Pendaftaran tidak ditemukan'
                ], 404);
            }

            // Only allow cancellation if status is still "Menunggu"
            if ($pendaftaran->status !== 'Menunggu') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Pendaftaran tidak dapat dibatalkan karena status sudah ' . $pendaftaran->status
                ], 400);
            }

            $pendaftaran->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Pendaftaran berhasil dibatalkan'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membatalkan pendaftaran',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * List user's certification applications
     */
    public function myApplications()
    {
        try {
            $user = Auth::user();

            $pendaftaran = CertificationRegistration::where('user_id', $user->id)
                ->with('sertifikasi')
                ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Data pendaftaran berhasil diambil',
                'data' => $pendaftaran
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data pendaftaran',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
