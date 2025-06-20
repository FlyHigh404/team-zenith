<?php

namespace Database\Seeders;

use App\Models\Bookmark;
use Illuminate\Database\Seeder;

class BookmarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Bookmark untuk lowongan pekerjaan
        Bookmark::create([
            'user_id' => 4, // Budi Santoso
            'bookmarkable_id' => 1, // Welding Inspector
            'bookmarkable_type' => 'App\Models\Loker',
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(3),
        ]);

        Bookmark::create([
            'user_id' => 5, // Ahmad Ridwan
            'bookmarkable_id' => 2, // Welder 6G SMAW
            'bookmarkable_type' => 'App\Models\Loker',
            'created_at' => now()->subDays(4),
            'updated_at' => now()->subDays(4),
        ]);

        Bookmark::create([
            'user_id' => 6, // Siti Nurhaliza
            'bookmarkable_id' => 5, // Junior Welder 1G SMAW
            'bookmarkable_type' => 'App\Models\Loker',
            'created_at' => now()->subDay(),
            'updated_at' => now()->subDay(),
        ]);

        Bookmark::create([
            'user_id' => 7, // Deni Prasetyo
            'bookmarkable_id' => 4, // Supervisor Welding
            'bookmarkable_type' => 'App\Models\Loker',
            'created_at' => now()->subDays(2),
            'updated_at' => now()->subDays(2),
        ]);

        // Bookmark untuk postingan
        Bookmark::create([
            'user_id' => 4, // Budi Santoso
            'bookmarkable_id' => 2, // Postingan Ahmad tentang tips sertifikasi
            'bookmarkable_type' => 'App\Models\Postingan',
            'created_at' => now()->subDays(6),
            'updated_at' => now()->subDays(6),
        ]);

        Bookmark::create([
            'user_id' => 6, // Siti Nurhaliza
            'bookmarkable_id' => 2, // Postingan Ahmad tentang tips sertifikasi
            'bookmarkable_type' => 'App\Models\Postingan',
            'created_at' => now()->subDays(5),
            'updated_at' => now()->subDays(5),
        ]);

        Bookmark::create([
            'user_id' => 8, // Rini Susanti
            'bookmarkable_id' => 6, // Postingan Ahmad tentang pengalaman offshore
            'bookmarkable_type' => 'App\Models\Postingan',
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(3),
        ]);

        // Bookmark untuk sertifikasi
        Bookmark::create([
            'user_id' => 5, // Ahmad Ridwan
            'bookmarkable_id' => 1, // Sertifikasi Admin: Welding Inspector
            'bookmarkable_type' => 'App\Models\AdminCertification',
            'created_at' => now()->subDays(10),
            'updated_at' => now()->subDays(10),
        ]);

        Bookmark::create([
            'user_id' => 6, // Siti Nurhaliza
            'bookmarkable_id' => 3, // Sertifikasi Admin: Basic SMAW Training
            'bookmarkable_type' => 'App\Models\AdminCertification',
            'created_at' => now()->subDays(7),
            'updated_at' => now()->subDays(7),
        ]);
    }
}
