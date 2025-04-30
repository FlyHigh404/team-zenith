<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pengalaman;
use Illuminate\Support\Facades\Auth;

class UploadPengalamanUserController extends Controller
{
    public function uploadPengalaman(Request $request)
    {
        if ($request->has('levelProfesional') && is_string($request->levelProfesional)) {
            $decoded = json_decode($request->levelProfesional, true);
            if (is_array($decoded)) {
                $request->merge(['levelProfesional' => $decoded]);
            }
        }

        if ($request->has('masihBekerja')) {
            $request->merge([
                'masihBekerja' => filter_var($request->masihBekerja, FILTER_VALIDATE_BOOLEAN),
            ]);
        }
    
        $validated = $request->validate([
            'namaPerusahaan' => 'required|string|max:30',
            'posisi' => 'required|string|max:30',
            'levelProfesional' => 'required|array|min:1',
            'levelProfesional.*' => 'string|in:1F,2F,3F,4F,1G,2G,3G,4G,1G pipa,2G pipa,5G,6G,SMAW,GMAW,FCAW,GTAW',
            'kota' => 'required|string|max:30',
            'provinsi' => 'required|string|max:30',
            'tanggalMulai' => ['required', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/'],
            'tanggalSelesai' => [
                'nullable',
                'regex:/^(0[1-9]|1[0-2])-\d{4}$/',
                'after_or_equal:tanggalMulai'
            ],
            'masihBekerja' => 'required|boolean',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048', // Validasi file
        ], [], [
            'namaPerusahaan' => 'nama perusahaan',
            'levelProfesional' => 'level profesional',
            'tanggalMulai' => 'tanggal mulai',
            'tanggalSelesai' => 'tanggal selesai',
            'masihBekerja' => 'masih bekerja',
        ]);

        $user = Auth::user();

        // Simpan file media jika ada
        $mediaPath = null;
        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('pengalaman_media'); // Simpan file ke folder 'pengalaman_media'
        }

        // Prepare data for creation
        $pengalamanData = [
            'users_id' => $user->id,
            'namaPerusahaan' => $validated['namaPerusahaan'],
            'posisi' => $validated['posisi'],
            'levelProfesional' => $validated['levelProfesional'],
            'kota' => $validated['kota'],
            'provinsi' => $validated['provinsi'],
            'tanggalMulai' => $this->convertToDate($validated['tanggalMulai']),
            'masihBekerja' => $validated['masihBekerja'],
            'media' => $mediaPath, // Tambahkan path file media
        ];

        // Only add tanggalSelesai if not currently working
        if (!$validated['masihBekerja'] && isset($validated['tanggalSelesai'])) {
            $pengalamanData['tanggalSelesai'] = $this->convertToDate($validated['tanggalSelesai']);
        }

        // Simpan pengalaman ke database
        $pengalaman = Pengalaman::create($pengalamanData);

        return response()->json([
            'message' => 'Pengalaman berhasil diunggah.',
            'pengalaman' => $pengalaman,
        ], 201);
    }

    private function convertToDate($monthYear)
    {
        $parts = explode('-', $monthYear);
        return $parts[1] . '-' . $parts[0] . '-01'; // Format menjadi YYYY-MM-DD
    }

    public function updatePengalaman(Request $request, $id)
    {   

    $user = Auth::user();
    $pengalaman = Pengalaman::where('id', $id)
        ->where('users_id', $user->id)
        ->first();

    if (!$pengalaman) {
        return response()->json(['message' => 'Data pengalaman tidak ditemukan atau bukan milik user.'], 404);
    }

    if ($request->has('levelProfesional') && is_string($request->levelProfesional)) {
        $decoded = json_decode($request->levelProfesional, true);
        if (is_array($decoded)) {
            $request->merge(['levelProfesional' => $decoded]);
        }
    }

    if ($request->has('masihBekerja')) {
        $request->merge([
            'masihBekerja' => filter_var($request->masihBekerja, FILTER_VALIDATE_BOOLEAN),
        ]);
    }

    $validated = $request->validate([
        'namaPerusahaan' => 'sometimes|required|string|max:30',
        'posisi' => 'sometimes|required|string|max:30',
        'levelProfesional' => 'sometimes|required|array|min:1',
        'levelProfesional.*' => 'string|in:1F,2F,3F,4F,1G,2G,3G,4G,1G pipa,2G pipa,5G,6G,SMAW,GMAW,FCAW,GTAW',
        'kota' => 'sometimes|required|string|max:30',
        'provinsi' => 'sometimes|required|string|max:30',
        'tanggalMulai' => ['sometimes', 'required', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/'],
        'tanggalSelesai' => ['nullable', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/', 'after_or_equal:tanggalMulai'],
        'masihBekerja' => 'sometimes|required|boolean',
        'media' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
    ]);

    // Hapus media lama jika diganti
    if ($request->hasFile('media')) {
        if ($pengalaman->media && \Storage::exists($pengalaman->media)) {
            \Storage::delete($pengalaman->media);
        }
        $validated['media'] = $request->file('media')->store('pengalaman_media');
    }

    if (isset($validated['tanggalMulai'])) {
        $validated['tanggalMulai'] = $this->convertToDate($validated['tanggalMulai']);
    }

    if (isset($validated['tanggalSelesai'])) {
        $validated['tanggalSelesai'] = $this->convertToDate($validated['tanggalSelesai']);
    }

    $pengalaman->update($validated);

    return response()->json([
        'message' => 'Data pengalaman berhasil diperbarui.',
        'pengalaman' => $pengalaman,
    ]);
    }

    public function deletePengalaman(Request $request, $id = null)
    {
    $user = Auth::user();

    if ($id === 'all') {
        $pengalamanList = Pengalaman::where('users_id', $user->id)->get();

        foreach ($pengalamanList as $pengalaman) {
            if ($pengalaman->media && \Storage::exists($pengalaman->media)) {
                \Storage::delete($pengalaman->media);
            }
            $pengalaman->delete();
        }

        return response()->json(['message' => 'Semua data pengalaman berhasil dihapus.']);
    }

    $pengalaman = Pengalaman::where('id', $id)
        ->where('users_id', $user->id)
        ->first();

    if (!$pengalaman) {
        return response()->json(['message' => 'Data pengalaman tidak ditemukan atau bukan milik user.'], 404);
    }

    if ($pengalaman->media && \Storage::exists($pengalaman->media)) {
        \Storage::delete($pengalaman->media);
    }

    $pengalaman->delete();

    return response()->json(['message' => 'Data pengalaman berhasil dihapus.']);

    }

    public function getPengalaman()
    {
    $user = Auth::user();
    $pengalaman = Pengalaman::where('users_id', $user->id)->get();

    return response()->json([
        'message' => 'Daftar pengalaman berhasil diambil.',
        'pengalaman' => $pengalaman,
    ]);
    }
}