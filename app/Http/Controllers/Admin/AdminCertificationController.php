<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminCertification;
use App\Models\CertificationRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminCertificationController extends Controller
{
    /**
     * Display a listing of the certifications
     * GET /admin/certification-lists
     */
    public function index()
    {
        try {
            // Get all certifications, no restrictions by user
            $certifications = AdminCertification::all();

            // Add registration count for each certification
            foreach ($certifications as $certification) {
                $certification->pendaftar = $certification->jumlahPendaftar();
                $certification->tersedia = $certification->kuota - $certification->pendaftar;
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Daftar sertifikasi berhasil diambil',
                'data' => $certifications
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil daftar sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created certification
     * POST /admin/certification-lists
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'judul' => 'required|string|max:100',
                'bidang' => 'required|in:Pengelasan,Fabrikasi,Inspeksi,Lainnya',
                'jenisSertifikat' => 'required|string|max:50',
                'tanggalMulai' => 'required|date|after_or_equal:today',
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
        } catch (\Illuminate\Database\QueryException $e) {
            \Log::error('Database error when creating certification program: ' . $e->getMessage());

            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Program sertifikasi dengan judul yang sama sudah ada'
                ], 409);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan pada database',
                'error' => config('app.debug') ? $e->getMessage() : 'Database error'
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Error when creating certification program: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membuat program sertifikasi',
                'error' => config('app.debug') ? $e->getMessage() : 'Server error'
            ], 500);
        }
    }

    /**
     * Display the specified certification
     * GET /admin/certification-lists/{id}
     */
    public function show($id)
    {
        try {
            $certification = AdminCertification::findOrFail($id);

            // Tambahkan informasi jumlah pendaftar dan ketersediaan kuota
            $pendaftar = $certification->jumlahPendaftar();
            $certification->pendaftar = $pendaftar;
            $certification->tersedia = $certification->kuota - $pendaftar;

            return response()->json([
                'status' => 'success',
                'message' => 'Detail sertifikasi berhasil diambil',
                'data' => $certification
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil detail sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified certification
     * PUT /admin/certification-lists/{id}
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
     * Remove the specified certification
     * DELETE /admin/certification-lists/{id}
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
     * Get applicants for a certification
     * GET /admin/certification-lists/{id}/applicants
     */
    public function getApplicants($id)
    {
        try {
            $certification = AdminCertification::findOrFail($id);
            $applicants = CertificationRegistration::with('user')
                ->where('sertifikasi_id', $id)
                ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Data pendaftar berhasil diambil',
                'data' => [
                    'sertifikasi' => $certification,
                    'pendaftar' => $applicants
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
     * Update applicant status
     * PUT /admin/certification-lists/applicants/{id}
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

            $pendaftaran = CertificationRegistration::find($id);

            if (!$pendaftaran) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data pendaftaran tidak ditemukan'
                ], 404);
            }

            if ($pendaftaran->status !== 'Menunggu') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Status pendaftaran sudah diproses sebelumnya',
                    'current_status' => $pendaftaran->status
                ], 400);
            }

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
            \Log::error('Error updating certification applicant status: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui status pendaftaran',
                'error' => config('app.debug') ? $e->getMessage() : 'Server error'
            ], 500);
        }
    }

    /**
     * Get statistics of certification programs
     * GET /admin/certification-lists/statistics
     */
    public function getStatistics()
    {
        try {
            // Hitung total program sertifikasi
            $totalPrograms = AdminCertification::count();

            // Hitung total pendaftar untuk semua program
            $registrations = CertificationRegistration::query();

            $totalRegistrations = $registrations->count();
            $menungguRegistrations = (clone $registrations)->where('status', 'Menunggu')->count();
            $diterimaRegistrations = (clone $registrations)->where('status', 'Diterima')->count();
            $ditolakRegistrations = (clone $registrations)->where('status', 'Ditolak')->count();

            // Statistik per bidang
            $pengelasanPrograms = AdminCertification::where('bidang', 'Pengelasan')->count();
            $fabrikasiPrograms = AdminCertification::where('bidang', 'Fabrikasi')->count();
            $inspeksiPrograms = AdminCertification::where('bidang', 'Inspeksi')->count();
            $lainnyaPrograms = AdminCertification::where('bidang', 'Lainnya')->count();

            // Program yang akan datang vs yang sudah lewat
            $upcomingPrograms = AdminCertification::where('tanggalMulai', '>=', now())->count();
            $pastPrograms = AdminCertification::where('tanggalSelesai', '<', now())->count();
            $ongoingPrograms = AdminCertification::where('tanggalMulai', '<=', now())
                ->where('tanggalSelesai', '>=', now())
                ->count();

            // Top 5 program paling banyak pendaftarnya
            $topPrograms = AdminCertification::withCount('pendaftaran')
                ->orderBy('pendaftaran_count', 'desc')
                ->limit(5)
                ->get()
                ->map(function($program) {
                    return [
                        'id' => $program->id,
                        'judul' => $program->judul,
                        'bidang' => $program->bidang,
                        'pendaftar' => $program->pendaftaran_count,
                        'kuota' => $program->kuota,
                        'persentase' => $program->kuota > 0 ?
                            round(($program->pendaftaran_count / $program->kuota) * 100, 1) : 0
                    ];
                });

            return response()->json([
                'status' => 'success',
                'message' => 'Statistik sertifikasi berhasil diambil',
                'data' => [
                    'total_programs' => $totalPrograms,
                    'total_registrations' => $totalRegistrations,
                    'menunggu_registrations' => $menungguRegistrations,
                    'diterima_registrations' => $diterimaRegistrations,
                    'ditolak_registrations' => $ditolakRegistrations,
                    'by_category' => [
                        'pengelasan' => $pengelasanPrograms,
                        'fabrikasi' => $fabrikasiPrograms,
                        'inspeksi' => $inspeksiPrograms,
                        'lainnya' => $lainnyaPrograms
                    ],
                    'by_schedule' => [
                        'upcoming' => $upcomingPrograms,
                        'ongoing' => $ongoingPrograms,
                        'past' => $pastPrograms
                    ],
                    'top_programs' => $topPrograms
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil statistik sertifikasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
