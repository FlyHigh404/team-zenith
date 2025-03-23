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
            $table->id();
            $table->char('password', 30);
            $table->char('email', 30)->unique();
            $table->char('username', 20)->unique();
            $table->char('nama', 30);
            $table->enum('status', ['available', 'notavailable'])->default('available');
            $table->string('desc', 500)->nullable();
            $table->date('birthdate');
            $table->char('fotoProfil', 100)->nullable();
            $table->char('lokasi', 20);
            $table->string('notelp', 25);
            $table->enum('levelProfesional', ['1', '2', '3']);
            $table->enum('keahlian', ['plate', 'pipe']);
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
