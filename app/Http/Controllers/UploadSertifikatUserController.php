<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserSertifikat;

class UploadSertifikatUserController extends Controller
{
    public function uploadSertifikat(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'namaPerusahaan' => 'required|string|max:50',
            'materiSertifikasi' => 'required|string|max:50',
            'tanggalMulai' => ['required', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/'], // Format MM-YYYY
            'tanggalBerakhir' => [
                'nullable',
                'regex:/^(0[1-9]|1[0-2])-\d{4}$/', // Format MM-YYYY
                'after_or_equal:tanggalMulai'
            ],
            'media' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx,doc|max:25600', // Max 25MB
        ], [], [
            'namaPerusahaan' => 'nama perusahaan',
            'materiSertifikasi' => 'materi sertifikasi',
            'tanggalMulai' => 'tanggal mulai',
            'tanggalBerakhir' => 'tanggal berakhir',
            'media' => 'file media',
        ]);

        $user = Auth::user();

        // Simpan file media jika ada
        $mediaPath = null;
        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('sertifikat_media'); // Simpan file ke folder 'sertifikat_media'
        }

        // Konversi tanggal dari format MM-YYYY ke YYYY-MM-DD
        $tanggalMulai = $this->convertToDate($validated['tanggalMulai']);
        $tanggalBerakhir = $validated['tanggalBerakhir'] ? $this->convertToDate($validated['tanggalBerakhir']) : null;

        // Simpan data ke database
        $sertifikat = UserSertifikat::create([
            'user_id' => $user->id,
            'namaPerusahaan' => $validated['namaPerusahaan'],
            'materiSertifikasi' => $validated['materiSertifikasi'],
            'tanggalMulai' => $tanggalMulai,
            'tanggalBerakhir' => $tanggalBerakhir,
            'media' => $mediaPath,
        ]);

        return response()->json([
            'message' => 'Sertifikat berhasil diunggah.',
            'sertifikat' => $sertifikat,
        ], 201);
    }

    private function convertToDate($monthYear)
    {
        $parts = explode('-', $monthYear);
        return $parts[1] . '-' . $parts[0] . '-01'; // Format menjadi YYYY-MM-DD
    }

    public function updateSertifikat(Request $request, $id)
    {
    $user = Auth::user();

    $sertifikat = UserSertifikat::where('id', $id)
        ->where('user_id', $user->id)
        ->first();

    if (!$sertifikat) {
        return response()->json(['message' => 'Sertifikat tidak ditemukan atau bukan milik user.'], 404);
    }

    // Validasi input
    $validated = $request->validate([
        'namaPerusahaan' => 'nullable|string|max:50',
        'materiSertifikasi' => 'nullable|string|max:50',
        'tanggalMulai' => ['nullable', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/'],
        'tanggalBerakhir' => ['nullable', 'regex:/^(0[1-9]|1[0-2])-\d{4}$/', 'after_or_equal:tanggalMulai'],
        'media' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx,doc|max:25600',
    ]);

    // Update field jika dikirim
    if (isset($validated['namaPerusahaan'])) {
        $sertifikat->namaPerusahaan = $validated['namaPerusahaan'];
    }

    if (isset($validated['materiSertifikasi'])) {
        $sertifikat->materiSertifikasi = $validated['materiSertifikasi'];
    }

    if (isset($validated['tanggalMulai'])) {
        $sertifikat->tanggalMulai = $this->convertToDate($validated['tanggalMulai']);
    }

    if (isset($validated['tanggalBerakhir'])) {
        $sertifikat->tanggalBerakhir = $this->convertToDate($validated['tanggalBerakhir']);
    }

    if ($request->hasFile('media')) {
        // Hapus file lama
        if ($sertifikat->media && \Storage::exists($sertifikat->media)) {
            \Storage::delete($sertifikat->media);
        }

        $mediaPath = $request->file('media')->store('sertifikat_media');
        $sertifikat->media = $mediaPath;
    }

    $sertifikat->save(); // <-- Ini penting

    return response()->json([
        'message' => 'Sertifikat berhasil diperbarui.',
        'sertifikat' => $sertifikat,
    ]);
    }

    public function deleteSertifikat(Request $request, $id = null)
    {
        $user = Auth::user();

        if ($id === 'all') {
            $sertifikatList = UserSertifikat::where('user_id', $user->id)->get();

            foreach ($sertifikatList as $sertifikat) {
                if ($sertifikat->media && \Storage::exists($sertifikat->media)) {
                    \Storage::delete($sertifikat->media);
                }
                $sertifikat->delete();
            }

            return response()->json(['message' => 'Semua sertifikat berhasil dihapus.']);
        }

        // Hapus satu sertifikat
        $sertifikat = UserSertifikat::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$sertifikat) {
            return response()->json(['message' => 'Sertifikat tidak ditemukan atau bukan milik user.'], 404);
        }

        if ($sertifikat->media && \Storage::exists($sertifikat->media)) {
            \Storage::delete($sertifikat->media);
        }

        $sertifikat->delete();

        return response()->json(['message' => 'Sertifikat berhasil dihapus.']);
    }

    /**
     * Get all sertifikat for the authenticated user.
     */
    public function getSertifikat()
    {
        $user = Auth::user();
        $sertifikat = UserSertifikat::where('user_id', $user->id)->get();

        return response()->json([
            'sertifikat' => $sertifikat,
        ]);
    }
}
