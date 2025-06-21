<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perusahaan extends Model
{
    use HasFactory;

    protected $table = 'perusahaan';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'nama',
        'deskripsi',
        'alamat',
        'kota',
        'provinsi',
        'notelp',
        'email',
        'jumlahPegawai',
        'logo',
        'rating',
        'jumlahUlasan',
        'createdAt',
        'updatedAt'
    ];

    protected $casts = [
        'createdAt' => 'datetime',
        'updatedAt' => 'datetime',
        'rating' => 'float'
    ];

    // Relasi dengan user (admin perusahaan)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi dengan loker yang dibuat oleh perusahaan
    public function loker()
    {
        return $this->hasMany(Loker::class, 'perusahaan_id');
    }

    /**
     * Get all lokers for this company (no user restriction)
     */
    public function lokers()
    {
        return $this->hasMany(Loker::class);
    }

    // Relasi dengan ulasan perusahaan
    public function ulasan()
    {
        return $this->hasMany(PerusahaanUlasan::class);
    }

    // Menghitung rating rata-rata
    public function updateRating()
    {
        $avgRating = $this->ulasan()->avg('rating') ?: 0;
        $this->rating = round($avgRating, 1);
        $this->jumlahUlasan = $this->ulasan()->count();
        $this->save();
    }
}
