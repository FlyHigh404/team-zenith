<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display the authenticated user's profile.
     * GET /profile
     */
    public function show()
    {
        try {
            $user = Auth::user();

            return response()->json([
                'status' => 'success',
                'message' => 'Data profil berhasil diambil',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the authenticated user's profile.
     * PUT /profile
     */
    public function update(Request $request)
    {
        try {
            $user = Auth::user();

            $request->validate([
                'nama' => 'sometimes|string|max:30',
                'username' => 'sometimes|string|min:3|max:20|unique:users,username,' . $user->id,
                'email' => 'sometimes|email|unique:users,email,' . $user->id,
                'desc' => 'nullable|string|max:100',
                'birthdate' => 'sometimes|date',
                'notelp' => 'sometimes|string|max:25',
                'provinsi' => 'sometimes|string|max:50',
                'kota' => 'sometimes|string|max:50',
                'levelProfesional' => 'sometimes|array',
                'keahlian' => 'sometimes|array',
                'fotoProfil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'pekerjaan' => 'sometimes|array'
            ]);

            // Kumpulkan field yang akan diupdate
            $updateData = $request->only([
                'nama', 'username', 'email', 'desc', 'birthdate',
                'notelp', 'provinsi', 'kota', 'levelProfesional', 'keahlian'
            ]);

            // Filter nilai null/kosong
            $updateData = array_filter($updateData, function ($value) {
                return $value !== null;
            });

            // Handle foto profil jika ada
            if ($request->hasFile('fotoProfil')) {
                // Hapus foto lama jika ada
                if ($user->fotoProfil) {
                    Storage::delete('public/profiles/' . $user->fotoProfil);
                }

                // Upload foto baru
                $file = $request->file('fotoProfil');
                $fileName = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/profiles', $fileName);

                $updateData['fotoProfil'] = $fileName;
            }

                    // Tambahkan pekerjaan
        if ($request->filled('pekerjaan')) {
            $user->pekerjaan = $request->pekerjaan;
        }

            // Update user
            $user->update($updateData);

            return response()->json([
                'status' => 'success',
                'message' => 'Profil berhasil diperbarui',
                'data' => $user
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
                'message' => 'Gagal memperbarui profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user password.
     * PUT /profile/change-password
     */
    public function updatePassword(Request $request)
    {
        try {
            $user = Auth::user();

            $request->validate([
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:6|different:current_password',
                'confirm_password' => 'required|same:new_password',
            ]);

            // Verifikasi password lama
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password saat ini tidak sesuai'
                ], 422);
            }

            // Update password
            $user->update([
                'password' => Hash::make($request->new_password)
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Password berhasil diubah'
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
                'message' => 'Gagal mengubah password',
                'error' => $e->getMessage()
            ], 500);
        }
    }

        public function deletePhoto()
    {
        try {
            $user = Auth::user();

            if (!$user->fotoProfil) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Foto profil tidak ditemukan'
                ], 404);
            }

            // Hapus file dari storage
            Storage::delete('public/profiles/' . $user->fotoProfil);

            // Set kolom fotoProfil menjadi null
            $user->fotoProfil = null;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Foto profil berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus foto profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
