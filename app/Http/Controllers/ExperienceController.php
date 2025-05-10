<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ExperienceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of experiences.
     * GET /experience
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $pengalaman = Experience::where('users_id', $user->id)->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Daftar pengalaman berhasil diambil',
                'data' => $pengalaman
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil daftar pengalaman',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified experience.
     * GET /experience/{id}
     */
    public function show($id)
    {
        try {
            $user = Auth::user();
            $pengalaman = Experience::where('id', $id)
                ->where('users_id', $user->id)
                ->first();

            if (!$pengalaman) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data pengalaman tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Data pengalaman berhasil diambil',
                'data' => $pengalaman
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data pengalaman',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created experience.
     * POST /experience
     */
    public function store(Request $request)
    {
        try {
            // Parse JSON data
            $this->parseJsonFields($request);

            // Validasi input
            $validated = $request->validate([
                'namaPerusahaan' => 'required|string|max:30',
                'posisi' => 'required|string|max:30',
                'levelProfesional' => 'required|array|min:1',
                'levelProfesional.*' => 'string',
                'kota' => 'required|string|max:30',
                'provinsi' => 'required|string|max:30',
                'tanggalMulai' => ['required', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/'],
                'tanggalSelesai' => [
                    'nullable',
                    'regex:/^(0[1-9]|1[0-2])-\d{4}$/',
                    'after_or_equal:tanggalMulai'
                ],
                'masihBekerja' => 'required|boolean',
                'media' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            ]);

            $user = Auth::user();

            // Prepare data
            $pengalamanData = [
                'users_id' => $user->id,
                'namaPerusahaan' => $validated['namaPerusahaan'],
                'posisi' => $validated['posisi'],
                'levelProfesional' => $validated['levelProfesional'],
                'kota' => $validated['kota'],
                'provinsi' => $validated['provinsi'],
                'tanggalMulai' => $this->convertToDate($validated['tanggalMulai']),
                'masihBekerja' => $validated['masihBekerja'],
            ];

            // Handle media upload
            if ($request->hasFile('media')) {
                $file = $request->file('media');
                $fileName = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('public/pengalaman', $fileName);
                $pengalamanData['media'] = $fileName;
            }

            // Add tanggalSelesai if not currently working
            if (!$validated['masihBekerja'] && isset($validated['tanggalSelesai'])) {
                $pengalamanData['tanggalSelesai'] = $this->convertToDate($validated['tanggalSelesai']);
            }

            // Save experience to database
            $pengalaman = Experience::create($pengalamanData);

            return response()->json([
                'status' => 'success',
                'message' => 'Pengalaman berhasil ditambahkan',
                'data' => $pengalaman
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
                'message' => 'Gagal menambahkan pengalaman',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified experience.
     * PUT /experience/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $pengalaman = Experience::where('id', $id)
                ->where('users_id', $user->id)
                ->first();

            if (!$pengalaman) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data pengalaman tidak ditemukan atau bukan milik pengguna'
                ], 404);
            }

            // Parse JSON data
            $this->parseJsonFields($request);

            // Validasi input
            $validated = $request->validate([
                'namaPerusahaan' => 'sometimes|required|string|max:30',
                'posisi' => 'sometimes|required|string|max:30',
                'levelProfesional' => 'sometimes|required|array|min:1',
                'levelProfesional.*' => 'string',
                'kota' => 'sometimes|required|string|max:30',
                'provinsi' => 'sometimes|required|string|max:30',
                'tanggalMulai' => ['sometimes', 'required', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/'],
                'tanggalSelesai' => ['nullable', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/', 'after_or_equal:tanggalMulai'],
                'masihBekerja' => 'sometimes|required|boolean',
                'media' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            ]);

            // Handle media upload
            if ($request->hasFile('media')) {
                if ($pengalaman->media && Storage::exists('public/pengalaman/' . $pengalaman->media)) {
                    Storage::delete('public/pengalaman/' . $pengalaman->media);
                }

                $file = $request->file('media');
                $fileName = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/pengalaman', $fileName);
                $validated['media'] = $fileName;
            }

            // Convert dates
            if (isset($validated['tanggalMulai'])) {
                $validated['tanggalMulai'] = $this->convertToDate($validated['tanggalMulai']);
            }

            if (isset($validated['tanggalSelesai'])) {
                $validated['tanggalSelesai'] = $this->convertToDate($validated['tanggalSelesai']);
            }

            // Update experience
            $pengalaman->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Data pengalaman berhasil diperbarui',
                'data' => $pengalaman
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
                'message' => 'Gagal memperbarui pengalaman',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified experience(s).
     * DELETE /experience/{id?}
     */
    public function destroy($id = null)
    {
        try {
            $user = Auth::user();

            // Delete all experiences if id is 'all'
            if ($id === 'all') {
                $pengalamanList = Experience::where('users_id', $user->id)->get();

                foreach ($pengalamanList as $pengalaman) {
                    if ($pengalaman->media && Storage::exists('public/pengalaman/' . $pengalaman->media)) {
                        Storage::delete('public/pengalaman/' . $pengalaman->media);
                    }
                    $pengalaman->delete();
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Semua data pengalaman berhasil dihapus'
                ]);
            }

            // Delete specific experience
            $pengalaman = Experience::where('id', $id)
                ->where('users_id', $user->id)
                ->first();

            if (!$pengalaman) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data pengalaman tidak ditemukan atau bukan milik pengguna'
                ], 404);
            }

            // Delete associated file if exists
            if ($pengalaman->media && Storage::exists('public/pengalaman/' . $pengalaman->media)) {
                Storage::delete('public/pengalaman/' . $pengalaman->media);
            }

            $pengalaman->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Data pengalaman berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus pengalaman',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Convert MM-YYYY to YYYY-MM-DD format
     */
    private function convertToDate($monthYear)
    {
        $parts = explode('-', $monthYear);
        return $parts[1] . '-' . $parts[0] . '-01'; // Format menjadi YYYY-MM-DD
    }

    /**
     * Parse JSON fields from request
     */
    private function parseJsonFields(Request $request)
    {
        // Parse levelProfesional from JSON if needed
        if ($request->has('levelProfesional') && is_string($request->levelProfesional)) {
            $decoded = json_decode($request->levelProfesional, true);
            if (is_array($decoded)) {
                $request->merge(['levelProfesional' => $decoded]);
            }
        }

        // Convert masihBekerja to boolean
        if ($request->has('masihBekerja')) {
            $request->merge([
                'masihBekerja' => filter_var($request->masihBekerja, FILTER_VALIDATE_BOOLEAN),
            ]);
        }
    }
}
