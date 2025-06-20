<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin pengelola website
        User::create([
            'nama' => 'Admin Zenith',
            'username' => 'admin',
            'email' => 'admin@zenith.com',
            'password' => Hash::make('password123'),
            'desc' => 'Administrator website Zenith',
            'birthdate' => '1990-01-01',
            'provinsi' => 'Jakarta',
            'kota' => 'Jakarta Selatan',
            'notelp' => '08123456789',
            'levelProfesional' => ['Admin'],
            'keahlian' => ['Website Management'],
            'pekerjaan' => ['Administrator'],
            'role' => 'admin',
            'createdAt' => now(),
        ]);

        // Admin perusahaan 1
        User::create([
            'nama' => 'HR PT Petro Wellindo',
            'username' => 'hr_petro',
            'email' => 'hr@petrowellindo.com',
            'password' => Hash::make('password123'),
            'desc' => 'Human Resources PT Petro Wellindo',
            'birthdate' => '1985-05-15',
            'provinsi' => 'Jawa Timur',
            'kota' => 'Surabaya',
            'notelp' => '08234567890',
            'levelProfesional' => ['HR Manager'],
            'keahlian' => ['Recruitment', 'HR Management'],
            'pekerjaan' => ['HR Manager'],
            'role' => 'admin',
            'createdAt' => now(),
        ]);

        // Admin perusahaan 2
        User::create([
            'nama' => 'HR FlyHigh Sinergi',
            'username' => 'hr_flyhigh',
            'email' => 'hr@flyhighsinergi.co.id',
            'password' => Hash::make('password123'),
            'desc' => 'Human Resources CV FlyHigh Sinergi Indonesia',
            'birthdate' => '1988-09-20',
            'provinsi' => 'DKI Jakarta',
            'kota' => 'Jakarta Pusat',
            'notelp' => '08345678901',
            'levelProfesional' => ['HR Specialist'],
            'keahlian' => ['Recruitment', 'HR Management'],
            'pekerjaan' => ['HR Specialist'],
            'role' => 'admin',
            'createdAt' => now(),
        ]);

        // Pengguna 1 - Welder
        User::create([
            'nama' => 'Budi Santoso',
            'username' => 'budisantoso',
            'email' => 'budi@gmail.com',
            'password' => Hash::make('password123'),
            'desc' => 'Welder berpengalaman dengan sertifikasi 3G SMAW',
            'birthdate' => '1992-03-15',
            'provinsi' => 'Jawa Timur',
            'kota' => 'Surabaya',
            'notelp' => '08567890123',
            'levelProfesional' => ['3G', 'SMAW'],
            'keahlian' => ['plate', 'pipe'],
            'pekerjaan' => ['Welder'],
            'createdAt' => now(),
        ]);

        // Pengguna 2 - Welder dengan pengalaman lebih
        User::create([
            'nama' => 'Ahmad Ridwan',
            'username' => 'ahmadridwan',
            'email' => 'ahmad@gmail.com',
            'password' => Hash::make('password123'),
            'desc' => 'Senior Welder dengan pengalaman 8 tahun dan sertifikasi 6G GTAW',
            'birthdate' => '1985-12-10',
            'provinsi' => 'Jawa Barat',
            'kota' => 'Bekasi',
            'notelp' => '08678901234',
            'levelProfesional' => ['6G', 'GTAW', 'SMAW'],
            'keahlian' => ['plate', 'pipe', 'fillet'],
            'pekerjaan' => ['Senior Welder'],
            'createdAt' => now(),
        ]);

        // Pengguna 3 - Fresh graduate
        User::create([
            'nama' => 'Siti Nurhaliza',
            'username' => 'sitinurhaliza',
            'email' => 'siti@gmail.com',
            'password' => Hash::make('password123'),
            'desc' => 'Fresh graduate dari SMK Teknik Pengelasan',
            'birthdate' => '2000-06-22',
            'provinsi' => 'DKI Jakarta',
            'kota' => 'Jakarta Timur',
            'notelp' => '08789012345',
            'levelProfesional' => ['1G', 'SMAW'],
            'keahlian' => ['plate'],
            'pekerjaan' => ['Junior Welder'],
            'createdAt' => now(),
        ]);

        // Pengguna 4 - Experienced Professional
        User::create([
            'nama' => 'Deni Prasetyo',
            'username' => 'deniprasetyo',
            'email' => 'deni@gmail.com',
            'password' => Hash::make('password123'),
            'desc' => 'Welding Inspector dengan pengalaman 10+ tahun',
            'birthdate' => '1978-09-30',
            'provinsi' => 'Jawa Tengah',
            'kota' => 'Semarang',
            'notelp' => '08890123456',
            'levelProfesional' => ['SMAW', 'GMAW', 'FCAW', 'GTAW'],
            'keahlian' => ['plate', 'pipe', 'fillet'],
            'pekerjaan' => ['Welding Inspector'],
            'createdAt' => now(),
        ]);

        // Pengguna 5 - Looking for job
        User::create([
            'nama' => 'Rini Susanti',
            'username' => 'rinisusanti',
            'email' => 'rini@gmail.com',
            'password' => Hash::make('password123'),
            'desc' => 'Sedang mencari pekerjaan di bidang pengelasan',
            'birthdate' => '1995-05-17',
            'provinsi' => 'Banten',
            'kota' => 'Tangerang',
            'notelp' => '08901234567',
            'levelProfesional' => ['2G', '3G', 'SMAW'],
            'keahlian' => ['plate', 'fillet'],
            'pekerjaan' => ['Welder'],
            'createdAt' => now(),
        ]);
    }
}
