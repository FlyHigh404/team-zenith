<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CertificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of certifications.
     * GET /certifications
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $sertifikasi = Certification::where('user_id', $user->id)->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Data sertifikasi berhasil diambil',
                'data' => $sertifikasi
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
     * Display the specified certification.
     * GET /certifications/{id}
     */
    public function show($id)
    {
        try {
            $user = Auth::user();
            $sertifikasi = Certification::where('id', $id)
                ->where('user_id', $user->id)
                ->first();

            if (!$sertifikasi) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Sertifikasi tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Data sertifikasi berhasil diambil',
                'data' => $sertifikasi
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
     * Store a newly created certification.
     * POST /certifications
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'namaPerusahaan' => 'required|string|max:50',
                'materiSertifikasi' => 'required|string|max:50',
                'tanggalMulai' => 'required|date',
                'tanggalBerakhir' => 'nullable|date|after_or_equal:tanggalMulai',
                'media' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            ]);

            $user = Auth::user();

            // Prepare data
            $sertifikasiData = [
                'user_id' => $user->id,
                'namaPerusahaan' => $request->namaPerusahaan,
                'materiSertifikasi' => $request->materiSertifikasi,
                'tanggalMulai' => $request->tanggalMulai,
                'tanggalBerakhir' => $request->tanggalBerakhir,
            ];

            // Handle file upload
            if ($request->hasFile('media')) {
                $file = $request->file('media');
                $fileName = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('public/sertifikasi', $fileName);

                $sertifikasiData['media'] = $fileName;
            }

            $sertifikasi = Certification::create($sertifikasiData);

            return response()->json([
                'status' => 'success',
                'message' => 'Sertifikasi berhasil ditambahkan',
                'data' => $sertifikasi
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menambahkan sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified certification.
     * PUT /certifications/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $sertifikasi = Certification::where('id', $id)
                ->where('user_id', $user->id)
                ->first();

            if (!$sertifikasi) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Sertifikasi tidak ditemukan'
                ], 404);
            }

            $request->validate([
                'namaPerusahaan' => 'sometimes|string|max:50',
                'materiSertifikasi' => 'sometimes|string|max:50',
                'tanggalMulai' => 'sometimes|date',
                'tanggalBerakhir' => 'nullable|date|after_or_equal:tanggalMulai',
                'media' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            ]);

            // Kumpulkan field yang akan diupdate
            $updateData = $request->only([
                'namaPerusahaan', 'materiSertifikasi', 'tanggalMulai', 'tanggalBerakhir'
            ]);

            // Handle file upload
            if ($request->hasFile('media')) {
                // Hapus file lama jika ada
                if ($sertifikasi->media) {
                    Storage::delete('public/sertifikasi/' . $sertifikasi->media);
                }

                $file = $request->file('media');
                $fileName = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/sertifikasi', $fileName);

                $updateData['media'] = $fileName;
            }

            $sertifikasi->update($updateData);

            return response()->json([
                'status' => 'success',
                'message' => 'Sertifikasi berhasil diperbarui',
                'data' => $sertifikasi
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified certification.
     * DELETE /certifications/{id}
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();
            $sertifikasi = Certification::where('id', $id)
                ->where('user_id', $user->id)
                ->first();

            if (!$sertifikasi) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Sertifikasi tidak ditemukan'
                ], 404);
            }

            // Hapus file media jika ada
            if ($sertifikasi->media) {
                Storage::delete('public/sertifikasi/' . $sertifikasi->media);
            }

            $sertifikasi->delete();

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
     * Remove all certifications of authenticated user.
     * DELETE /certifications
     */
    public function destroyAll()
    {
        try {
            $user = Auth::user();
            $sertifikasi = Certification::where('user_id', $user->id)->get();

            foreach ($sertifikasi as $item) {
                if ($item->media) {
                    Storage::delete('public/sertifikasi/' . $item->media);
                }
                $item->delete();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Semua sertifikasi berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
