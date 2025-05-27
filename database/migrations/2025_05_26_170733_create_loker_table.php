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
            $table->integer('pengalaman');
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
