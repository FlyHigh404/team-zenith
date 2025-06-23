<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ActiveUserController extends Controller
{
    /**
     * Menampilkan daftar user yang sedang aktif, kecuali user yang sedang login dan admin, paginate 10 per halaman.
     */
    public function index(Request $request)
    {
        $currentUserId = Auth::id(); // Ambil ID user yang login

        $users = User::where('is_active', true)
            ->where('id', '!=', $currentUserId)       // Kecualikan user login
            ->select('id', 'fotoProfil', 'nama', 'username', 'pekerjaan', 'levelProfesional')
            ->paginate(10);

        return response()->json([
            'status' => 'success',
            'message' => 'Daftar pengguna aktif berhasil diambil',
            'data' => $users
        ]);
    }

    /**
     * Get user by ID.
     */
    public function getUserById($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Data user berhasil diambil',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
