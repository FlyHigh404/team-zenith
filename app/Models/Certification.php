<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasFactory;

    protected $table = 'sertifikasi';

    protected $fillable = [
        'users_id',
        'nama',
        'tanggalisu',
        'tanggalExpired',
        'levelSertifikasi',
        'jenisSertifikat',
        'media',
    ];

    protected $casts = [
        'tanggalisu' => 'date',
        'tanggalExpired' => 'date',
    ];

    // Relasi dengan user
    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
