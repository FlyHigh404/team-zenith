<?php

namespace Database\Seeders;

use App\Models\Perusahaan;
use Illuminate\Database\Seeder;

class PerusahaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Perusahaan 1
        Perusahaan::create([
            'user_id' => 2, // HR PT Petro Wellindo
            'nama' => 'PT Petro Wellindo',
            'deskripsi' => 'PT Petro Wellindo adalah perusahaan nasional yang bergerak di bidang jasa pengelasan, inspeksi teknik, dan konstruksi untuk sektor minyak & gas.',
            'alamat' => 'Jl. Rungkut Industri III No. 9, Rungkut',
            'kota' => 'Surabaya',
            'provinsi' => 'Jawa Timur',
            'notelp' => '031-8776543',
            'email' => 'info@petrowellindo.com',
            'jumlahPegawai' => 250,
            'logo' => 'petrowellindo.jpg',
            'rating' => 4.5,
            'jumlahUlasan' => 18,
            'createdAt' => now(),
        ]);

        // Perusahaan 2
        Perusahaan::create([
            'user_id' => 3, // HR FlyHigh Sinergi
            'nama' => 'CV FlyHigh Sinergi Indonesia',
            'deskripsi' => 'CV FlyHigh Sinergi Indonesia adalah perusahaan yang bergerak di bidang konstruksi dan pengelasan untuk berbagai proyek industri.',
            'alamat' => 'Gedung Menara Jaya Lt. 5, Jl. MH Thamrin No. 12',
            'kota' => 'Jakarta Pusat',
            'provinsi' => 'DKI Jakarta',
            'notelp' => '021-5551234',
            'email' => 'career@flyhighsinergi.co.id',
            'jumlahPegawai' => 120,
            'logo' => 'flyhigh.png',
            'rating' => 3.8,
            'jumlahUlasan' => 12,
            'createdAt' => now()->subDays(15),
        ]);

        // Perusahaan 3
        Perusahaan::create([
            'user_id' => 2, // HR PT Petro Wellindo juga mengelola perusahaan ini
            'nama' => 'PT Teknik Industri Nusantara',
            'deskripsi' => 'PT Teknik Industri Nusantara adalah perusahaan yang fokus pada fabrikasi dan perawatan alat-alat industri.',
            'alamat' => 'Jl. Karang Asem Timur No. 27',
            'kota' => 'Surabaya',
            'provinsi' => 'Jawa Timur',
            'notelp' => '031-5922345',
            'email' => 'hrd@tin.co.id',
            'jumlahPegawai' => 85,
            'logo' => 'tin.png',
            'rating' => 4.0,
            'jumlahUlasan' => 8,
            'createdAt' => now()->subDays(45),
        ]);
    }
}
