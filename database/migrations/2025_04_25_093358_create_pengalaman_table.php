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
        Schema::create('pengalaman', function (Blueprint $table) {
            $table->id(); // id INT NOT NULL PRIMARY KEY
            $table->unsignedBigInteger('users_id'); // users_id INT NOT NULL
            $table->char('namaPerusahaan', 30); // namaPerusahaan CHAR(30) NOT NULL
            $table->char('posisi', 30); // posisi CHAR(30) NOT NULL
            $table->json('levelProfesional'); // levelProfesional JSON NOT NULL
            $table->char('kota', 30); // kota CHAR(30) NOT NULL
            $table->char('provinsi', 30); // posisi CHAR(30) NOT NULL
            $table->date('tanggalMulai'); // tanggalMulai DATE NOT NULL
            $table->date('tanggalSelesai')->nullable(); // tanggalSelesai DATE NULL
            $table->boolean('masihBekerja'); // masihBekerja BOOLEAN
            $table->timestamps(); // created_at dan updated_at

            // Foreign key constraint
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengalaman');
    }
};
