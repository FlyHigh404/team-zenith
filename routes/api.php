<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UploadPengalamanUserController;
use App\Http\Controllers\UploadSertifikatUserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::middleware('auth:api')->group(function () {
    Route::post('/pengalaman/upload', [UploadPengalamanUserController::class, 'uploadPengalaman'])->name('pengalaman.upload');
    Route::delete('/pengalaman/delete/{id?}', [UploadPengalamanUserController::class, 'deletePengalaman']);
    Route::post('/pengalaman/update/{id}', [UploadPengalamanUserController::class, 'updatePengalaman']);
    Route::get('/pengalaman', [UploadPengalamanUserController::class, 'getPengalaman']);
    Route::post('/upload/sertifikat/user', [UploadSertifikatUserController::class, 'uploadSertifikat']);
    Route::delete('/delete/sertifikat/user/{id?}', [UploadSertifikatUserController::class, 'deleteSertifikat'])->middleware('auth:api');
    Route::get('/sertifikat', [UploadSertifikatUserController::class, 'getSertifikat']);
    Route::post('/update/sertifikat/user/{id}', [UploadSertifikatUserController::class, 'updateSertifikat']);
});

// Profile routes - satu endpoint untuk semua operasi
Route::group(['prefix' => 'profile', 'middleware' => 'auth:api'], function () {
    Route::get('/', [ProfileController::class, 'show']);
    Route::put('/', [ProfileController::class, 'update']);
    Route::put('/change-password', [ProfileController::class, 'changePassword']);
});


