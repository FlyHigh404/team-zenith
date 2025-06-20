<?php

namespace Database\Seeders;

use App\Models\PerusahaanUlasan;
use Illuminate\Database\Seeder;

class PerusahaanUlasanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ulasan untuk PT Petro Wellindo
        PerusahaanUlasan::create([
            'perusahaan_id' => 1,
            'user_id' => 4, // Budi Santoso
            'rating' => 5,
            'komentar' => 'Proses rekrutmen sangat profesional dan transparan. Benefit yang ditawarkan juga sangat menarik.',
            'created_at' => now()->subDays(15),
            'updated_at' => now()->subDays(15),
        ]);

        PerusahaanUlasan::create([
            'perusahaan_id' => 1,
            'user_id' => 5, // Ahmad Ridwan
            'rating' => 4,
            'komentar' => 'Perusahaan yang baik dengan lingkungan kerja yang mendukung. Hanya saja lokasi agak jauh dari pusat kota.',
            'created_at' => now()->subDays(12),
            'updated_at' => now()->subDays(12),
        ]);

        PerusahaanUlasan::create([
            'perusahaan_id' => 1,
            'user_id' => 7, // Deni Prasetyo
            'rating' => 5,
            'komentar' => 'Saya pernah bekerja di sini selama kontrak 1 tahun. Sangat profesional dan alat safety lengkap.',
            'created_at' => now()->subDays(20),
            'updated_at' => now()->subDays(20),
        ]);

        // Ulasan untuk CV FlyHigh Sinergi Indonesia
        PerusahaanUlasan::create([
            'perusahaan_id' => 2,
            'user_id' => 8, // Rini Susanti
            'rating' => 3,
            'komentar' => 'Perusahaan cukup baik tetapi manajemen masih perlu diperbaiki.',
            'created_at' => now()->subDays(8),
            'updated_at' => now()->subDays(8),
        ]);

        PerusahaanUlasan::create([
            'perusahaan_id' => 2,
            'user_id' => 6, // Siti Nurhaliza
            'rating' => 4,
            'komentar' => 'Sangat ramah terhadap fresh graduate, memberikan pelatihan yang bermanfaat.',
            'created_at' => now()->subDays(10),
            'updated_at' => now()->subDays(10),
        ]);

        // Ulasan untuk PT Teknik Industri Nusantara
        PerusahaanUlasan::create([
            'perusahaan_id' => 3,
            'user_id' => 4, // Budi Santoso
            'rating' => 4,
            'komentar' => 'Perusahaan yang bagus untuk pemula, banyak program pelatihan dan pengembangan.',
            'created_at' => now()->subDays(25),
            'updated_at' => now()->subDays(25),
        ]);

        PerusahaanUlasan::create([
            'perusahaan_id' => 3,
            'user_id' => 6, // Siti Nurhaliza
            'rating' => 5,
            'komentar' => 'Sangat cocok untuk fresh graduate yang ingin belajar lebih banyak tentang industri pengelasan.',
            'created_at' => now()->subDays(18),
            'updated_at' => now()->subDays(18),
        ]);
    }
}
