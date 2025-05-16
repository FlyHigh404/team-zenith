<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@zenith.com'],
            [
                'username' => 'admin',
                'nama' => 'Administrator',
                'password' => Hash::make('admin123'),
                'desc' => 'Akun administrator',
                'birthdate' => '1990-01-01',
                'provinsi' => 'Jakarta',
                'kota' => 'Jakarta Pusat',
                'notelp' => '081234567890',
                'levelProfesional' => json_encode(['Admin']),
                'keahlian' => json_encode(['Admin']),
                'createdAt' => now(),
                'role' => 'admin'
            ]
        );
    }
}
