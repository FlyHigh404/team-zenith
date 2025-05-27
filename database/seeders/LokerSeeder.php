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
                'pengalaman' => 4, // Integer: 4 tahun
                'jenisIndustri' => json_encode(['Pengelasan', 'Manufaktur']), // JSON array
                'gaji' => 7000000, // Integer: 7 juta
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
            [
                'user_id' => 1, // Admin ID
                'judul' => 'Welder - SMAW',
                'desc' => 'Dibutuhkan Welder SMAW berpengalaman untuk proyek konstruksi jangka panjang',
                'durasi' => 'Full Time',
                'lokasi' => 'Jakarta, DKI Jakarta',
                'pengalaman' => 2, // Integer: 2 tahun
                'jenisIndustri' => json_encode(['Pengelasan', 'Konstruksi']), // JSON array
                'gaji' => 5000000, // Integer: 5 juta
                'tanggalMulai' => now(),
                'tanggalSelesai' => now()->addMonth(6),
                'kualifikasi' => 'Memiliki sertifikasi Welder 3G/4G SMAW',
                'detail' => json_encode([
                    'Posisi Pengelasan' => ['3G', '4G'],
                    'Material' => ['Carbon Steel', 'Low Alloy'],
                    'Thickness' => ['5mm - 20mm'],
                    'Keselamatan' => ['K3 Pengelasan'],
                    'Peralatan' => ['Mesin SMAW', 'Alat Ukur', 'Alat Potong']
                ]),
                'createdAt' => now(),
            ],
            [
                'user_id' => 2, // Company ID
                'judul' => 'Painter - Industrial Coating',
                'desc' => 'Kami mencari Painter berpengalaman untuk proyek coating industri',
                'durasi' => 'Contract',
                'lokasi' => 'Batam, Kepulauan Riau',
                'pengalaman' => 3, // Integer: 3 tahun
                'jenisIndustri' => json_encode(['Coating', 'Minyak & Gas']), // JSON array
                'gaji' => 6500000, // Integer: 6.5 juta
                'tanggalMulai' => now()->addWeek(),
                'tanggalSelesai' => now()->addMonth(4),
                'kualifikasi' => 'Berpengalaman dalam coating industri, familiar dengan standar NACE',
                'detail' => json_encode([
                    'Jenis Coating' => ['Epoxy', 'Polyurethane', 'Zinc Rich'],
                    'Peralatan' => ['Airless Spray', 'Conventional Spray'],
                    'Safety' => ['Confined Space Training', 'Working at Height'],
                    'Standard' => ['NACE', 'SSPC']
                ]),
                'createdAt' => now(),
            ],
        ];

        foreach ($loker as $job) {
            Loker::create($job);
        }
    }
}
