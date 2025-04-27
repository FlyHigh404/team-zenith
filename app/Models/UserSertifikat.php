<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSertifikat extends Model
{
    use HasFactory;

    protected $table = 'user_sertifikat';

    protected $fillable = [
        'user_id',
        'namaPerusahaan',
        'materiSertifikasi',
        'tanggalMulai',
        'tanggalBerakhir',
        'media',
    ];
}