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
        Schema::create('koneksi', function (Blueprint $table) {
            $table->id(); // id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
            $table->unsignedBigInteger('user_id'); // user_id INT NOT NULL
            $table->unsignedBigInteger('koneksi_user_id'); // koneksi_user_id INT NOT NULL
            $table->enum('status', ['diajukan', 'diterima', 'ditolak'])->default('diajukan'); // Status koneksi
            $table->date('tanggalKoneksi'); // tanggalKoneksi DATE NOT NULL
            $table->timestamps(); // created_at dan updated_at

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('koneksi_user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('koneksi');
    }
};
