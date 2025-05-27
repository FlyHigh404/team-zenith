<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Loker;
use App\Models\LokerApplicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminLokerController extends Controller
{
    /**
     * Display a listing of job listings
     * GET /admin/job-listings
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $loker = Loker::where('user_id', $user->id)->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Daftar lowongan berhasil diambil',
                'data' => $loker
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil daftar lowongan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created job listing
     * POST /admin/job-listings
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'judul' => 'required|string|max:100',
                'desc' => 'required|string',
                'durasi' => 'required|in:Full Time,Part Time,Contract,Internship',
                'lokasi' => 'required|string|max:100',
                'pengalaman' => 'required|in:< 1 tahun,1-3 tahun,3-5 tahun,> 5 tahun',
                'jenisIndustri' => 'required|in:Pengelasan,Manufaktur,Konstruksi,Otomotif,Minyak & Gas,Industri Berat,Lainnya',
                'gaji' => 'required|in:< Rp5.000.000,Rp5.000.000 - Rp10.000.000,> Rp10.000.000,Negosiasi',
                'tanggalMulai' => 'required|date',
                'tanggalSelesai' => 'required|date|after_or_equal:tanggalMulai',
                'kualifikasi' => 'required|string',
                'detail' => 'nullable|array',
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
            $data['user_id'] = Auth::id();
            $data['createdAt'] = now();

            // Handle upload gambar
            if ($request->hasFile('gambar')) {
                $file = $request->file('gambar');
                $fileName = time() . '_loker.' . $file->getClientOriginalExtension();
                $file->storeAs('public/loker', $fileName);
                $data['gambar'] = $fileName;
            }

            $loker = Loker::create($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Lowongan berhasil dibuat',
                'data' => $loker
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membuat lowongan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified job listing
     * GET /admin/job-listings/{id}
     */
    public function show($id)
    {
        try {
            $user = Auth::user();
            $loker = Loker::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            return response()->json([
                'status' => 'success',
                'message' => 'Detail lowongan berhasil diambil',
                'data' => $loker
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil detail lowongan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified job listing
     * PUT /admin/job-listings/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $loker = Loker::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            $validator = Validator::make($request->all(), [
                'judul' => 'sometimes|string|max:100',
                'desc' => 'sometimes|string',
                'durasi' => 'sometimes|in:Full Time,Part Time,Contract,Internship',
                'lokasi' => 'sometimes|string|max:100',
                'pengalaman' => 'sometimes|in:< 1 tahun,1-3 tahun,3-5 tahun,> 5 tahun',
                'jenisIndustri' => 'sometimes|in:Pengelasan,Manufaktur,Konstruksi,Otomotif,Minyak & Gas,Industri Berat,Lainnya',
                'gaji' => 'sometimes|in:< Rp5.000.000,Rp5.000.000 - Rp10.000.000,> Rp10.000.000,Negosiasi',
                'tanggalMulai' => 'sometimes|date',
                'tanggalSelesai' => 'sometimes|date|after_or_equal:tanggalMulai',
                'kualifikasi' => 'sometimes|string',
                'detail' => 'nullable|array',
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
            $data['updatedAt'] = now();

            // Handle upload gambar
            if ($request->hasFile('gambar')) {
                // Hapus gambar lama jika ada
                if ($loker->gambar) {
                    Storage::delete('public/loker/' . $loker->gambar);
                }

                $file = $request->file('gambar');
                $fileName = time() . '_loker.' . $file->getClientOriginalExtension();
                $file->storeAs('public/loker', $fileName);
                $data['gambar'] = $fileName;
            }

            $loker->update($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Lowongan berhasil diperbarui',
                'data' => $loker
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui lowongan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified job listing
     * DELETE /admin/job-listings/{id}
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();
            $loker = Loker::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            // Hapus gambar jika ada
            if ($loker->gambar) {
                Storage::delete('public/loker/' . $loker->gambar);
            }

            $loker->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Lowongan berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus lowongan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get applicants for a job listing
     * GET /admin/job-listings/{id}/applicants
     */
    public function getApplicants($id)
    {
        try {
            $user = Auth::user();
            $loker = Loker::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            $applicants = LokerApplicant::with('user')
                ->where('loker_id', $id)
                ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Data pelamar berhasil diambil',
                'data' => [
                    'loker' => $loker,
                    'pelamar' => $applicants
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data pelamar',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update applicant status
     * PUT /admin/job-listings/applicants/{id}
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

            $applicant = LokerApplicant::findOrFail($id);

            // Verifikasi bahwa lowongan ini milik user yang sedang login
            $loker = Loker::where('id', $applicant->loker_id)
                ->where('user_id', Auth::id())
                ->firstOrFail();

            $applicant->update([
                'status' => $request->status,
                'alasan' => $request->alasan,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Status pelamar berhasil diperbarui',
                'data' => $applicant
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui status pelamar',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
