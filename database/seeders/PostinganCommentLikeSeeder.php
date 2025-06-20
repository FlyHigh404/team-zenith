<?php

namespace Database\Seeders;

use App\Models\PostinganComment;
use App\Models\PostinganCommentLike;
use Illuminate\Database\Seeder;

class PostinganCommentLikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua komentar
        $comments = PostinganComment::all();

        // Untuk setiap komentar, tambahkan 1-3 like
        foreach ($comments as $comment) {
            // Skip parent_id comment untuk membuat data yang lebih bervariasi
            if ($comment->parent_id) {
                continue;
            }

            // Get random users untuk like (hindari user yang membuat komentar)
            $userPool = [4, 5, 6, 7, 8]; // ID user dari seeder
            $commentOwnerId = $comment->user_id;
            $userPool = array_diff($userPool, [$commentOwnerId]);

            // Pilih 1-3 user secara acak
            $likeCount = rand(1, min(3, count($userPool)));
            $selectedUsers = array_rand(array_flip($userPool), $likeCount);

            // Jika hanya 1 user, wrap dalam array
            if (!is_array($selectedUsers)) {
                $selectedUsers = [$selectedUsers];
            }

            // Buat like untuk setiap user yang dipilih
            foreach ($selectedUsers as $userId) {
                PostinganCommentLike::create([
                    'user_id' => $userId,
                    'postingan_comment_id' => $comment->id,
                    'created_at' => $comment->created_at->addHours(rand(1, 12)),
                    'updated_at' => $comment->created_at->addHours(rand(1, 12)),
                ]);
            }
        }
    }
}
