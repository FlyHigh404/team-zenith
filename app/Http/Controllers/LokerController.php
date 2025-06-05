<?php

namespace App\Http\Controllers;

use App\Models\Loker;
use App\Models\LokerApplicant;
use App\Models\Perusahaan;
use App\Models\PerusahaanUlasan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class LokerController extends Controller
{
    /**
     * Display a listing of available jobs with filters
     * GET /job-listings
     */
    public function index(Request $request)
    {
        try {
            $query = Loker::query()->with('perusahaan');

            // Filter berdasarkan kata kunci
            if ($request->has('keyword') && !empty($request->keyword)) {
                $keyword = $request->keyword;
                $query->where(function($q) use ($keyword) {
                    $q->where('judul', 'like', '%' . $keyword . '%')
                      ->orWhere('desc', 'like', '%' . $keyword . '%')
                      ->orWhereHas('perusahaan', function($q2) use ($keyword) {
                          $q2->where('nama', 'like', '%' . $keyword . '%');
                      });
                });
            }

            // Filter berdasarkan provinsi
            if ($request->has('provinsi') && !empty($request->provinsi)) {
                $query->where('provinsi', $request->provinsi);
            }

            // Filter berdasarkan kota
            if ($request->has('kota') && !empty($request->kota)) {
                $query->where('kota', $request->kota);
            }

            // Filter berdasarkan durasi
            if ($request->has('durasi')) {
                switch ($request->durasi) {
                    case 'jangka_pendek': // < 3 bulan
                        $query->where('durasi_bulan', '<', 3);
                        break;
                    case 'jangka_menengah': // 3-12 bulan
                        $query->where('durasi_bulan', '>=', 3)
                              ->where('durasi_bulan', '<=', 12);
                        break;
                    case 'jangka_panjang': // > 12 bulan
                        $query->where('durasi_bulan', '>', 12);
                        break;
                }
            }

            // Filter berdasarkan pengalaman
            if ($request->has('pengalaman')) {
                switch ($request->pengalaman) {
                    case 'kurang_dari_1':
                        $query->where('pengalaman', '<', 1);
                        break;
                    case '1_sampai_3':
                        $query->where('pengalaman', '>=', 1)
                              ->where('pengalaman', '<=', 3);
                        break;
                    case '3_sampai_6':
                        $query->where('pengalaman', '>', 3)
                              ->where('pengalaman', '<=', 6);
                        break;
                    case 'lebih_dari_6':
                        $query->where('pengalaman', '>', 6);
                        break;
                }
            }

            // Filter berdasarkan industri
            if ($request->has('industri')) {
                $query->whereJsonContains('jenisIndustri', $request->industri);
            }

            // Get jobs with pagination
            $loker = $query->paginate(12);

            // Tambahkan informasi format durasi dan pengalaman
            foreach ($loker as $job) {
                $job->durasi_kategori = $job->getDurasiKategoriAttribute();
                $job->pengalaman_format = $job->getFormattedPengalamanAttribute();
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
     * Display the specified job
     * GET /job-listings/{id}
     */
    public function show($id)
    {
        try {
            $loker = Loker::with('perusahaan')->findOrFail($id);
            $user = Auth::user();

            // Tambahkan informasi format durasi dan pengalaman
            $loker->durasi_kategori = $loker->getDurasiKategoriAttribute();
            $loker->pengalaman_format = $loker->getFormattedPengalamanAttribute();

            // Cek apakah user sudah mendaftar
            $application = null;
            if ($user) {
                $application = LokerApplicant::where('loker_id', $id)
                    ->where('user_id', $user->id)
                    ->first();
            }

            $loker->has_applied = $application ? true : false;
            $loker->application_status = $application ? $application->status : null;

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
     * Apply for a job with complete data and CV
     * POST /job-listings/{id}/apply
     */
    public function apply(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $loker = Loker::findOrFail($id);

            // Cek apakah sudah pernah mendaftar
            $existing = LokerApplicant::where('loker_id', $id)
                ->where('user_id', $user->id)
                ->first();

            if ($existing) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Anda sudah mendaftar ke lowongan ini',
                    'data' => $existing
                ], 400);
            }

            // Validasi input lamaran
            $validator = Validator::make($request->all(), [
                'nama' => 'required|string|max:100',
                'tanggalLahir' => 'required|date',
                'notelp' => 'required|string|max:25',
                'email' => 'required|email|max:100',
                'alamat' => 'required|string',
                'provinsi' => 'required|string|max:50',
                'kota' => 'required|string|max:50',
                'tentang' => 'required|string',
                'cv' => 'required|file|mimes:pdf|max:5120', // Max 5MB
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Upload CV
            $cvFile = $request->file('cv');
            $cvFileName = time() . '_' . $user->id . '_cv.' . $cvFile->getClientOriginalExtension();
            $cvFile->storeAs('public/cv', $cvFileName);

            // Buat lamaran baru
            $application = LokerApplicant::create([
                'loker_id' => $id,
                'user_id' => $user->id,
                'nama' => $request->nama,
                'tanggalLahir' => $request->tanggalLahir,
                'notelp' => $request->notelp,
                'email' => $request->email,
                'alamat' => $request->alamat,
                'provinsi' => $request->provinsi,
                'kota' => $request->kota,
                'tentang' => $request->tentang,
                'cv' => $cvFileName,
                'status' => 'Dilamar',
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Berhasil mendaftar ke lowongan',
                'data' => $application
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mendaftar ke lowongan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get my job applications
     * GET /job-listings/my-applications
     */
    public function myApplications(Request $request)
    {
        try {
            $user = Auth::user();
            $query = LokerApplicant::with(['loker.perusahaan'])
                ->where('user_id', $user->id);

            // Filter by status if provided
            if ($request->has('status') && in_array($request->status, ['Dilamar', 'Diterima', 'Ditolak'])) {
                $query->where('status', $request->status);
            }

            $applications = $query->orderBy('created_at', 'desc')->paginate(10);

            return response()->json([
                'status' => 'success',
                'message' => 'Data lamaran berhasil diambil',
                'data' => $applications
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data lamaran',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Review a company
     * POST /companies/{id}/review
     */
    public function reviewCompany(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $perusahaan = Perusahaan::findOrFail($id);

            // Validasi input ulasan
            $validator = Validator::make($request->all(), [
                'rating' => 'required|integer|min:1|max:5',
                'komentar' => 'nullable|string|max:500',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Cek apakah user sudah pernah mengulas
            $existingReview = PerusahaanUlasan::where('perusahaan_id', $id)
                ->where('user_id', $user->id)
                ->first();

            if ($existingReview) {
                // Update ulasan yang sudah ada
                $existingReview->update([
                    'rating' => $request->rating,
                    'komentar' => $request->komentar,
                ]);
                $review = $existingReview;
            } else {
                // Buat ulasan baru
                $review = PerusahaanUlasan::create([
                    'perusahaan_id' => $id,
                    'user_id' => $user->id,
                    'rating' => $request->rating,
                    'komentar' => $request->komentar,
                ]);
            }

            // Update rating akan dipanggil melalui event pada model PerusahaanUlasan

            return response()->json([
                'status' => 'success',
                'message' => 'Ulasan berhasil disimpan',
                'data' => $review
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menyimpan ulasan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get reviews for a company
     * GET /companies/{id}/reviews
     */
    public function getCompanyReviews($id)
    {
        try {
            $perusahaan = Perusahaan::findOrFail($id);
            $reviews = PerusahaanUlasan::with('user:id,nama,username,fotoProfil')
                ->where('perusahaan_id', $id)
                ->paginate(10);

            return response()->json([
                'status' => 'success',
                'message' => 'Data ulasan berhasil diambil',
                'data' => [
                    'perusahaan' => [
                        'id' => $perusahaan->id,
                        'nama' => $perusahaan->nama,
                        'rating' => $perusahaan->rating,
                        'jumlahUlasan' => $perusahaan->jumlahUlasan,
                    ],
                    'ulasan' => $reviews
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data ulasan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
