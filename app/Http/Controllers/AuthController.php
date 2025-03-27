<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Authentication;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request)
{
    try {
        // Validasi input
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
            'lokasi' => 'required|string|max:20',
            'notelp' => 'required|string|max:25',
            'levelProfesional' => 'required|in:1,2,3',
            'keahlian' => 'required|in:plate,pipe',
        ]);

        // Buat user baru
        $user = User::create([
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'nama' => $request->nama,
            'birthdate' => $request->birthdate,
            'lokasi' => $request->lokasi,
            'notelp' => $request->notelp,
            'levelProfesional' => $request->levelProfesional,
            'keahlian' => $request->keahlian,
            'createdAt' => now(),
        ]);

        // Buat token JWT
        $token = JWTAuth::fromUser($user);

        // Simpan token di tabel Authentication (jika diperlukan)
        Authentication::create(['token' => $token]);

        return response()->json([
            'message' => 'Pendaftaran berhasil',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl', 60) * 60
        ], 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Validasi gagal',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Pendaftaran gagal',
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ], 500);
    }
}

    /**
     * Get a JWT via given credentials.
     */
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            // Custom authentication for handling 30-char password field limitation
            $user = User::where('email', $credentials['email'])->first();

            if (!$user || !$this->verifyPassword($credentials['password'], $user->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Generate token manually using JWTAuth directly
            $token = JWTAuth::fromUser($user);

            // Store token in authentications table
            Authentication::create(['token' => $token]);

            return $this->respondWithToken($token, $user);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Login error',
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    /**
     * Custom password verification to handle 30-char limit
     */
    protected function verifyPassword($plainPassword, $hashedPassword)
    {
        // This is a simple implementation - you might need to adjust based on how passwords are stored
        return Hash::check($plainPassword, $hashedPassword);
    }

    /**
     * Get the authenticated User.
     */
    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json(['user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     */
    public function logout()
    {
        try {
            // Get the token
            $token = JWTAuth::getToken();

            if ($token) {
                // Delete from authentications table
                Authentication::where('token', $token->get())->delete();

                // Invalidate token
                JWTAuth::invalidate($token);
            }

            return response()->json(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Logout error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Refresh a token.
     */
    public function refresh()
    {
        try {
            $currentToken = JWTAuth::getToken();
            $newToken = JWTAuth::refresh($currentToken);

            // Update token in authentications table
            Authentication::where('token', $currentToken->get())->update(['token' => $newToken]);

            return $this->respondWithToken($newToken, JWTAuth::setToken($newToken)->authenticate());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Token refresh error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the token array structure.
     */
    protected function respondWithToken($token, $user = null)
    {
        if (!$user) {
            $user = JWTAuth::setToken($token)->authenticate();
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl', 60) * 60, // 10 minutes in seconds
            'user' => $user
        ]);
    }
}
