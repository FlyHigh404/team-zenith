<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UploadController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:api')->group(function () {
    Route::post('/profile/update', [UploadController::class, 'updateProfile'])->name('profile.update');
    Route::post('/certification/upload', [UploadController::class, 'uploadCertification'])->name('certification.upload');
    Route::get('/certifications', [UploadController::class, 'getCertifications'])->name('certifications.get');
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});
