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
        $table->string('password', 100);
        $table->char('email', 50) ->unique();
        $table->char('username', 30) ->unique();
        $table->char('nama', 30);
        $table->string('desc', 100)->nullable();
        $table->date('birthdate');
        $table->char('fotoProfil', 255)->nullable();
        $table->char('provinsi', 50);
        $table->char('kota', 50);
        $table->string('notelp', 25);
        $table->json('levelProfesional');
        $table->json('keahlian');
        $table->json('pekerjaan') ->nullable();
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
