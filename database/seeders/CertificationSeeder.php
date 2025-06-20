<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\UserCertificate;
use Illuminate\Database\Seeder;

class CertificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sertifikasi User (dari model Certification)
        Certification::create([
            'users_id' => 4, // Budi Santoso
            'nama' => 'Sertifikasi Welder 3G SMAW',
            'tanggalisu' => '2020-01-15',
            'tanggalExpired' => '2025-01-14',
            'levelSertifikasi' => '3G SMAW',
            'jenisSertifikat' => 'Welding Certification',
            'media' => 'budi_3g_smaw_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Certification::create([
            'users_id' => 5, // Ahmad Ridwan
            'nama' => 'Sertifikasi Welder 6G GTAW',
            'tanggalisu' => '2019-05-10',
            'tanggalExpired' => '2024-05-09',
            'levelSertifikasi' => '6G GTAW',
            'jenisSertifikat' => 'Welding Certification',
            'media' => 'ahmad_6g_gtaw_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Certification::create([
            'users_id' => 5, // Ahmad Ridwan
            'nama' => 'Sertifikasi Welder 6G SMAW',
            'tanggalisu' => '2018-11-20',
            'tanggalExpired' => '2023-11-19',
            'levelSertifikasi' => '6G SMAW',
            'jenisSertifikat' => 'Welding Certification',
            'media' => 'ahmad_6g_smaw_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Certification::create([
            'users_id' => 6, // Siti Nurhaliza
            'nama' => 'Sertifikasi Welder 1G SMAW',
            'tanggalisu' => '2022-07-05',
            'tanggalExpired' => '2027-07-04',
            'levelSertifikasi' => '1G SMAW',
            'jenisSertifikat' => 'Welding Certification',
            'media' => 'siti_1g_smaw_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Certification::create([
            'users_id' => 7, // Deni Prasetyo
            'nama' => 'Sertifikasi Welding Inspector',
            'tanggalisu' => '2017-03-25',
            'tanggalExpired' => '2027-03-24',
            'levelSertifikasi' => 'CSWIP 3.1',
            'jenisSertifikat' => 'Welding Inspection Certification',
            'media' => 'deni_cswip_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Certification::create([
            'users_id' => 7, // Deni Prasetyo
            'nama' => 'Sertifikasi API 1104',
            'tanggalisu' => '2019-10-15',
            'tanggalExpired' => '2024-10-14',
            'levelSertifikasi' => 'API 1104',
            'jenisSertifikat' => 'Pipeline Welding Inspection',
            'media' => 'deni_api1104_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // User Certificate (data pelatihan)
        UserCertificate::create([
            'user_id' => 4, // Budi Santoso
            'namaPerusahaan' => 'Lembaga Sertifikasi Profesi Pengelasan',
            'materiSertifikasi' => 'SMAW 3G Plate Welding',
            'tanggalMulai' => '2020-01-05',
            'tanggalBerakhir' => '2025-01-04',
            'media' => 'budi_3g_smaw_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        UserCertificate::create([
            'user_id' => 5, // Ahmad Ridwan
            'namaPerusahaan' => 'Institut Pengelasan Indonesia',
            'materiSertifikasi' => 'GTAW 6G Pipe Welding',
            'tanggalMulai' => '2019-04-20',
            'tanggalBerakhir' => '2024-04-19',
            'media' => 'ahmad_6g_gtaw_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        UserCertificate::create([
            'user_id' => 7, // Deni Prasetyo
            'namaPerusahaan' => 'The Welding Institute (TWI)',
            'materiSertifikasi' => 'CSWIP 3.1 Welding Inspector',
            'tanggalMulai' => '2017-03-15',
            'tanggalBerakhir' => '2027-03-14',
            'media' => 'deni_cswip_cert.pdf',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
