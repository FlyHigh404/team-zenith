<?php

namespace Database\Seeders;

use App\Models\Postingan;
use Illuminate\Database\Seeder;

class PostinganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Postingan 1
        Postingan::create([
            'user_id' => 4, // Budi Santoso
            'description' => 'Halo semua, saya baru saja menyelesaikan proyek pengelasan untuk struktur gedung di Surabaya. Sangat menyenangkan bisa berbagi pengalaman dengan teman-teman di sini!',
            'attachment_image' => 'budi_project.jpg',
            'view_count' => 45,
            'created_at' => now()->subDays(5),
            'updated_at' => now()->subDays(5),
        ]);

        // Postingan 2
        Postingan::create([
            'user_id' => 5, // Ahmad Ridwan
            'description' => 'Berbagi tips untuk teman-teman yang sedang mempersiapkan sertifikasi 6G GTAW: Pastikan untuk banyak berlatih pada posisi overhead, karena itu adalah bagian tersulit dalam tes. Jangan lupa untuk selalu memeriksa penetrasi las Anda.',
            'view_count' => 132,
            'created_at' => now()->subDays(7),
            'updated_at' => now()->subDays(7),
        ]);

        // Postingan 3
        Postingan::create([
            'user_id' => 7, // Deni Prasetyo
            'description' => 'Saya baru saja menyelesaikan proyek inspeksi pengelasan untuk platform offshore. Ini adalah beberapa foto dari proyek tersebut.',
            'attachment_image' => 'deni_offshore_project.jpg',
            'view_count' => 87,
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(3),
        ]);

        // Postingan 4
        Postingan::create([
            'user_id' => 6, // Siti Nurhaliza
            'description' => 'Halo semuanya, saya fresh graduate dari SMK Teknik Pengelasan. Ada yang bisa memberikan saran untuk persiapan melamar kerja pertama di bidang pengelasan?',
            'view_count' => 56,
            'created_at' => now()->subDays(2),
            'updated_at' => now()->subDays(2),
        ]);

        // Postingan 5
        Postingan::create([
            'user_id' => 8, // Rini Susanti
            'description' => 'Baru saja mengikuti pelatihan pengelasan GMAW. Ternyata tekniknya cukup berbeda dengan SMAW yang biasa saya lakukan. Ada tips untuk master GMAW lebih cepat?',
            'attachment_image' => 'rini_training.jpg',
            'view_count' => 43,
            'created_at' => now()->subDay(),
            'updated_at' => now()->subDay(),
        ]);

        // Postingan 6
        Postingan::create([
            'user_id' => 5, // Ahmad Ridwan
            'description' => 'Berbagi tentang pengalaman saya bekerja di proyek offshore. Tantangan terbesar adalah kondisi cuaca yang tidak menentu. Kalian harus selalu siap dengan perubahan mendadak dan tetap menjaga kualitas pekerjaan.',
            'attachment_file' => 'offshore_safety_guide.pdf',
            'view_count' => 78,
            'created_at' => now()->subDays(4),
            'updated_at' => now()->subDays(4),
        ]);
    }
}
