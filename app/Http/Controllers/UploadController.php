<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Sertifikasi;

class UploadController extends Controller
{
    /**
     * Update user profile with photo, status, and description.
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'status' => 'required|in:available,notavailable',
            'desc' => 'nullable|string|max:500',
            'fotoProfil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = Auth::user();

        if ($request->hasFile('fotoProfil')) {
            // Delete old profile photo if exists
            if ($user->fotoProfil) {
                Storage::delete($user->fotoProfil);
            }

            // Store new profile photo
            $path = $request->file('fotoProfil')->store('profile_photos');
            $user->fotoProfil = $path;
        }

        $user->status = $request->status;
        $user->desc = $request->desc;
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user,
        ]);
    }

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

    /**
     * Get all certifications of the authenticated user.
     */
    public function getCertifications()
    {
        $user = Auth::user();

        // Ambil semua sertifikasi milik user
        $certifications = Sertifikasi::where('users_id', $user->id)->get();

        return response()->json([
            'message' => 'Certifications retrieved successfully.',
            'certifications' => $certifications,
        ]);
    }
}
