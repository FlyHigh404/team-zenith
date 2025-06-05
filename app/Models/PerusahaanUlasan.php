<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerusahaanUlasan extends Model
{
    use HasFactory;

    protected $table = 'perusahaan_ulasan';

    protected $fillable = [
        'perusahaan_id',
        'user_id',
        'rating',
        'komentar'
    ];

    // Relasi dengan perusahaan
    public function perusahaan()
    {
        return $this->belongsTo(Perusahaan::class);
    }

    // Relasi dengan user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Event setelah simpan/update rating
    protected static function booted()
    {
        static::saved(function ($ulasan) {
            $ulasan->perusahaan->updateRating();
        });

        static::deleted(function ($ulasan) {
            $ulasan->perusahaan->updateRating();
        });
    }
}
