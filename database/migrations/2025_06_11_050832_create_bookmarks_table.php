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
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('bookmarkable_id');
            $table->string('bookmarkable_type'); // menyimpan tipe (postingan, pengalaman, sertifikasi)
            $table->timestamps();

            $table->unique(['user_id', 'bookmarkable_id', 'bookmarkable_type']); // mencegah duplikat
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookmarks');
    }
};
