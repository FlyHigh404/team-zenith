<?php

namespace Database\Seeders;

use App\Models\Loker;
use Illuminate\Database\Seeder;

class LokerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loker = [
            [
                'user_id' => 1, // Admin ID
                'judul' => 'Welding Inspector',
                'desc' => 'Dibutuhkan Welding Inspector yang berpengalaman untuk proyek jangka panjang',
                'durasi' => 'Full Time',
                'lokasi' => 'Surabaya, Jawa Timur',
                'pengalaman' => '3-5 tahun',
                'jenisIndustri' => 'Pengelasan',
                'gaji' => 'Rp5.000.000 - Rp10.000.000',
                'tanggalMulai' => now(),
                'tanggalSelesai' => now()->addMonth(3),
                'kualifikasi' => 'Memiliki sertifikasi ASNT, AWS atau setara',
                'detail' => json_encode([
                    'Standar Teknik' => ['ASME', 'AWS'],
                    'Bahasa' => ['Indonesia', 'Inggris'],
                    'Software' => ['AutoCAD', 'SolidWorks'],
                    'Standar Keselamatan' => ['OHSAS', 'ISO 45001'],
                    'Keahlian' => ['Inspeksi Visual', 'UT', 'RT', 'PT', 'MT']
                ]),
                'createdAt' => now(),
            ],
            // Tambahkan data dummy lainnya
        ];

        foreach ($loker as $job) {
            Loker::create($job);
        }
    }
}
