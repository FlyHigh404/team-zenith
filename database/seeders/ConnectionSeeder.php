<?php
// filepath: d:\Jasss\Coding\Project\zenith\database\seeders\ConnectionSeeder.php

namespace Database\Seeders;

use App\Models\Connection;
use Illuminate\Database\Seeder;

class ConnectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Koneksi antara Budi dan Ahmad (diterima/mutual)
        Connection::create([
            'user_id' => 4, // Budi
            'koneksi_user_id' => 5, // Ahmad
            'status' => 'diterima',
            'tanggalKoneksi' => now()->subDays(20),
            'created_at' => now()->subDays(20),
            'updated_at' => now()->subDays(20),
        ]);

        Connection::create([
            'user_id' => 5, // Ahmad
            'koneksi_user_id' => 4, // Budi
            'status' => 'diterima',
            'tanggalKoneksi' => now()->subDays(20),
            'created_at' => now()->subDays(20),
            'updated_at' => now()->subDays(20),
        ]);

        // Koneksi antara Budi dan Deni (diterima/mutual)
        Connection::create([
            'user_id' => 4, // Budi
            'koneksi_user_id' => 7, // Deni
            'status' => 'diterima',
            'tanggalKoneksi' => now()->subDays(15),
            'created_at' => now()->subDays(15),
            'updated_at' => now()->subDays(15),
        ]);

        Connection::create([
            'user_id' => 7, // Deni
            'koneksi_user_id' => 4, // Budi
            'status' => 'diterima',
            'tanggalKoneksi' => now()->subDays(15),
            'created_at' => now()->subDays(15),
            'updated_at' => now()->subDays(15),
        ]);

        // Koneksi antara Ahmad dan Deni (diterima/mutual)
        Connection::create([
            'user_id' => 5, // Ahmad
            'koneksi_user_id' => 7, // Deni
            'status' => 'diterima',
            'tanggalKoneksi' => now()->subDays(10),
            'created_at' => now()->subDays(10),
            'updated_at' => now()->subDays(10),
        ]);

        Connection::create([
            'user_id' => 7, // Deni
            'koneksi_user_id' => 5, // Ahmad
            'status' => 'diterima',
            'tanggalKoneksi' => now()->subDays(10),
            'created_at' => now()->subDays(10),
            'updated_at' => now()->subDays(10),
        ]);

        // Koneksi Siti ke Ahmad (diajukan/pending)
        Connection::create([
            'user_id' => 6, // Siti
            'koneksi_user_id' => 5, // Ahmad
            'status' => 'diajukan',
            'tanggalKoneksi' => now()->subDays(3),
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(3),
        ]);

        // Koneksi Rini ke Budi (diajukan/pending)
        Connection::create([
            'user_id' => 8, // Rini
            'koneksi_user_id' => 4, // Budi
            'status' => 'diajukan',
            'tanggalKoneksi' => now()->subDays(2),
            'created_at' => now()->subDays(2),
            'updated_at' => now()->subDays(2),
        ]);

        // Koneksi Deni ke Siti (diterima/mutual)
        Connection::create([
            'user_id' => 7, // Deni
            'koneksi_user_id' => 6, // Siti
            'status' => 'diterima',
            'tanggalKoneksi' => now()->subDays(5),
            'created_at' => now()->subDays(5),
            'updated_at' => now()->subDays(5),
        ]);

        Connection::create([
            'user_id' => 6, // Siti
            'koneksi_user_id' => 7, // Deni
            'status' => 'diterima',
            'tanggalKoneksi' => now()->subDays(5),
            'created_at' => now()->subDays(5),
            'updated_at' => now()->subDays(5),
        ]);
    }
}
