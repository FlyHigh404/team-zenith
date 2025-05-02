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
     * Menampilkan profil pengguna
     */
    public function show()
    {
        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    /**
     * Memperbarui profil pengguna
     */
    public function update(Request $request)
    {
        if ($request->has('levelProfesional') && is_string($request->levelProfesional)) {
            $decoded = json_decode($request->levelProfesional, true);
            if (is_array($decoded)) {
                $request->merge(['levelProfesional' => $decoded]);
            }
        }
    
        if ($request->has('keahlian') && is_string($request->keahlian)) {
            $decoded = json_decode($request->keahlian, true);
            if (is_array($decoded)) {
                $request->merge(['keahlian' => $decoded]);
            }
        }

        if ($request->has('pekerjaan') && is_string($request->pekerjaan)) {
            $decoded = json_decode($request->pekerjaan, true);
            if (is_array($decoded)) {
                $request->merge(['pekerjaan' => $decoded]);
            }
        }
        
        $user = Auth::user();

        // Perbarui username
        if ($request->filled('username')) {
            $user->username = $request->username;
        }

        // Perbarui nama
        if ($request->filled('nama')) {
            $user->nama = $request->nama;
        }

        // Perbarui tanggal lahir
        if ($request->filled('birthdate')) {
            $user->birthdate = $request->birthdate;
        }

        // Perbarui provinsi
        if ($request->filled('provinsi')) {
            $user->provinsi = $request->provinsi;
        }

        // Perbarui kota
        if ($request->filled('kota')) {
            $user->kota = $request->kota;
        }

        // Perbarui nomor telepon
        if ($request->filled('notelp')) {
            $user->notelp = $request->notelp;
        }

        // Perbarui level profesional
        if ($request->filled('levelProfesional')) {
            $user->levelProfesional = $request->levelProfesional;
        }

        // Perbarui keahlian
        if ($request->filled('keahlian')) {
            $user->keahlian = $request->keahlian;
        }

        // Tambahkan pekerjaan
        if ($request->filled('pekerjaan')) {
            $user->pekerjaan = $request->pekerjaan;
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

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user,
        ]);
    }

    /**
     * Mengubah password pengguna
     */
    public function changePassword(Request $request)
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
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengubah password',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
