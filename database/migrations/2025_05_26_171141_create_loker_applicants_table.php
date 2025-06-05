<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loker_applicants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loker_id')->constrained('loker')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nama', 100); // Nama lengkap pelamar
            $table->date('tanggalLahir'); // Tanggal lahir
            $table->string('notelp', 25); // Nomor telepon
            $table->string('email', 100); // Email
            $table->text('alamat'); // Alamat
            $table->string('provinsi', 50); // Provinsi
            $table->string('kota', 50); // Kota
            $table->text('tentang')->nullable(); // Tentang diri pelamar
            $table->string('cv', 100); // File CV yang diupload
            $table->enum('status', ['Dilamar', 'Diterima', 'Ditolak'])->default('Dilamar');
            $table->text('alasan')->nullable(); // Alasan diterima/ditolak
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loker_applicants');
    }
};
