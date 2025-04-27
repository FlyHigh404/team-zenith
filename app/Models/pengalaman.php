<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengalaman extends Model
{
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
    ];

    protected $casts = [
        'levelProfesional' => 'array', // karena bentuknya array
        'masihBekerja' => 'boolean',
    ];
}
