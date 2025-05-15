<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminCertification;
use App\Models\CertificationRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminCertificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $certifications = AdminCertification::all();

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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'judul' => 'required|string|max:100',
                'bidang' => 'required|in:Pengelasan,Fabrikasi,Inspeksi,Lainnya',
                'jenisSertifikat' => 'required|string|max:50',
                'tanggalMulai' => 'required|date',
                'tanggalSelesai' => 'required|date|after_or_equal:tanggalMulai',
                'jamMulai' => 'required|date_format:H:i',
                'jamSelesai' => 'required|date_format:H:i|after:jamMulai',
                'lokasi' => 'required|string|max:30',
                'metode' => 'required|in:Online,Offline,Hybrid',
                'deskripsi' => 'required|string',
                'sertifikatDidapat' => 'required|string',
                'syaratPeserta' => 'required|string',
                'fasilitas' => 'required|string',
                'kuota' => 'required|integer|min:1',
                'catatan' => 'nullable|string',
                'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();

            // Handle gambar jika ada
            if ($request->hasFile('gambar')) {
                $file = $request->file('gambar');
                $fileName = time() . '_sertifikasi.' . $file->getClientOriginalExtension();
                $file->storeAs('public/sertifikasi_admin', $fileName);
                $data['gambar'] = $fileName;
            }

            $data['createdAt'] = now();

            $certification = AdminCertification::create($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Sertifikasi berhasil dibuat',
                'data' => $certification
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membuat sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $certification = AdminCertification::findOrFail($id);

            // Hitung jumlah pendaftar
            $pendaftar = $certification->jumlahPendaftar();

            $certification->pendaftar = $pendaftar;
            $certification->tersedia = $certification->kuota - $pendaftar;

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
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $certification = AdminCertification::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'judul' => 'sometimes|string|max:100',
                'bidang' => 'sometimes|in:Pengelasan,Fabrikasi,Inspeksi,Lainnya',
                'jenisSertifikat' => 'sometimes|string|max:50',
                'tanggalMulai' => 'sometimes|date',
                'tanggalSelesai' => 'sometimes|date|after_or_equal:tanggalMulai',
                'jamMulai' => 'sometimes|date_format:H:i',
                'jamSelesai' => 'sometimes|date_format:H:i|after:jamMulai',
                'lokasi' => 'sometimes|string|max:30',
                'metode' => 'sometimes|in:Online,Offline,Hybrid',
                'deskripsi' => 'sometimes|string',
                'sertifikatDidapat' => 'sometimes|string',
                'syaratPeserta' => 'sometimes|string',
                'fasilitas' => 'sometimes|string',
                'kuota' => 'sometimes|integer|min:1',
                'catatan' => 'nullable|string',
                'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();

            // Handle gambar jika ada
            if ($request->hasFile('gambar')) {
                // Hapus gambar lama jika ada
                if ($certification->gambar) {
                    Storage::delete('public/sertifikasi_admin/' . $certification->gambar);
                }

                $file = $request->file('gambar');
                $fileName = time() . '_sertifikasi.' . $file->getClientOriginalExtension();
                $file->storeAs('public/sertifikasi_admin', $fileName);
                $data['gambar'] = $fileName;
            }

            $data['updatedAt'] = now();

            $certification->update($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Sertifikasi berhasil diperbarui',
                'data' => $certification
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $certification = AdminCertification::findOrFail($id);

            // Hapus gambar jika ada
            if ($certification->gambar) {
                Storage::delete('public/sertifikasi_admin/' . $certification->gambar);
            }

            $certification->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Sertifikasi berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get applicants for a certification.
     */
    public function getApplicants($id)
    {
        try {
            $certification = AdminCertification::findOrFail($id);

            $pendaftaran = CertificationRegistration::where('sertifikasi_id', $id)
                ->with('user')
                ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Data pendaftar berhasil diambil',
                'data' => [
                    'sertifikasi' => $certification,
                    'pendaftar' => $pendaftaran
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data pendaftar',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update application status.
     */
    public function updateApplicantStatus(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'status' => 'required|in:Diterima,Ditolak',
                'alasan' => 'required_if:status,Ditolak|nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $pendaftaran = CertificationRegistration::findOrFail($id);

            $pendaftaran->update([
                'status' => $request->status,
                'alasan' => $request->alasan,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Status pendaftaran berhasil diperbarui',
                'data' => $pendaftaran
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui status pendaftaran',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
