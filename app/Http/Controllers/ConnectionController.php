<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Koneksi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ConnectionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of connections.
     * GET /connections
     */
    public function index(Request $request)
    {
        try {
            $user = Auth::user();

            // Validasi input untuk status koneksi (opsional)
            $request->validate([
                'status' => 'nullable|in:diajukan,diterima,ditolak',
            ]);

            $query = Koneksi::where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhere('koneksi_user_id', $user->id);
            });

            // Filter berdasarkan status jika ada
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $koneksi = $query->get();

            // Format data koneksi
            $formattedKoneksi = $koneksi->map(function ($item) use ($user) {
                $otherUserId = ($item->user_id == $user->id) ? $item->koneksi_user_id : $item->user_id;
                $otherUser = User::find($otherUserId);

                return [
                    'id' => $item->id,
                    'user_id' => $otherUserId,
                    'username' => $otherUser->username,
                    'nama' => $otherUser->nama,
                    'status' => $item->status,
                    'tanggalKoneksi' => $item->tanggalKoneksi,
                    'isSender' => $item->user_id == $user->id,
                ];
            });

            return response()->json([
                'status' => 'success',
                'message' => 'Daftar koneksi berhasil diambil',
                'data' => $formattedKoneksi
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
                'message' => 'Gagal mengambil daftar koneksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created connection request.
     * POST /connections
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'koneksi_user_id' => 'required|exists:users,id',
            ]);

            $user = Auth::user();

            // Cek apakah pengguna mencoba mengirim permintaan koneksi ke dirinya sendiri
            if ($user->id == $request->koneksi_user_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Anda tidak dapat mengirim permintaan koneksi ke diri sendiri'
                ], 400);
            }

            // Cek apakah sudah ada permintaan koneksi yang belum diterima
            $pendingKoneksi = Koneksi::where('user_id', $user->id)
                ->where('koneksi_user_id', $request->koneksi_user_id)
                ->first();

            if ($pendingKoneksi) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Anda sudah mengirim permintaan koneksi ke pengguna ini'
                ], 400);
            }

            // Cek apakah sudah ada permintaan koneksi dari pengguna lain
            $incomingKoneksi = Koneksi::where('user_id', $request->koneksi_user_id)
                ->where('koneksi_user_id', $user->id)
                ->first();

            if ($incomingKoneksi) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Pengguna ini sudah mengirim permintaan koneksi kepada Anda'
                ], 400);
            }

            // Buat permintaan koneksi baru
            $koneksi = Koneksi::create([
                'user_id' => $user->id,
                'koneksi_user_id' => $request->koneksi_user_id,
                'status' => 'diajukan',
                'tanggalKoneksi' => now(),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Permintaan koneksi berhasil diajukan',
                'data' => $koneksi
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
                'message' => 'Gagal mengajukan permintaan koneksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the status of a connection request.
     * PUT /connections/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'action' => 'required|in:accept,reject',
            ]);

            $user = Auth::user();
            $koneksi = Koneksi::findOrFail($id);

            // Pastikan bahwa permintaan koneksi memang ditujukan untuk pengguna ini
            if ($koneksi->koneksi_user_id != $user->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Permintaan koneksi ini tidak ditujukan untuk Anda'
                ], 403);
            }

            // Pastikan bahwa status masih 'diajukan'
            if ($koneksi->status != 'diajukan') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Permintaan koneksi ini sudah diproses sebelumnya'
                ], 400);
            }

            if ($request->action === 'accept') {
                // Terima permintaan koneksi
                $koneksi->status = 'diterima';
                $koneksi->save();

                // Tambahkan koneksi balik untuk menyetujui permintaan
                $existingKoneksi = Koneksi::where('user_id', $user->id)
                    ->where('koneksi_user_id', $koneksi->user_id)
                    ->first();

                if (!$existingKoneksi) {
                    Koneksi::create([
                        'user_id' => $user->id,
                        'koneksi_user_id' => $koneksi->user_id,
                        'status' => 'diterima',
                        'tanggalKoneksi' => now(),
                    ]);
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Permintaan koneksi berhasil diterima',
                    'data' => $koneksi
                ]);
            } else {
                // Tolak permintaan koneksi
                $koneksi->status = 'ditolak';
                $koneksi->save();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Permintaan koneksi berhasil ditolak',
                    'data' => $koneksi
                ]);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Permintaan koneksi tidak ditemukan'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memproses permintaan koneksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cancel a connection request or remove an existing connection.
     * DELETE /connections/{id}
     */
    public function destroy(Request $request, $id = null)
    {
        try {
            $user = Auth::user();

            if ($id) {
                // Handle removing a specific connection
                $koneksi = Koneksi::findOrFail($id);

                // Verify that the connection belongs to the user
                if ($koneksi->user_id != $user->id && $koneksi->koneksi_user_id != $user->id) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Koneksi ini bukan milik Anda'
                    ], 403);
                }

                // If connection is 'diterima', remove both sides of the connection
                if ($koneksi->status === 'diterima') {
                    // Delete the opposite connection too
                    Koneksi::where('user_id', $koneksi->koneksi_user_id)
                          ->where('koneksi_user_id', $koneksi->user_id)
                          ->delete();
                }

                $koneksi->delete();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Koneksi berhasil dihapus'
                ]);
            } else {
                // User must provide koneksi_user_id when id is not given
                $request->validate([
                    'koneksi_user_id' => 'required|exists:users,id',
                ]);

                // Find the connection
                $koneksi = Koneksi::where(function ($query) use ($user, $request) {
                    $query->where('user_id', $user->id)
                        ->where('koneksi_user_id', $request->koneksi_user_id);
                })->orWhere(function ($query) use ($user, $request) {
                    $query->where('user_id', $request->koneksi_user_id)
                        ->where('koneksi_user_id', $user->id);
                })->get();

                if ($koneksi->isEmpty()) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Koneksi tidak ditemukan'
                    ], 404);
                }

                foreach ($koneksi as $item) {
                    $item->delete();
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Koneksi berhasil dihapus'
                ]);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Koneksi tidak ditemukan'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus koneksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show details of a specific connection.
     * GET /connections/{id}
     */
    public function show($id)
    {
        try {
            $user = Auth::user();
            $koneksi = Koneksi::findOrFail($id);

            // Pastikan koneksi ini milik user yang sedang login
            if ($koneksi->user_id != $user->id && $koneksi->koneksi_user_id != $user->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Anda tidak memiliki akses ke koneksi ini'
                ], 403);
            }

            // Ambil detail user lain dalam koneksi ini
            $otherUserId = ($koneksi->user_id == $user->id) ? $koneksi->koneksi_user_id : $koneksi->user_id;
            $otherUser = User::find($otherUserId);

            $detailKoneksi = [
                'id' => $koneksi->id,
                'user_id' => $otherUserId,
                'username' => $otherUser->username,
                'nama' => $otherUser->nama,
                'status' => $koneksi->status,
                'tanggalKoneksi' => $koneksi->tanggalKoneksi,
                'isSender' => $koneksi->user_id == $user->id,
            ];

            return response()->json([
                'status' => 'success',
                'message' => 'Detail koneksi berhasil diambil',
                'data' => $detailKoneksi
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Koneksi tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil detail koneksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

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
