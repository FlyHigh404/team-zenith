<?php

namespace Database\Seeders;

use App\Models\PostinganComment;
use Illuminate\Database\Seeder;

class PostinganCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Comments untuk postingan 1 (Budi)
        $comment1 = PostinganComment::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 1,
            'comment' => 'Hasil las-nya kelihatan bagus, Budi! Proyek apa yang sedang kamu kerjakan?',
            'created_at' => now()->subDays(5)->addHour(),
            'updated_at' => now()->subDays(5)->addHour(),
        ]);

        PostinganComment::create([
            'user_id' => 4, // Budi
            'postingan_id' => 1,
            'parent_id' => $comment1->id,
            'comment' => 'Terima kasih Ahmad! Ini proyek pembangunan gedung perkantoran di kawasan CBD Surabaya.',
            'created_at' => now()->subDays(5)->addHours(2),
            'updated_at' => now()->subDays(5)->addHours(2),
        ]);

        PostinganComment::create([
            'user_id' => 7, // Deni
            'postingan_id' => 1,
            'comment' => 'Pengelasan yang rapi, apakah kamu menggunakan teknik khusus?',
            'created_at' => now()->subDays(5)->addHours(3),
            'updated_at' => now()->subDays(5)->addHours(3),
        ]);

        // Comments untuk postingan 2 (Ahmad)
        $comment2 = PostinganComment::create([
            'user_id' => 6, // Siti
            'postingan_id' => 2,
            'comment' => 'Terima kasih atas tipsnya, Pak Ahmad! Saya sedang mempersiapkan diri untuk sertifikasi ini.',
            'created_at' => now()->subDays(7)->addHours(2),
            'updated_at' => now()->subDays(7)->addHours(2),
        ]);

        PostinganComment::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 2,
            'parent_id' => $comment2->id,
            'comment' => 'Sama-sama, Siti. Jika ada pertanyaan lain, jangan ragu untuk bertanya.',
            'created_at' => now()->subDays(7)->addHours(3),
            'updated_at' => now()->subDays(7)->addHours(3),
        ]);

        PostinganComment::create([
            'user_id' => 7, // Deni
            'postingan_id' => 2,
            'comment' => 'Saya setuju dengan Ahmad. Selain itu, pastikan juga untuk menjaga kestabilan gas pelindung.',
            'created_at' => now()->subDays(6)->addHours(5),
            'updated_at' => now()->subDays(6)->addHours(5),
        ]);

        // Comments untuk postingan 3 (Deni)
        PostinganComment::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 3,
            'comment' => 'Wah, proyek yang menantang! Berapa lama durasi proyeknya?',
            'created_at' => now()->subDays(3)->addHours(1),
            'updated_at' => now()->subDays(3)->addHours(1),
        ]);

        $comment3 = PostinganComment::create([
            'user_id' => 4, // Budi
            'postingan_id' => 3,
            'comment' => 'Keren! Apa saja tantangan terbesar dalam inspeksi las di platform offshore?',
            'created_at' => now()->subDays(3)->addHours(2),
            'updated_at' => now()->subDays(3)->addHours(2),
        ]);

        PostinganComment::create([
            'user_id' => 7, // Deni
            'postingan_id' => 3,
            'parent_id' => $comment3->id,
            'comment' => 'Tantangan terbesarnya adalah cuaca dan kondisi laut yang tidak menentu, plus akses yang terbatas ke beberapa area.',
            'created_at' => now()->subDays(3)->addHours(4),
            'updated_at' => now()->subDays(3)->addHours(4),
        ]);

        // Comments untuk postingan 4 (Siti)
        $comment4 = PostinganComment::create([
            'user_id' => 7, // Deni
            'postingan_id' => 4,
            'comment' => 'Selamat atas kelulusanmu! Untuk persiapan kerja, pastikan CV-mu menonjolkan skill teknis dan sertifikasi yang kamu miliki.',
            'created_at' => now()->subDays(2)->addHours(1),
            'updated_at' => now()->subDays(2)->addHours(1),
        ]);

        PostinganComment::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 4,
            'comment' => 'Jangan lupa untuk terus berlatih dan mengikuti perkembangan teknologi pengelasan terbaru.',
            'created_at' => now()->subDays(2)->addHours(2),
            'updated_at' => now()->subDays(2)->addHours(2),
        ]);

        PostinganComment::create([
            'user_id' => 6, // Siti
            'postingan_id' => 4,
            'parent_id' => $comment4->id,
            'comment' => 'Terima kasih banyak atas sarannya, Pak Deni! Saya akan memperbaiki CV saya.',
            'created_at' => now()->subDays(2)->addHours(3),
            'updated_at' => now()->subDays(2)->addHours(3),
        ]);

        // Comments untuk postingan 5 (Rini)
        PostinganComment::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 5,
            'comment' => 'GMAW memang berbeda. Kuncinya adalah menjaga kestabilan kecepatan dan jarak torch.',
            'created_at' => now()->subDay()->addHours(1),
            'updated_at' => now()->subDay()->addHours(1),
        ]);

        $comment5 = PostinganComment::create([
            'user_id' => 7, // Deni
            'postingan_id' => 5,
            'comment' => 'Latihan adalah kunci. Cobalah untuk melakukan practice run pada beberapa potong scrap metal sebelum proyek sebenarnya.',
            'created_at' => now()->subDay()->addHours(3),
            'updated_at' => now()->subDay()->addHours(3),
        ]);

        PostinganComment::create([
            'user_id' => 8, // Rini
            'postingan_id' => 5,
            'parent_id' => $comment5->id,
            'comment' => 'Terima kasih Pak Deni, saya akan mencobanya!',
            'created_at' => now()->subDay()->addHours(4),
            'updated_at' => now()->subDay()->addHours(4),
        ]);

        // Comments untuk postingan 6 (Ahmad)
        PostinganComment::create([
            'user_id' => 7, // Deni
            'postingan_id' => 6,
            'comment' => 'Betul sekali, Ahmad. Safety juga menjadi prioritas utama di lingkungan offshore.',
            'created_at' => now()->subDays(4)->addHours(2),
            'updated_at' => now()->subDays(4)->addHours(2),
        ]);

        PostinganComment::create([
            'user_id' => 8, // Rini
            'postingan_id' => 6,
            'comment' => 'Terima kasih sudah berbagi pengalamannya. Apakah ada persyaratan khusus untuk bisa bekerja di offshore?',
            'created_at' => now()->subDays(4)->addHours(6),
            'updated_at' => now()->subDays(4)->addHours(6),
        ]);

        $comment6 = PostinganComment::create([
            'user_id' => 4, // Budi
            'postingan_id' => 6,
            'comment' => 'File panduan keselamatan yang dibagikan sangat bermanfaat. Terima kasih Ahmad!',
            'created_at' => now()->subDays(3)->addHours(12),
            'updated_at' => now()->subDays(3)->addHours(12),
        ]);

        PostinganComment::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 6,
            'parent_id' => $comment6->id,
            'comment' => 'Sama-sama, Budi. Semoga bermanfaat!',
            'created_at' => now()->subDays(3)->addHours(14),
            'updated_at' => now()->subDays(3)->addHours(14),
        ]);
    }
}
