<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use App\Http\Controllers\Admin;

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('register', [Controllers\AuthController::class, 'register']);
    Route::post('login', [Controllers\AuthController::class, 'login']);
    Route::post('logout', [Controllers\AuthController::class, 'destroy']);
    Route::post('refresh', [Controllers\AuthController::class, 'update']);
    Route::get('me', [Controllers\AuthController::class, 'show']);
});

Route::middleware('auth:api')->group(function () {

    // Profile routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [Controllers\ProfileController::class, 'show']);
        Route::put('/', [Controllers\ProfileController::class, 'update']);
        Route::put('/change-password', [Controllers\ProfileController::class, 'updatePassword']);
        Route::delete('/delete-photo', [Controllers\ProfileController::class, 'deletePhoto']);
    });

    // Get Active User routes
    Route::prefix('get-active-userlist')->group(function () {
        Route::get('/', [Controllers\ActiveUserController::class, 'index']);
    });

    // Get User by id
    Route::prefix('user')->group(function () {
        Route::get('/{id}', [Controllers\ActiveUserController::class, 'getUserById']);
    });

    // Experience routes
    Route::prefix('experience')->group(function () {
        Route::get('/', [Controllers\ExperienceController::class, 'index']);
        Route::get('/{id}', [Controllers\ExperienceController::class, 'show']);
        Route::post('/', [Controllers\ExperienceController::class, 'store']);
        Route::put('/{id}', [Controllers\ExperienceController::class, 'update']);
        Route::delete('/{id?}', [Controllers\ExperienceController::class, 'destroy']);
    });

    // Certification routes
    Route::prefix('certifications')->group(function () {
        Route::get('/', [Controllers\CertificationController::class, 'index']);
        Route::get('/{id}', [Controllers\CertificationController::class, 'show']);
        Route::post('/', [Controllers\CertificationController::class, 'store']);
        Route::put('/{id}', [Controllers\CertificationController::class, 'update']);
        Route::delete('/{id}', [Controllers\CertificationController::class, 'destroy']);
        Route::delete('/', [Controllers\CertificationController::class, 'destroyAll']);
    });

    // Sertifikasi yang tersedia
    Route::prefix('certification-programs')->group(function () {
        Route::get('/my-applications', [Controllers\CertificationRegistrationController::class, 'myApplications']);
        Route::get('/', [Controllers\CertificationRegistrationController::class, 'index']);
        Route::get('/{id}', [Controllers\CertificationRegistrationController::class, 'show']);
        Route::post('/{id}/apply', [Controllers\CertificationRegistrationController::class, 'apply']);
        Route::delete('/{id}/cancel', [Controllers\CertificationRegistrationController::class, 'cancel']);
    });

    // Connection routes
    Route::prefix('connections')->group(function () {
        Route::get('/', [Controllers\ConnectionController::class, 'getKoneksi']);
        Route::post('ajukan', [Controllers\ConnectionController::class, 'ajukanKoneksi']);
        Route::post('cancel', [Controllers\ConnectionController::class, 'batalkanAjuanKoneksi']);
        Route::post('accept', [Controllers\ConnectionController::class, 'setujuiKoneksi']);
        Route::post('reject', [Controllers\ConnectionController::class, 'tolakKoneksi']);
        Route::delete('delete', [Controllers\ConnectionController::class, 'hapusKoneksi']);
    });

    // Postingan routes
    Route::middleware('auth')->group(function () {
        Route::post('/postingan', [Controllers\PostinganController::class, 'store']);
        Route::post('/postingan/{id}', [Controllers\PostinganController::class, 'update']);
        Route::delete('/postingan/{id}', [Controllers\PostinganController::class, 'destroy']);
        Route::post('/postingan/{id}/like', [Controllers\PostinganController::class, 'like']);
        Route::delete('/postingan/{id}/unlike', [Controllers\PostinganController::class, 'unlike']);
        Route::post('/postingan/{id}/comment', [Controllers\PostinganController::class, 'comment']);
        Route::delete('/postingan/comment/{id}', [Controllers\PostinganController::class, 'destroyComment']);
        Route::put('/postingan/comment/{id}/edit', [Controllers\PostinganController::class, 'updateComment']);
        Route::post('/postingan/comment/{id}/reply', [Controllers\PostinganController::class, 'replyComment']);
        Route::post('/postingan/comment/{id}/like', [Controllers\PostinganController::class, 'likeComment']);
        Route::delete('/postingan/comment/{id}/unlike', [Controllers\PostinganController::class, 'unlikeComment']);
        Route::get('/postingan/{id}', [Controllers\PostinganController::class, 'show']);
        Route::get('/postingan', [Controllers\PostinganController::class, 'index']);
    });

    // Bookmark routes
    Route::prefix('bookmarks')->group(function () {
        Route::post('/', [Controllers\BookmarkController::class, 'storeBookmark']);
        Route::delete('/', [Controllers\BookmarkController::class, 'destroy']);
        Route::get('/', [Controllers\BookmarkController::class, 'index']);
    });

    // Lowongan kerja routes
    Route::prefix('job-listings')->group(function () {
        Route::get('/', [Controllers\LokerController::class, 'index']);
        Route::get('/my-applications', [Controllers\LokerController::class, 'myApplications']); // <- pindah ke atas
        Route::get('/{id}', [Controllers\LokerController::class, 'show']);
        Route::post('/{id}/apply', [Controllers\LokerController::class, 'apply']);
    });

    // Company reviews
    Route::prefix('companies')->group(function () {
        Route::get('/{id}/reviews', [Controllers\LokerController::class, 'getCompanyReviews']);
        Route::post('/{id}/review', [Controllers\LokerController::class, 'reviewCompany']);
    });
});

// Admin routes - dengan middleware admin
Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    
    // Admin dashboard
    Route::prefix('user-list')->group(function () {
        Route::get('/all-users', [Admin\UserController::class, 'index']);
    });

    // Sertifikasi admin
    Route::prefix('certification-lists')->group(function () {
        // Statistik
        Route::get('/statistics', [Admin\AdminCertificationController::class, 'getStatistics']);

        Route::get('/', [Admin\AdminCertificationController::class, 'index']);
        Route::get(
            '/{id}',
            [Admin\AdminCertificationController::class, 'show']
        );
        Route::post('/', [Admin\AdminCertificationController::class, 'store']);
        Route::put('/{id}', [Admin\AdminCertificationController::class, 'update']);
        Route::delete('/{id}', [Admin\AdminCertificationController::class, 'destroy']);

        // Mengelola pendaftar
        Route::get('/{id}/applicants', [Admin\AdminCertificationController::class, 'getApplicants']);
        Route::put('/applicants/{id}', [Admin\AdminCertificationController::class, 'updateApplicantStatus']);
    });

    // Admin job listings
    Route::prefix('job-listings')->group(function () {
        // Statistik
        Route::get('/statistics', [Admin\AdminLokerController::class, 'getStatistics']);

        Route::get('/', [Admin\AdminLokerController::class, 'index']);
        Route::get('/{id}', [Admin\AdminLokerController::class, 'show']);
        Route::post('/', [Admin\AdminLokerController::class, 'store']);
        Route::put('/{id}', [Admin\AdminLokerController::class, 'update']);
        Route::delete('/{id}', [Admin\AdminLokerController::class, 'destroy']);

        // Mengelola pelamar
        Route::get('/{id}/applicants', [Admin\AdminLokerController::class, 'getApplicants']);
        Route::put('/applicants/{id}', [Admin\AdminLokerController::class, 'updateApplicantStatus']);

    });

    // Pengelolaan perusahaan
    Route::prefix('companies')->group(function () {
        Route::get('/', [Admin\PerusahaanController::class, 'index']);
        Route::get('/{id}', [Admin\PerusahaanController::class, 'show']);
        Route::post('/', [Admin\PerusahaanController::class, 'store']);
        Route::put('/{id}', [Admin\PerusahaanController::class, 'update']);
        Route::delete('/{id}', [Admin\PerusahaanController::class, 'destroy']);
    });
});
