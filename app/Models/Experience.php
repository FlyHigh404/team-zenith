<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $table = 'pengalaman';

    protected $fillable = [
        'users_id',
        'namaPerusahaan',
        'posisi',
        'levelProfesional',
        'kota',
        'provinsi',
        'tanggalMulai',
        'tanggalSelesai',
        'masihBekerja',
        'media'
    ];

    protected $casts = [
        'levelProfesional' => 'array',
        'tanggalMulai' => 'date',
        'tanggalSelesai' => 'date',
        'masihBekerja' => 'boolean'
    ];

    // Relasi dengan user
    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
