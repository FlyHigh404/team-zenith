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
                'lokasi' => 'Jakarta',
                'notelp' => '081234567890',
                'levelProfesional' => '3',
                'keahlian' => 'plate',
                'createdAt' => now(),
            ]
        );

        // Create user with known credentials
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'username' => 'testuser',
                'nama' => 'User',
                'password' => Hash::make('password'),
                'desc' => 'Test account for development',
                'birthdate' => '1995-05-15',
                'fotoProfil' => null,
                'lokasi' => 'Surabaya',
                'notelp' => '082345678901',
                'levelProfesional' => '2',
                'keahlian' => 'pipe',
                'createdAt' => now(),
            ]
        );

        // Create 10 random users
        User::factory(10)->create();
    }
}
