<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\ConnectionController;

// Route untuk mendapatkan data user yang sedang login
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'store']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'destroy']);
    Route::post('refresh', [AuthController::class, 'update']);
    Route::get('me', [AuthController::class, 'show']);
});

// Protected routes (hanya dapat diakses oleh pengguna yang terautentikasi)
Route::middleware('auth:api')->group(function () {

    // Pengalaman routes
    Route::prefix('experience')->group(function () {
        Route::get('/', [ExperienceController::class, 'index']);
        Route::get('/{id}', [ExperienceController::class, 'show']);
        Route::post('/', [ExperienceController::class, 'store']);
        Route::put('/{id}', [ExperienceController::class, 'update']);
        Route::delete('/{id?}', [ExperienceController::class, 'destroy']);
    });

    // Sertifikat routes
    Route::prefix('certifications')->group(function () {
        Route::get('/', [CertificationController::class, 'index']);
        Route::get('/{id}', [CertificationController::class, 'show']);
        Route::post('/', [CertificationController::class, 'store']);
        Route::put('/{id}', [CertificationController::class, 'update']);
        Route::delete('/{id}', [CertificationController::class, 'destroy']);
        Route::delete('/', [CertificationController::class, 'destroyAll']);
    });

    // Koneksi routes - menggunakan nama resource connections untuk konsistensi
    Route::prefix('connections')->group(function () {
        Route::get('/', [ConnectionController::class, 'index']);
        Route::get('/{id}', [ConnectionController::class, 'show']);
        Route::post('/', [ConnectionController::class, 'store']);
        Route::put('/{id}', [ConnectionController::class, 'update']);
        Route::delete('/{id?}', [ConnectionController::class, 'destroy']);
    });

    // Profile routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show']);
        Route::put('/', [ProfileController::class, 'update']);
        Route::put('/change-password', [ProfileController::class, 'updatePassword']);
    });
});
