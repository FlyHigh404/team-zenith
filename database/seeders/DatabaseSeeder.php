<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PerusahaanSeeder::class,
            LokerSeeder::class,
            LokerApplicantSeeder::class,
            PerusahaanUlasanSeeder::class,
            PostinganSeeder::class,
            PostinganLikeSeeder::class,
            PostinganCommentSeeder::class,
            PostinganCommentLikeSeeder::class,
            ConnectionSeeder::class,
            BookmarkSeeder::class,
            ExperienceSeeder::class,
            CertificationSeeder::class,
            AdminCertificationSeeder::class,
            CertificationRegistrationSeeder::class,
        ]);
    }
}
