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
        Schema::create('loker', function (Blueprint $table) {
            $table->id();
            $table->foreignId('perusahaan_id')->constrained('perusahaan')->onDelete('cascade');
            $table->string('judul', 100); // Nama lowongan pekerjaan
            $table->text('desc'); // Deskripsi pekerjaan
            $table->integer('durasi_bulan'); // Durasi kontrak dalam bulan
            $table->integer('pengalaman'); // Pengalaman yang dibutuhkan dalam tahun
            $table->string('lokasi', 100); // Lokasi pekerjaan (provinsi, kota)
            $table->string('provinsi', 50); // Untuk filtering
            $table->string('kota', 50); // Untuk filtering
            $table->json('jenisIndustri');
            $table->integer('gaji');
            $table->date('tanggalMulai');
            $table->date('tanggalSelesai');
            $table->text('kualifikasi');
            $table->json('detail')->nullable();
            $table->string('gambar')->nullable();
            $table->timestamp('createdAt');
            $table->timestamp('updatedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loker');
    }
};
