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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('judul', 100);
            $table->text('desc');
            $table->enum('durasi', ['Full Time', 'Part Time', 'Contract', 'Internship']);
            $table->string('lokasi', 100);
            $table->enum('pengalaman', ['< 1 tahun', '1-3 tahun', '3-5 tahun', '> 5 tahun']);
            $table->enum('jenisIndustri', ['Pengelasan', 'Manufaktur', 'Konstruksi', 'Otomotif', 'Minyak & Gas', 'Industri Berat', 'Lainnya']);
            $table->enum('gaji', ['< Rp5.000.000', 'Rp5.000.000 - Rp10.000.000', '> Rp10.000.000', 'Negosiasi']);
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
