<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pengalaman untuk Budi Santoso
        Experience::create([
            'users_id' => 4, // Budi Santoso
            'namaPerusahaan' => 'PT Konstruksi Baja Nusantara',
            'posisi' => 'Welder',
            'levelProfesional' => json_encode(['3G', 'SMAW']),
            'kota' => 'Surabaya',
            'provinsi' => 'Jawa Timur',
            'tanggalMulai' => '2019-03-15',
            'tanggalSelesai' => '2021-05-20',
            'masihBekerja' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Experience::create([
            'users_id' => 4, // Budi Santoso
            'namaPerusahaan' => 'PT Karya Mandiri Steel',
            'posisi' => 'Senior Welder',
            'levelProfesional' => json_encode(['3G', 'SMAW', 'GMAW']),
            'kota' => 'Sidoarjo',
            'provinsi' => 'Jawa Timur',
            'tanggalMulai' => '2021-06-10',
            'tanggalSelesai' => null,
            'masihBekerja' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pengalaman untuk Ahmad Ridwan
        Experience::create([
            'users_id' => 5, // Ahmad Ridwan
            'namaPerusahaan' => 'PT Offshore Engineering',
            'posisi' => 'Welder',
            'levelProfesional' => json_encode(['4G', 'GTAW', 'SMAW']),
            'kota' => 'Batam',
            'provinsi' => 'Kepulauan Riau',
            'tanggalMulai' => '2015-08-20',
            'tanggalSelesai' => '2019-10-15',
            'masihBekerja' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Experience::create([
            'users_id' => 5, // Ahmad Ridwan
            'namaPerusahaan' => 'PT Global Energy Solutions',
            'posisi' => 'Senior Welder',
            'levelProfesional' => json_encode(['6G', 'GTAW', 'SMAW']),
            'kota' => 'Jakarta Utara',
            'provinsi' => 'DKI Jakarta',
            'tanggalMulai' => '2019-11-01',
            'tanggalSelesai' => null,
            'masihBekerja' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pengalaman untuk Deni Prasetyo
        Experience::create([
            'users_id' => 7, // Deni Prasetyo
            'namaPerusahaan' => 'PT Rekayasa Industri',
            'posisi' => 'Welder',
            'levelProfesional' => json_encode(['3G', '4G', 'SMAW', 'FCAW']),
            'kota' => 'Jakarta Timur',
            'provinsi' => 'DKI Jakarta',
            'tanggalMulai' => '2010-02-15',
            'tanggalSelesai' => '2015-03-30',
            'masihBekerja' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Experience::create([
            'users_id' => 7, // Deni Prasetyo
            'namaPerusahaan' => 'PT Badak LNG',
            'posisi' => 'Senior Welding Inspector',
            'levelProfesional' => json_encode(['SMAW', 'GMAW', 'FCAW', 'GTAW']),
            'kota' => 'Bontang',
            'provinsi' => 'Kalimantan Timur',
            'tanggalMulai' => '2015-05-01',
            'tanggalSelesai' => '2020-06-30',
            'masihBekerja' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Experience::create([
            'users_id' => 7, // Deni Prasetyo
            'namaPerusahaan' => 'PT Pertamina Hulu Energi',
            'posisi' => 'Welding Inspector Supervisor',
            'levelProfesional' => json_encode(['SMAW', 'GMAW', 'FCAW', 'GTAW']),
            'kota' => 'Semarang',
            'provinsi' => 'Jawa Tengah',
            'tanggalMulai' => '2020-08-01',
            'tanggalSelesai' => null,
            'masihBekerja' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pengalaman untuk Rini Susanti
        Experience::create([
            'users_id' => 8, // Rini Susanti
            'namaPerusahaan' => 'PT Baja Makmur Perkasa',
            'posisi' => 'Junior Welder',
            'levelProfesional' => json_encode(['2G', '3G', 'SMAW']),
            'kota' => 'Tangerang',
            'provinsi' => 'Banten',
            'tanggalMulai' => '2021-01-10',
            'tanggalSelesai' => '2022-02-28',
            'masihBekerja' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Experience::create([
            'users_id' => 8, // Rini Susanti
            'namaPerusahaan' => 'PT Cipta Konstruksi Indonesia',
            'posisi' => 'Welder',
            'levelProfesional' => json_encode(['3G', 'SMAW']),
            'kota' => 'Tangerang Selatan',
            'provinsi' => 'Banten',
            'tanggalMulai' => '2022-03-15',
            'tanggalSelesai' => null,
            'masihBekerja' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
