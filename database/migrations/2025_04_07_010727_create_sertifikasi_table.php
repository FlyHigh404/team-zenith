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
        Schema::create('sertifikasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_id')->constrained('users')->onDelete('cascade');
            $table->char('nama', 30);
            $table->date('tanggalisu')->nullable();
            $table->date('tanggalExpired')->nullable();
            $table->char('levelSertifikasi', 20)->nullable();
            $table->char('jenisSertifikat', 50)->nullable();
            $table->char('media', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sertifikasi');
    }
};
