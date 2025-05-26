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
        Schema::create('sertifikasi_admin', function (Blueprint $table) {
            $table->id();
            $table->string('judul', 100);
            $table->enum('bidang', ['Pengelasan', 'Fabrikasi', 'Inspeksi', 'Lainnya']);
            $table->string('jenisSertifikat', 50);
            $table->date('tanggalMulai');
            $table->date('tanggalSelesai');
            $table->time('jamMulai');
            $table->time('jamSelesai');
            $table->string('lokasi', 30);
            $table->enum('metode', ['Online', 'Offline', 'Hybrid']);
            $table->text('deskripsi');
            $table->text('sertifikatDidapat');
            $table->text('syaratPeserta');
            $table->text('fasilitas');
            $table->integer('kuota');
            $table->text('catatan')->nullable();
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
        Schema::dropIfExists('sertifikasi_admin');
    }
};
