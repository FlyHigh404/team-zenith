<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Loker;
use App\Models\LokerApplicant;
use App\Models\Perusahaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AdminLokerController extends Controller
{
    /**
     * Display a listing of job listings
     * GET /admin/job-listings
     */
    public function index(Request $request)
    {
        try {
            // Ambil semua perusahaan (tidak dibatasi per user)
            $query = Loker::query();

            // Filter berdasarkan perusahaan jika disediakan
            if ($request->has('perusahaan_id')) {
                $query->where('perusahaan_id', $request->perusahaan_id);
            }

            $loker = $query->with('perusahaan')->get();

            // Hitung jumlah pelamar untuk setiap lowongan
            foreach ($loker as $job) {
                $job->total_applicants = $job->jumlahApplicants();

                // Hitung jumlah per status
                $job->dilamar_applicants = $job->applicants()->where('status', 'Dilamar')->count();
                $job->diterima_applicants = $job->applicants()->where('status', 'Diterima')->count();
                $job->ditolak_applicants = $job->applicants()->where('status', 'Ditolak')->count();

                // Tambahkan kategori durasi
                $job->durasi_kategori = $job->getDurasiKategoriAttribute();
            }

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
                'nama' => 'required|string|max:100',
                'deskripsi' => 'required|string',
                'alamat' => 'required|string',
                'kota' => 'required|string|max:50',
                'provinsi' => 'required|string|max:50',
                'notelp' => 'nullable|string|max:25',
                'email' => 'nullable|email|max:100',
                'jumlahPegawai' => 'required|integer|min:1',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
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

            // Handle upload logo
            if ($request->hasFile('logo')) {
                $file = $request->file('logo');
                $fileName = time() . '_company_logo.' . $file->getClientOriginalExtension();
                $file->storeAs('public/company', $fileName);
                // Simpan path RELATIF dari storage/public
                $data['logo'] = 'company/' . $fileName;
            }

            $company = Perusahaan::create($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Perusahaan berhasil dibuat',
                'data' => $company
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membuat perusahaan',
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
            // Ambil loker tanpa filter user_id
            $loker = Loker::with('perusahaan')->findOrFail($id);

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
            // Ambil loker tanpa filter user_id
            $loker = Loker::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'perusahaan_id' => 'sometimes|exists:perusahaan,id',
                'judul' => 'sometimes|string|max:100',
                'desc' => 'sometimes|string',
                'durasi_bulan' => 'sometimes|integer|min:1',
                'pengalaman' => 'sometimes|integer|min:0',
                'lokasi' => 'sometimes|string|max:100',
                'provinsi' => 'sometimes|string|max:50',
                'kota' => 'sometimes|string|max:50',
                'jenisIndustri' => 'sometimes|array',
                'jenisIndustri.*' => 'string',
                'gaji' => 'sometimes|integer|min:0',
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
            // Ambil loker tanpa filter user_id
            $loker = Loker::findOrFail($id);

            // Hapus gambar jika ada
            if ($loker->gambar) {
                Storage::delete('public/loker/' . $loker->gambar);
            }

            // Hapus CV dari semua pelamar
            $applicants = LokerApplicant::where('loker_id', $id)->get();
            foreach ($applicants as $applicant) {
                if ($applicant->cv) {
                    Storage::delete('public/cv/' . $applicant->cv);
                }
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
     * Get applicants for a job listing with pagination and filtering
     * GET /admin/job-listings/{id}/applicants
     */
    public function getApplicants(Request $request, $id)
    {
        try {
            // Verifikasi loker ada (tanpa filter user_id)
            $loker = Loker::findOrFail($id);

            $query = LokerApplicant::with('user')
                ->where('loker_id', $id);

            // Filter by status if provided
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Sorting
            $sortBy = $request->input('sort_by', 'created_at');
            $sortDir = $request->input('sort_dir', 'desc');
            $query->orderBy($sortBy, $sortDir);

            $applicants = $query->paginate(10);

            // Tambahkan umur untuk setiap pelamar
            foreach ($applicants as $applicant) {
                $applicant->umur = Carbon::parse($applicant->tanggalLahir)->age;
            }

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

            $applicant = LokerApplicant::find($id);

            if (!$applicant) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data pelamar tidak ditemukan'
                ], 404);
            }

            if ($applicant->status !== 'Dilamar') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Status pelamar sudah diproses sebelumnya',
                    'current_status' => $applicant->status
                ], 400);
            }

            $applicant->update([
                'status' => $request->status,
                'alasan' => $request->alasan,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Status pelamar berhasil diperbarui',
                'data' => $applicant
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            \Log::error('Database error when updating applicant status: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan pada database',
                'error' => config('app.debug') ? $e->getMessage() : 'Database error'
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Error when updating applicant status: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui status pelamar',
                'error' => config('app.debug') ? $e->getMessage() : 'Server error'
            ], 500);
        }
    }

    /**
     * Get statistics of applications
     * GET /admin/job-listings/statistics
     */
    public function getStatistics()
    {
        try {
            // Hitung total lowongan (semua, tidak dibatasi oleh user)
            $totalLoker = Loker::count();

            // Hitung total pelamar untuk semua lowongan
            $applicants = LokerApplicant::query();

            $totalApplicants = $applicants->count();
            $dilamarApplicants = (clone $applicants)->where('status', 'Dilamar')->count();
            $diterimaApplicants = (clone $applicants)->where('status', 'Diterima')->count();
            $ditolakApplicants = (clone $applicants)->where('status', 'Ditolak')->count();

            return response()->json([
                'status' => 'success',
                'message' => 'Statistik berhasil diambil',
                'data' => [
                    'total_loker' => $totalLoker,
                    'total_applicants' => $totalApplicants,
                    'dilamar_applicants' => $dilamarApplicants,
                    'diterima_applicants' => $diterimaApplicants,
                    'ditolak_applicants' => $ditolakApplicants,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil statistik',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
