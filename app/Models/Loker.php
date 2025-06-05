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
        'perusahaan_id',
        'judul',
        'desc',
        'durasi_bulan',
        'pengalaman',
        'lokasi',
        'provinsi',
        'kota',
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
        'jenisIndustri' => 'array',
        'tanggalMulai' => 'date',
        'tanggalSelesai' => 'date',
        'createdAt' => 'datetime',
        'updatedAt' => 'datetime',
    ];

    // Relasi dengan perusahaan
    public function perusahaan()
    {
        return $this->belongsTo(Perusahaan::class);
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

    // Format gaji untuk tampilan
    public function getFormattedGajiAttribute()
    {
        return 'Rp' . number_format($this->gaji, 0, ',', '.');
    }

    // Format durasi untuk tampilan
    public function getDurasiKategoriAttribute()
    {
        if ($this->durasi_bulan < 3) {
            return 'Jangka Pendek';
        } elseif ($this->durasi_bulan <= 12) {
            return 'Jangka Menengah';
        } else {
            return 'Jangka Panjang';
        }
    }

    // Format pengalaman untuk tampilan
    public function getFormattedPengalamanAttribute()
    {
        return $this->pengalaman . ' tahun';
    }

    // Format pengalaman untuk filter
    public function getPengalamanKategoriAttribute()
    {
        if ($this->pengalaman < 1) {
            return '< 1 tahun';
        } elseif ($this->pengalaman <= 3) {
            return '1-3 tahun';
        } elseif ($this->pengalaman <= 6) {
            return '3-6 tahun';
        } else {
            return '> 6 tahun';
        }
    }
}
