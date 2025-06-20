<?php

namespace Database\Seeders;

use App\Models\LokerApplicant;
use Illuminate\Database\Seeder;

class LokerApplicantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lamaran 1 - Budi melamar sebagai Welding Inspector
        LokerApplicant::create([
            'loker_id' => 1, // Welding Inspector
            'user_id' => 4, // Budi Santoso
            'nama' => 'Budi Santoso',
            'tanggalLahir' => '1992-03-15',
            'notelp' => '08567890123',
            'email' => 'budi@gmail.com',
            'alamat' => 'Jl. Kenangan No. 5, Rungkut Kidul',
            'provinsi' => 'Jawa Timur',
            'kota' => 'Surabaya',
            'tentang' => 'Saya adalah seorang welder berpengalaman dengan sertifikasi 3G SMAW yang ingin berkarir sebagai Welding Inspector.',
            'cv' => 'budi_santoso_cv.pdf',
            'status' => 'Diterima',
            'alasan' => 'Kandidat memiliki pengalaman dan kualifikasi yang sesuai dengan kebutuhan posisi.',
            'created_at' => now()->subDays(4),
            'updated_at' => now()->subDays(2),
        ]);

        // Lamaran 2 - Ahmad melamar sebagai Welder 6G SMAW
        LokerApplicant::create([
            'loker_id' => 2, // Welder 6G SMAW
            'user_id' => 5, // Ahmad Ridwan
            'nama' => 'Ahmad Ridwan',
            'tanggalLahir' => '1985-12-10',
            'notelp' => '08678901234',
            'email' => 'ahmad@gmail.com',
            'alamat' => 'Jl. Pemuda No. 23, Rawalumbu',
            'provinsi' => 'Jawa Barat',
            'kota' => 'Bekasi',
            'tentang' => 'Senior Welder dengan pengalaman 8 tahun dan sertifikasi 6G GTAW dan SMAW. Memiliki pengalaman proyek pipeline di beberapa lokasi di Indonesia.',
            'cv' => 'ahmad_ridwan_cv.pdf',
            'status' => 'Diterima',
            'alasan' => 'Kandidat memiliki pengalaman yang sangat baik dan sertifikasi yang dibutuhkan.',
            'created_at' => now()->subDays(6),
            'updated_at' => now()->subDays(4),
        ]);

        // Lamaran 3 - Siti melamar sebagai Junior Welder
        LokerApplicant::create([
            'loker_id' => 5, // Junior Welder 1G SMAW
            'user_id' => 6, // Siti Nurhaliza
            'nama' => 'Siti Nurhaliza',
            'tanggalLahir' => '2000-06-22',
            'notelp' => '08789012345',
            'email' => 'siti@gmail.com',
            'alamat' => 'Jl. Perjuangan No. 45, Rawamangun',
            'provinsi' => 'DKI Jakarta',
            'kota' => 'Jakarta Timur',
            'tentang' => 'Fresh graduate dari SMK Teknik Pengelasan dengan nilai terbaik. Memiliki dasar pengetahuan SMAW yang baik.',
            'cv' => 'siti_nurhaliza_cv.pdf',
            'status' => 'Dilamar',
            'created_at' => now()->subDay(),
            'updated_at' => now()->subDay(),
        ]);

        // Lamaran 4 - Deni melamar sebagai Supervisor Welding
        LokerApplicant::create([
            'loker_id' => 4, // Supervisor Welding
            'user_id' => 7, // Deni Prasetyo
            'nama' => 'Deni Prasetyo',
            'tanggalLahir' => '1978-09-30',
            'notelp' => '08890123456',
            'email' => 'deni@gmail.com',
            'alamat' => 'Perum Griya Indah Blok C7 No. 9, Tembalang',
            'provinsi' => 'Jawa Tengah',
            'kota' => 'Semarang',
            'tentang' => 'Welding Inspector dengan pengalaman 10+ tahun di berbagai proyek minyak dan gas. Memiliki kemampuan leadership dan sertifikasi lengkap.',
            'cv' => 'deni_prasetyo_cv.pdf',
            'status' => 'Dilamar',
            'created_at' => now()->subDays(2),
            'updated_at' => now()->subDays(2),
        ]);

        // Lamaran 5 - Rini melamar sebagai Welder 3G GMAW
        LokerApplicant::create([
            'loker_id' => 3, // Welder 3G GMAW
            'user_id' => 8, // Rini Susanti
            'nama' => 'Rini Susanti',
            'tanggalLahir' => '1995-05-17',
            'notelp' => '08901234567',
            'email' => 'rini@gmail.com',
            'alamat' => 'Jl. Merdeka No. 17, Ciputat',
            'provinsi' => 'Banten',
            'kota' => 'Tangerang',
            'tentang' => 'Welder dengan pengalaman 3 tahun di proyek konstruksi. Memiliki sertifikasi 2G dan 3G SMAW.',
            'cv' => 'rini_susanti_cv.pdf',
            'status' => 'Ditolak',
            'alasan' => 'Kandidat tidak memiliki sertifikasi GMAW yang dibutuhkan untuk posisi ini.',
            'created_at' => now()->subDays(5),
            'updated_at' => now()->subDays(3),
        ]);

        // Lamaran 6 - Budi melamar sebagai Welder 3G GMAW
        LokerApplicant::create([
            'loker_id' => 3, // Welder 3G GMAW
            'user_id' => 4, // Budi Santoso
            'nama' => 'Budi Santoso',
            'tanggalLahir' => '1992-03-15',
            'notelp' => '08567890123',
            'email' => 'budi@gmail.com',
            'alamat' => 'Jl. Kenangan No. 5, Rungkut Kidul',
            'provinsi' => 'Jawa Timur',
            'kota' => 'Surabaya',
            'tentang' => 'Welder berpengalaman dengan sertifikasi 3G SMAW. Saya juga memiliki pengalaman dasar dengan GMAW.',
            'cv' => 'budi_santoso_cv_update.pdf',
            'status' => 'Dilamar',
            'created_at' => now()->subDays(1),
            'updated_at' => now()->subDays(1),
        ]);
    }
}
