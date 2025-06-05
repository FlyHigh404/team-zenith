<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\CertificationRegistrationController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\LokerController;
use App\Http\Controllers\Admin\AdminCertificationController;
use App\Http\Controllers\Admin\AdminLokerController;
use App\Http\Controllers\Admin\PerusahaanController;

// Route untuk mendapatkan data user yang sedang login
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
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

    // Sertifikasi yang tersedia
    Route::prefix('certification-programs')->group(function () {
        Route::get('/', [CertificationRegistrationController::class, 'index']);
        Route::get('/{id}', [CertificationRegistrationController::class, 'show']);
        Route::post('/{id}/apply', [CertificationRegistrationController::class, 'apply']);
        Route::delete('/{id}/cancel', [CertificationRegistrationController::class, 'cancel']);
        Route::get('/my-applications', [CertificationRegistrationController::class, 'myApplications']);
    });

    // Lowongan kerja routes
    Route::prefix('job-listings')->group(function () {
        Route::get('/', [LokerController::class, 'index']);
        Route::get('/{id}', [LokerController::class, 'show']);

        // Routes yang membutuhkan autentikasi
        Route::middleware('auth:api')->group(function() {
            Route::post('/{id}/apply', [LokerController::class, 'apply']);
            Route::get('/my-applications', [LokerController::class, 'myApplications']);
        });
    });

    // Company reviews
    Route::prefix('companies')->group(function () {
        Route::get('/{id}/reviews', [LokerController::class, 'getCompanyReviews']);

        // Route yang membutuhkan autentikasi
        Route::middleware('auth:api')->group(function() {
            Route::post('/{id}/review', [LokerController::class, 'reviewCompany']);
        });
    });
});

// Admin routes - dengan middleware admin
Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    // Sertifikasi admin
    Route::prefix('certification-lists')->group(function () {
        Route::get('/', [AdminCertificationController::class, 'index']);
        Route::post('/', [AdminCertificationController::class, 'store']);
        Route::get('/{id}',
        [AdminCertificationController::class, 'show']);
        Route::put('/{id}', [AdminCertificationController::class, 'update']);
        Route::delete('/{id}', [AdminCertificationController::class, 'destroy']);

        // Mengelola pendaftar
        Route::get('/{id}/applicants', [AdminCertificationController::class, 'getApplicants']);
        Route::put('/applicants/{id}', [AdminCertificationController::class, 'updateApplicantStatus']);
    });

    // Admin job listings
    Route::prefix('job-listings')->group(function () {
        Route::get('/', [AdminLokerController::class, 'index']);
        Route::post('/', [AdminLokerController::class, 'store']);
        Route::get('/{id}', [AdminLokerController::class, 'show']);
        Route::put('/{id}', [AdminLokerController::class, 'update']);
        Route::delete('/{id}', [AdminLokerController::class, 'destroy']);

        // Mengelola pelamar
        Route::get('/{id}/applicants', [AdminLokerController::class, 'getApplicants']);
        Route::put('/applicants/{id}', [AdminLokerController::class, 'updateApplicantStatus']);

        // Statistik
        Route::get('/statistics', [AdminLokerController::class, 'getStatistics']);
    });

    // Pengelolaan perusahaan
    Route::prefix('companies')->group(function () {
        Route::get('/', [PerusahaanController::class, 'index']);
        Route::post('/', [PerusahaanController::class, 'store']);
        Route::get('/{id}', [PerusahaanController::class, 'show']);
        Route::put('/{id}', [PerusahaanController::class, 'update']);
        Route::delete('/{id}', [PerusahaanController::class, 'destroy']);
    });
});
