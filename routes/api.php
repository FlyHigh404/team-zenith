<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UploadProfileController;
use App\Http\Controllers\SertifikasiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:api')->group(function () {
    Route::post('/profile/update', [UploadProfileController::class, 'updateProfile'])->name('profile.update');
    Route::post('/certification/upload', [SertifikasiController::class, 'uploadCertification'])->name('certification.upload');
    Route::get('/certifications', [SertifikasiController::class, 'getCertifications'])->name('certifications.get');
    Route::delete('/profile/delete/photo', [UploadProfileController::class, 'deletePhoto'])->name('profile.deletePhoto');
    Route::delete('/profile/delete/desc', [UploadProfileController::class, 'deleteDesc'])->name('profile.deleteDesc');
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});
