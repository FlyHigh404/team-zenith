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
        Schema::create('perusahaan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Admin yang mengelola perusahaan
            $table->string('nama', 100); // Nama perusahaan
            $table->text('deskripsi'); // Deskripsi perusahaan
            $table->text('alamat'); // Alamat perusahaan
            $table->string('kota', 50);
            $table->string('provinsi', 50);
            $table->string('notelp', 25)->nullable();
            $table->string('email', 100)->nullable();
            $table->integer('jumlahPegawai')->default(0); // Jumlah pegawai (int)
            $table->string('logo')->nullable();
            $table->decimal('rating', 3, 1)->default(0); // Rating perusahaan (0-5)
            $table->integer('jumlahUlasan')->default(0); // Jumlah ulasan
            $table->timestamp('createdAt');
            $table->timestamp('updatedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perusahaan');
    }
};
