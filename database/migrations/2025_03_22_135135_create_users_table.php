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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Sesuai gambar: id INT NOT NULL PRIMARY KEY
            $table->string('password');
            $table->string('email')->unique();
            $table->string('username', 255)->unique();
            $table->string('nama', 255);
            $table->string('desc')->nullable();
            $table->date('birthdate');
            $table->string('fotoProfil', 255)->nullable();
            $table->string('provinsi');
            $table->string('kota');
            $table->char('notelp', 13);
            $table->json('levelProfesional');
            $table->json('keahlian');
            $table->string('pekerjaan', 255)->nullable();
            $table->boolean('is_active')->default(false); // default: tidak aktif
            $table->dateTime('createdAt');
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
