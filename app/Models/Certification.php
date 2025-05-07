<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasFactory;

    protected $table = 'user_sertifikat';

    protected $fillable = [
        'user_id',
        'namaPerusahaan',
        'materiSertifikasi',
        'tanggalMulai',
        'tanggalBerakhir',
        'media'
    ];

    protected $casts = [
        'tanggalMulai' => 'date',
        'tanggalBerakhir' => 'date'
    ];

    // Relasi dengan user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
