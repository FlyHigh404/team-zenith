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
        // Tabel Postingan
        Schema::create('postingan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('description', 1500);
            $table->string('attachment_file', 255)->nullable();
            $table->string('attachment_image', 255)->nullable();
            $table->integer('view_count')->default(0);
            $table->timestamps(); // Tambahkan created_at dan updated_at
        });

        // Tabel Like
        Schema::create('postingan_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('postingan_id')->constrained('postingan')->onDelete('cascade');
            $table->timestamps(); // created_at dan updated_at
        });

        // Tabel Comment
        Schema::create('postingan_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('postingan_id')->constrained('postingan')->onDelete('cascade');
            $table->text('comment');
            $table->foreignId('parent_id')->nullable()->constrained('postingan_comments')->onDelete('cascade');
            $table->timestamps(); // created_at dan updated_at
        });

        // Tabel Postingan Comment Likes
        Schema::create('postingan_comment_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('postingan_comment_id')->constrained('postingan_comments')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postingan_comments');
        Schema::dropIfExists('postingan_likes');
        Schema::dropIfExists('postingan');
    }
};
