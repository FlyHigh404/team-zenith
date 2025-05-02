<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UploadPengalamanUserController;
use App\Http\Controllers\UploadSertifikatUserController;
use App\Http\Controllers\KoneksiController;

// Route untuk mendapatkan data user yang sedang login
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

// Protected routes (hanya dapat diakses oleh pengguna yang terautentikasi)
Route::middleware('auth:api')->group(function () {

    // Pengalaman routes
    Route::prefix('pengalaman')->group(function () {
        Route::post('upload', [UploadPengalamanUserController::class, 'uploadPengalaman'])->name('pengalaman.upload');
        Route::delete('delete/{id?}', [UploadPengalamanUserController::class, 'deletePengalaman']);
        Route::post('update/{id}', [UploadPengalamanUserController::class, 'updatePengalaman']);
        Route::get('/', [UploadPengalamanUserController::class, 'getPengalaman']);
    });

    // Sertifikat routes
    Route::prefix('sertifikat')->group(function () {
        Route::post('upload', [UploadSertifikatUserController::class, 'uploadSertifikat']);
        Route::delete('delete/{id?}', [UploadSertifikatUserController::class, 'deleteSertifikat']);
        Route::get('/', [UploadSertifikatUserController::class, 'getSertifikat']);
        Route::post('update/{id}', [UploadSertifikatUserController::class, 'updateSertifikat']);
    });

    // Koneksi routes
    Route::prefix('koneksi')->group(function () {
        Route::post('ajukan', [KoneksiController::class, 'ajukanKoneksi']);
        Route::post('setujui', [KoneksiController::class, 'setujuiKoneksi']);
        Route::post('tolak', [KoneksiController::class, 'tolakKoneksi']);
        Route::post('batalkan', [KoneksiController::class, 'batalkanAjuanKoneksi']);
        Route::delete('hapus', [KoneksiController::class, 'hapusKoneksi']);
        Route::get('/', [KoneksiController::class, 'getKoneksi']);
    });

    // Profile routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show']);
        Route::post('/', [ProfileController::class, 'update']);
        Route::put('change-password', [ProfileController::class, 'changePassword']);
    });
});


