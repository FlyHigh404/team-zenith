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
        // Create user with known credentials
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'username' => 'mainuser',
                'nama' => 'Main Test User',
                'password' => Hash::make('testuser'),
                'desc' => 'System administrator',
                'birthdate' => '1990-01-01',
                'fotoProfil' => null,
                'provinsi' => 'DKI Jakarta',
                'kota' => 'Jakarta',
                'notelp' => '081234567890',
                'levelProfesional' => json_encode(['3G', '4G']),
                'keahlian' => json_encode(['plate', 'pipe']),
                'createdAt' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'testuser@example.com'],
            [
                'username' => 'testuser',
                'nama' => 'Test User',
                'password' => Hash::make('password'),
                'desc' => 'Test account for development',
                'birthdate' => '1995-05-15',
                'fotoProfil' => null,
                'provinsi' => 'Jawa Timur',
                'kota' => 'Surabaya',
                'notelp' => '082345678901',
                'levelProfesional' => json_encode(['1F', '2G']),
                'keahlian' => json_encode(['fillet', 'pipe']),
                'createdAt' => now(),
            ]
        );
    }
}
