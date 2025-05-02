<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Koneksi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class KoneksiController extends Controller
{
    /**
     * Ajukan permintaan koneksi ke pengguna lain.
     */
    public function ajukanKoneksi(Request $request)
    {
        $request->validate([
            'koneksi_user_id' => 'required|exists:users,id',
        ]);

        $user = Auth::user();

        // Cek apakah pengguna mencoba mengirim permintaan koneksi ke dirinya sendiri
        if ($user->id == $request->koneksi_user_id) {
            return response()->json([
                'message' => 'Anda tidak dapat mengirim permintaan koneksi ke diri sendiri.',
            ], 400);
        }

        // Cek apakah sudah ada permintaan koneksi yang belum diterima
        $pendingKoneksi = Koneksi::where('user_id', $user->id)
            ->where('koneksi_user_id', $request->koneksi_user_id)
            ->first();

        if ($pendingKoneksi) {
            return response()->json([
                'message' => 'Permintaan koneksi sudah diajukan sebelumnya.',
            ], 400);
        }

        // Cek apakah sudah ada koneksi dua arah (sudah saling terhubung)
        $existingKoneksi = Koneksi::where(function ($query) use ($user, $request) {
            $query->where('user_id', $user->id)
                  ->where('koneksi_user_id', $request->koneksi_user_id);
        })->orWhere(function ($query) use ($user, $request) {
            $query->where('user_id', $request->koneksi_user_id)
                  ->where('koneksi_user_id', $user->id);
        })->first();

        if ($existingKoneksi) {
            return response()->json([
                'message' => 'Anda sudah saling koneksi.',
            ], 400);
        }

        // Buat permintaan koneksi baru
        Koneksi::create([
            'user_id' => $user->id,
            'koneksi_user_id' => $request->koneksi_user_id,
            'status' => 'diajukan',
            'tanggalKoneksi' => now(),
        ]);

        return response()->json([
            'message' => 'Permintaan koneksi berhasil diajukan.',
        ], 201);
    }

    /**
 * Batalkan permintaan koneksi yang diajukan.
 */
    public function batalkanAjuanKoneksi(Request $request)
    {
        $request->validate([
            'koneksi_user_id' => 'required|exists:users,id',
        ]);

        $user = Auth::user();

        // Cari permintaan koneksi yang diajukan oleh pengguna
        $koneksi = Koneksi::where('user_id', $user->id)
            ->where('koneksi_user_id', $request->koneksi_user_id)
            ->where('status', 'diajukan')
            ->first();

        if (!$koneksi) {
            return response()->json([
                'message' => 'Permintaan koneksi tidak ditemukan atau sudah diproses.',
            ], 404);
        }

        // Hapus permintaan koneksi
        $koneksi->delete();

        return response()->json([
            'message' => 'Permintaan koneksi berhasil dibatalkan.',
        ]);
    }

    /**
     * Setujui permintaan koneksi.
     */
    public function setujuiKoneksi(Request $request)
    {
        $request->validate([
            'koneksi_user_id' => 'required|exists:users,id',
        ]);

        $user = Auth::user();

        // Cari permintaan koneksi
        $koneksi = Koneksi::where('user_id', $request->koneksi_user_id)
            ->where('koneksi_user_id', $user->id)
            ->where('status', 'diajukan')
            ->first();

        if (!$koneksi) {
            return response()->json([
                'message' => 'Permintaan koneksi tidak ditemukan.',
            ], 404);
        }

        // Cek apakah permintaan koneksi sudah diterima (sudah saling koneksi)
        $existingKoneksi = Koneksi::where('user_id', $user->id)
            ->where('koneksi_user_id', $request->koneksi_user_id)
            ->first();

        if ($existingKoneksi) {
            return response()->json([
                'message' => 'Anda sudah saling koneksi.',
            ], 400);
        }

        // Tambahkan koneksi balik untuk menyetujui permintaan
        Koneksi::create([
            'user_id' => $user->id,
            'koneksi_user_id' => $request->koneksi_user_id,
            'status' => 'diterima',
            'tanggalKoneksi' => now(),
        ]);

        return response()->json([
            'message' => 'Permintaan koneksi berhasil disetujui.',
        ]);
    }

    /**
     * Tolak permintaan koneksi.
     */
    public function tolakKoneksi(Request $request)
    {
        $request->validate([
            'koneksi_user_id' => 'required|exists:users,id',
        ]);

        $user = Auth::user();

        // Cari permintaan koneksi
        $koneksi = Koneksi::where('user_id', $request->koneksi_user_id)
            ->where('koneksi_user_id', $user->id)
            ->where('status', 'diajukan')
            ->first();

        if (!$koneksi) {
            return response()->json([
                'message' => 'Permintaan koneksi tidak ditemukan.',
            ], 404);
        }

        // Perbarui status koneksi menjadi "ditolak"
    $koneksi->update(['status' => 'ditolak']);

    return response()->json([
        'message' => 'Permintaan koneksi berhasil ditolak.',
    ]);
    }

        /**
     * Hapus koneksi yang sudah saling terhubung.
     */
    public function hapusKoneksi(Request $request)
    {
        $request->validate([
            'koneksi_user_id' => 'required|exists:users,id',
        ]);

        $user = Auth::user();

        // Cari koneksi yang sudah saling terhubung
        $koneksi = Koneksi::where(function ($query) use ($user, $request) {
            $query->where('user_id', $user->id)
                ->where('koneksi_user_id', $request->koneksi_user_id);
        })->orWhere(function ($query) use ($user, $request) {
            $query->where('user_id', $request->koneksi_user_id)
                ->where('koneksi_user_id', $user->id);
        })->where('status', 'diterima')
        ->first();

        if (!$koneksi) {
            return response()->json([
                'message' => 'Koneksi tidak ditemukan.',
            ], 404);
        }

        // Hapus koneksi
        $koneksi->delete();

        return response()->json([
            'message' => 'Koneksi berhasil dihapus.',
        ]);
    }

    /**
     * Ambil daftar koneksi pengguna yang sedang login.
     */
    public function getKoneksi(Request $request)
    {
        $user = Auth::user();

        // Validasi input untuk status koneksi (opsional)
        $request->validate([
            'status' => 'nullable|in:diterima,diajukan,ditolak',
        ]);

        // Ambil koneksi berdasarkan status (jika diberikan)
        $query = Koneksi::where(function ($query) use ($user) {
            $query->where('user_id', $user->id)
                  ->orWhere('koneksi_user_id', $user->id);
        });

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $koneksi = $query->get();

        return response()->json([
            'message' => 'Daftar koneksi berhasil diambil.',
            'data' => $koneksi,
        ]);
    }
}
