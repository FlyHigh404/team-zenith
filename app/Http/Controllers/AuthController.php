<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Authentication;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Store a newly created user (Register).
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => [
                    'required',
                    'email',
                    'unique:users,email',
                    'regex:/^[a-zA-Z0-9._%+-]+@((gmail|yahoo|outlook|hotmail|icloud|aol|zoho|mail|protonmail|yandex|gmx)\.(com|id|edu|org|net))$/'
                ],
                'username' => 'required|string|min:3|max:20|unique:users,username',
                'password' => 'required|string|min:6',
                'nama' => 'required|string|max:30',
                'birthdate' => 'required|date',
                'provinsi' => 'required|string|max:50',
                'kota' => 'required|string|max:50',
                'notelp' => 'required|string|max:25',
                'levelProfesional' => 'required|array|min:1',
                'levelProfesional.*' => 'string|in:1F,2F,3F,4F,1G,2G,3G,4G,1G pipa,2G pipa,5G,6G,SMAW,GMAW,FCAW,GTAW',
                'keahlian' => 'required|array|min:1',
                'keahlian.*' => 'string|in:fillet,pelat,pipe',
            ]);

            $user = User::create([
                'nama' => $request->nama,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'birthdate' => $request->birthdate,
                'notelp' => $request->notelp,
                'provinsi' => $request->provinsi,
                'kota' => $request->kota,
                'levelProfesional' => $request->levelProfesional,
                'keahlian' => $request->keahlian,
                'createdAt' => now()->setTimezone('Asia/Jakarta'),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Registrasi berhasil! Silahkan login.',
                'data' => $user
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
                'message' => 'Registrasi gagal',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get authentication token (Login).
     */
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $user = User::where('email', $credentials['email'])->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Kredensial tidak valid'
                ], 401);
            }

            $token = JWTAuth::fromUser($user);

            Authentication::updateOrCreate(
                ['user_id' => $user->id],
                ['token' => $token]
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Login berhasil',
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl', 60) * 60,
                'user' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Login gagal',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the authentication token (Logout).
     */
    public function destroy()
    {
        try {
            $token = JWTAuth::getToken();
            $user = Auth::user();

            if ($token) {
                Authentication::where('user_id', $user->id)->delete();
                JWTAuth::invalidate($token);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Logout berhasil'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Logout gagal',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Refresh authentication token.
     */
    public function update()
    {
        try {
            $currentToken = JWTAuth::getToken();
            $user = Auth::user();
            $newToken = JWTAuth::refresh($currentToken);

            Authentication::where('user_id', $user->id)
                ->update(['token' => $newToken]);

            return response()->json([
                'status' => 'success',
                'message' => 'Token berhasil diperbaharui',
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl', 60) * 60,
                'user' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui token',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the authenticated user (Me).
     */
    public function show()
    {
        try {
            $user = Auth::user();

            return response()->json([
                'status' => 'success',
                'message' => 'Data pengguna berhasil diambil',
                'data' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil data pengguna',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
