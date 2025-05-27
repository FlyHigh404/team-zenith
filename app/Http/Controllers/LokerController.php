<?php

namespace App\Http\Controllers;

use App\Models\Loker;
use App\Models\LokerApplicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LokerController extends Controller
{
    /**
     * Display a listing of the available jobs
     * GET /job-listings
     */
    public function index(Request $request)
    {
        try {
            $query = Loker::query();

            // Filter by durasi (jika ada)
            if ($request->has('durasi')) {
                $query->where('durasi', $request->durasi);
            }

            // Filter by lokasi (jika ada)
            if ($request->has('lokasi')) {
                $query->where('lokasi', 'like', '%' . $request->lokasi . '%');
            }

            // Filter by pengalaman (jika ada)
            if ($request->has('pengalaman')) {
                $query->where('pengalaman', $request->pengalaman);
            }

            // Filter by jenisIndustri (jika ada)
            if ($request->has('jenisIndustri')) {
                $query->where('jenisIndustri', $request->jenisIndustri);
            }

            // Filter by gaji (jika ada)
            if ($request->has('gaji')) {
                $query->where('gaji', $request->gaji);
            }

            // Filter by keyword/judul (jika ada)
            if ($request->has('keyword')) {
                $query->where('judul', 'like', '%' . $request->keyword . '%')
                      ->orWhere('desc', 'like', '%' . $request->keyword . '%');
            }

            // Get jobs with pagination
            $loker = $query->paginate(10);

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
            $loker = Loker::findOrFail($id);
            $user = Auth::user();

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
     * Apply for a job with experience and CV
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
                'nama' => 'required|string|max:30',
                'notelp' => 'required|string|max:25',
                'alamat' => 'nullable|string|max:50',
                'tentang' => 'nullable|string',
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
                'notelp' => $request->notelp,
                'alamat' => $request->alamat,
                'tentang' => $request->tentang,
                'cv' => $cvFileName,
                'status' => 'Menunggu',
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
    public function myApplications()
    {
        try {
            $user = Auth::user();

            $applications = LokerApplicant::with('loker')
                ->where('user_id', $user->id)
                ->get();

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
}
