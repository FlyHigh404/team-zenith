<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminCertification extends Model
{
    use HasFactory;

    protected $table = 'sertifikasi_admin';

    public $timestamps = false;

    protected $fillable = [
        'judul',
        'bidang',
        'jenisSertifikat',
        'tanggalMulai',
        'tanggalSelesai',
        'jamMulai',
        'jamSelesai',
        'lokasi',
        'metode',
        'deskripsi',
        'sertifikatDidapat',
        'syaratPeserta',
        'fasilitas',
        'kuota',
        'catatan',
        'gambar',
        'createdAt',
        'updatedAt',
    ];

    protected $casts = [
        'tanggalMulai' => 'date',
        'tanggalSelesai' => 'date',
        'jamMulai' => 'datetime',
        'jamSelesai' => 'datetime',
        'createdAt' => 'datetime',
        'updatedAt' => 'datetime',
    ];

    // Relasi dengan pendaftaran
    public function pendaftaran()
    {
        return $this->hasMany(CertificationRegistration::class, 'sertifikasi_id');
    }

    // Menghitung jumlah pendaftar
    public function jumlahPendaftar()
    {
        return $this->pendaftaran()->count();
    }

    // Mengecek apakah kuota masih tersedia
    public function isAvailable()
    {
        return $this->jumlahPendaftar() < $this->kuota;
    }
    
    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class, 'bookmarkable');
    }
}
