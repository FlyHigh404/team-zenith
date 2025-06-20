<?php

namespace Database\Seeders;

use App\Models\CertificationRegistration;
use Illuminate\Database\Seeder;

class CertificationRegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pendaftaran untuk Welding Inspector
        CertificationRegistration::create([
            'user_id' => 4, // Budi Santoso
            'sertifikasi_id' => 1, // Sertifikasi Welding Inspector
            'status' => 'Diterima',
            'alasan' => 'Peserta memenuhi semua persyaratan dan memiliki pengalaman yang relevan',
            'created_at' => now()->subDays(25),
            'updated_at' => now()->subDays(23),
        ]);

        CertificationRegistration::create([
            'user_id' => 7, // Deni Prasetyo
            'sertifikasi_id' => 1, // Sertifikasi Welding Inspector
            'status' => 'Diterima',
            'alasan' => 'Peserta memiliki pengalaman yang sangat baik di bidang inspeksi pengelasan',
            'created_at' => now()->subDays(24),
            'updated_at' => now()->subDays(22),
        ]);

        CertificationRegistration::create([
            'user_id' => 8, // Rini Susanti
            'sertifikasi_id' => 1, // Sertifikasi Welding Inspector
            'status' => 'Ditolak',
            'alasan' => 'Peserta belum memiliki pengalaman yang cukup sesuai persyaratan (min. 3 tahun)',
            'created_at' => now()->subDays(23),
            'updated_at' => now()->subDays(21),
        ]);

        // Pendaftaran untuk 6G Pipe Welding SMAW
        CertificationRegistration::create([
            'user_id' => 5, // Ahmad Ridwan
            'sertifikasi_id' => 2, // Sertifikasi 6G Pipe Welding SMAW
            'status' => 'Diterima',
            'alasan' => 'Peserta memiliki kualifikasi yang sangat baik untuk pelatihan ini',
            'created_at' => now()->subDays(15),
            'updated_at' => now()->subDays(13),
        ]);

        CertificationRegistration::create([
            'user_id' => 4, // Budi Santoso
            'sertifikasi_id' => 2, // Sertifikasi 6G Pipe Welding SMAW
            'status' => 'Diterima',
            'alasan' => 'Peserta memiliki pengalaman 3G yang baik dan siap untuk level lanjutan',
            'created_at' => now()->subDays(14),
            'updated_at' => now()->subDays(12),
        ]);

        // Pendaftaran untuk Basic SMAW Training
        CertificationRegistration::create([
            'user_id' => 6, // Siti Nurhaliza
            'sertifikasi_id' => 3, // Basic SMAW Training
            'status' => 'Diterima',
            'alasan' => 'Peserta memenuhi persyaratan dasar untuk pelatihan pemula',
            'created_at' => now()->subDays(10),
            'updated_at' => now()->subDays(9),
        ]);

        // Pendaftaran untuk GTAW Welding for Stainless Steel
        CertificationRegistration::create([
            'user_id' => 5, // Ahmad Ridwan
            'sertifikasi_id' => 4, // GTAW Welding for Stainless Steel
            'status' => 'Diterima',
            'alasan' => 'Peserta memiliki pengalaman GTAW yang sangat baik',
            'created_at' => now()->subDays(8),
            'updated_at' => now()->subDays(7),
        ]);

        CertificationRegistration::create([
            'user_id' => 8, // Rini Susanti
            'sertifikasi_id' => 4, // GTAW Welding for Stainless Steel
            'status' => 'Menunggu',
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(3),
        ]);

        // Pendaftaran untuk Welding Code Workshop
        CertificationRegistration::create([
            'user_id' => 7, // Deni Prasetyo
            'sertifikasi_id' => 5, // Welding Code Workshop
            'status' => 'Diterima',
            'alasan' => 'Peserta memiliki pengalaman yang sangat relevan dengan materi workshop',
            'created_at' => now()->subDays(4),
            'updated_at' => now()->subDays(3),
        ]);

        CertificationRegistration::create([
            'user_id' => 4, // Budi Santoso
            'sertifikasi_id' => 5, // Welding Code Workshop
            'status' => 'Menunggu',
            'created_at' => now()->subDays(2),
            'updated_at' => now()->subDays(2),
        ]);
    }
}
