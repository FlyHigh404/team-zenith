<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loker extends Model
{
    use HasFactory;

    protected $table = 'loker';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'judul',
        'desc',
        'durasi',
        'lokasi',
        'pengalaman',
        'jenisIndustri',
        'gaji',
        'tanggalMulai',
        'tanggalSelesai',
        'kualifikasi',
        'detail',
        'gambar',
        'createdAt',
        'updatedAt'
    ];

    protected $casts = [
        'detail' => 'array',
        'tanggalMulai' => 'date',
        'tanggalSelesai' => 'date',
        'createdAt' => 'datetime',
        'updatedAt' => 'datetime',
    ];

    // Relasi dengan user (pembuat loker)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi dengan pendaftar
    public function applicants()
    {
        return $this->hasMany(LokerApplicant::class);
    }

    // Hitung jumlah pendaftar
    public function jumlahApplicants()
    {
        return $this->applicants()->count();
    }
}
