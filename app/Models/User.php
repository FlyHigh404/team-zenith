<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    public $timestamps = false;

    protected $fillable = [
        'nama',
        'username',
        'email',
        'password',
        'desc',
        'birthdate',
        'fotoProfil',
        'provinsi',
        'kota',
        'notelp',
        'levelProfesional',
        'keahlian',
        'pekerjaan',
        'createdAt',
        'role', // Menambahkan kolom role
        'is_active', // Menambahkan kolom is_active
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'levelProfesional' => 'array',
        'keahlian' => 'array',
        'pekerjaan' => 'array',
        'birthdate' => 'date',
        'createdAt' => 'datetime',
        'is_active' => 'boolean', // Menambahkan cast untuk is_active
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    // Relasi dengan pengalaman
    public function pengalaman()
    {
        return $this->hasMany(Experience::class, 'users_id');
    }

    // Relasi dengan sertifikat
    public function certifications()
    {
        return $this->hasMany(Certification::class, 'users_id');
    }

    // Relasi dengan user sertifikat
    public function userCertificates()
    {
        return $this->hasMany(UserCertificate::class);
    }

    // Relasi dengan pendaftaran sertifikasi
    public function certificationRegistrations()
    {
        return $this->hasMany(CertificationRegistration::class);
    }

    // Relasi koneksi yang dikirim oleh user
    public function koneksiDikirim()
    {
        return $this->hasMany(Connection::class, 'user_id');
    }

    // Relasi koneksi yang diterima oleh user
    public function koneksiDiterima()
    {
        return $this->hasMany(Connection::class, 'koneksi_user_id');
    }

    // Relasi bookmark
    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }


    // Relasi dengan authentication
    public function authentication()
    {
        return $this->hasOne(Authentication::class);
    }

    // Relasi dengan lowongan yang dibuat user
    public function loker()
    {
        return $this->hasMany(Loker::class);
    }

    // Relasi dengan lamaran kerja yang dibuat user
    public function jobApplications()
    {
        return $this->hasMany(LokerApplicant::class);
    }
}
