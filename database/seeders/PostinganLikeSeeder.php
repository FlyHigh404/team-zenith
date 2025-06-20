<?php

namespace Database\Seeders;

use App\Models\PostinganLike;
use Illuminate\Database\Seeder;

class PostinganLikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Likes untuk postingan 1 (Budi)
        PostinganLike::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 1,
            'created_at' => now()->subDays(5)->addHours(1),
            'updated_at' => now()->subDays(5)->addHours(1),
        ]);

        PostinganLike::create([
            'user_id' => 6, // Siti
            'postingan_id' => 1,
            'created_at' => now()->subDays(5)->addHours(2),
            'updated_at' => now()->subDays(5)->addHours(2),
        ]);

        PostinganLike::create([
            'user_id' => 7, // Deni
            'postingan_id' => 1,
            'created_at' => now()->subDays(5)->addHours(4),
            'updated_at' => now()->subDays(5)->addHours(4),
        ]);

        // Likes untuk postingan 2 (Ahmad)
        PostinganLike::create([
            'user_id' => 4, // Budi
            'postingan_id' => 2,
            'created_at' => now()->subDays(7)->addHours(1),
            'updated_at' => now()->subDays(7)->addHours(1),
        ]);

        PostinganLike::create([
            'user_id' => 7, // Deni
            'postingan_id' => 2,
            'created_at' => now()->subDays(7)->addHours(3),
            'updated_at' => now()->subDays(7)->addHours(3),
        ]);

        PostinganLike::create([
            'user_id' => 6, // Siti
            'postingan_id' => 2,
            'created_at' => now()->subDays(6)->addHours(12),
            'updated_at' => now()->subDays(6)->addHours(12),
        ]);

        PostinganLike::create([
            'user_id' => 8, // Rini
            'postingan_id' => 2,
            'created_at' => now()->subDays(6),
            'updated_at' => now()->subDays(6),
        ]);

        // Likes untuk postingan 3 (Deni)
        PostinganLike::create([
            'user_id' => 4, // Budi
            'postingan_id' => 3,
            'created_at' => now()->subDays(3)->addHours(2),
            'updated_at' => now()->subDays(3)->addHours(2),
        ]);

        PostinganLike::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 3,
            'created_at' => now()->subDays(3)->addHours(5),
            'updated_at' => now()->subDays(3)->addHours(5),
        ]);

        // Likes untuk postingan 4 (Siti)
        PostinganLike::create([
            'user_id' => 7, // Deni
            'postingan_id' => 4,
            'created_at' => now()->subDays(2)->addHours(1),
            'updated_at' => now()->subDays(2)->addHours(1),
        ]);

        PostinganLike::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 4,
            'created_at' => now()->subDays(2)->addHours(2),
            'updated_at' => now()->subDays(2)->addHours(2),
        ]);

        PostinganLike::create([
            'user_id' => 4, // Budi
            'postingan_id' => 4,
            'created_at' => now()->subDays(1)->addHours(10),
            'updated_at' => now()->subDays(1)->addHours(10),
        ]);

        // Likes untuk postingan 5 (Rini)
        PostinganLike::create([
            'user_id' => 4, // Budi
            'postingan_id' => 5,
            'created_at' => now()->subDay()->addHours(2),
            'updated_at' => now()->subDay()->addHours(2),
        ]);

        PostinganLike::create([
            'user_id' => 5, // Ahmad
            'postingan_id' => 5,
            'created_at' => now()->subDay()->addHours(4),
            'updated_at' => now()->subDay()->addHours(4),
        ]);

        // Likes untuk postingan 6 (Ahmad)
        PostinganLike::create([
            'user_id' => 7, // Deni
            'postingan_id' => 6,
            'created_at' => now()->subDays(4)->addHours(3),
            'updated_at' => now()->subDays(4)->addHours(3),
        ]);

        PostinganLike::create([
            'user_id' => 4, // Budi
            'postingan_id' => 6,
            'created_at' => now()->subDays(4)->addHours(5),
            'updated_at' => now()->subDays(4)->addHours(5),
        ]);

        PostinganLike::create([
            'user_id' => 8, // Rini
            'postingan_id' => 6,
            'created_at' => now()->subDays(3)->addHours(10),
            'updated_at' => now()->subDays(3)->addHours(10),
        ]);
    }
}
