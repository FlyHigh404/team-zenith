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
            'status' => fake()->randomElement(['available', 'notavailable']),
            'desc' => fake()->paragraph(),
            'birthdate' => fake()->date(),
            'fotoProfil' => null,
            'lokasi' => fake()->city(),
            'notelp' => fake()->phoneNumber(),
            'levelProfesional' => fake()->randomElement(['1', '2', '3']),
            'keahlian' => fake()->randomElement(['plate', 'pipe']),
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
