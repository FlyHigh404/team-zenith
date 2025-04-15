<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Sertifikasi;

class SertifikasiController extends Controller
{
    /**
     * Upload user certifications.
     */
    public function uploadCertification(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:30',
            'tanggalisu' => 'nullable|date',
            'tanggalExpired' => 'nullable|date',
            'levelSertifikasi' => 'nullable|string|max:20',
            'jenisSertifikat' => 'nullable|string|max:50',
            'media' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Only image files
        ]);

        $user = Auth::user();

        // Store certification file
        $path = $request->file('media')->store('certifications');

        // Save certification data to database
        $sertifikasi = Sertifikasi::create([
            'users_id' => $user->id,
            'nama' => $request->nama,
            'tanggalisu' => $request->tanggalisu,
            'tanggalExpired' => $request->tanggalExpired,
            'levelSertifikasi' => $request->levelSertifikasi,
            'jenisSertifikat' => $request->jenisSertifikat,
            'media' => $path,
        ]);

        return response()->json([
            'message' => 'Certification uploaded successfully.',
            'sertifikasi' => $sertifikasi,
        ]);
    }
}
