<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class LokerApplicant extends Model
{
    use HasFactory;

    protected $table = 'loker_applicants';

    protected $fillable = [
        'loker_id',
        'user_id',
        'nama',
        'tanggalLahir',
        'notelp',
        'email',
        'alamat',
        'provinsi',
        'kota',
        'tentang',
        'cv',
        'status',
        'alasan',
    ];

    protected $casts = [
        'tanggalLahir' => 'date',
    ];

    // Relasi ke loker
    public function loker()
    {
        return $this->belongsTo(Loker::class);
    }

    // Relasi ke user (pendaftar)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Hitung umur dari tanggal lahir
    public function getUmurAttribute()
    {
        return Carbon::parse($this->tanggalLahir)->age;
    }
}
