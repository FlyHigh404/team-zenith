<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UploadProfileController extends Controller
{
    /**
     * Update user profile with photo and description.
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'desc' => 'nullable|string|max:500',
            'fotoProfil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = Auth::user();

        // Hapus foto profil jika diminta
        if ($request->removeFotoProfil && $user->fotoProfil) {
            Storage::delete($user->fotoProfil);
            $user->fotoProfil = null;
        }

        // Hapus deskripsi jika diminta
        if ($request->removeDesc) {
            $user->desc = null;
        }

        // Perbarui foto profil jika ada file baru
        if ($request->hasFile('fotoProfil')) {
            // Hapus foto profil lama jika ada
            if ($user->fotoProfil) {
                Storage::delete($user->fotoProfil);
            }

            // Simpan foto profil baru
            $path = $request->file('fotoProfil')->store('profile_photos');
            $user->fotoProfil = $path;
        }

        // Perbarui deskripsi jika diberikan
        if ($request->desc) {
            $user->desc = $request->desc;
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user,
        ]);
    }

    /**
     * Delete user profile photo.
     */
    public function deletePhoto()
    {
        $user = Auth::user();

        if ($user->fotoProfil) {
            // Hapus file foto profil dari storage
            Storage::delete($user->fotoProfil);
            $user->fotoProfil = null;
            $user->save();

            return response()->json([
                'message' => 'Profile photo deleted successfully.',
            ]);
        }

        return response()->json([
            'message' => 'No profile photo to delete.',
        ], 404);
    }

    /**
     * Delete user description.
     */
    public function deleteDesc()
    {
        $user = Auth::user();

        if ($user->desc) {
            $user->desc = null;
            $user->save();

            return response()->json([
                'message' => 'Description deleted successfully.',
            ]);
        }

        return response()->json([
            'message' => 'No description to delete.',
        ], 404);
    }
}