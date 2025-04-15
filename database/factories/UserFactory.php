<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => fake()->unique()->userName(),
            'nama' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'desc' => fake()->sentence(),
            'birthdate' => fake()->date(),
            'fotoProfil' => null,
            'provinsi' => fake()->state(),
            'kota' => fake()->city(),
            'notelp' => fake()->phoneNumber(),
            'levelProfesional' => fake()->randomElements(['1F', '2G', '3G', '4G'], 2),
            'keahlian' => fake()->randomElements(['fillet', 'pelat', 'pipe'], 2),
            'createdAt' => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
