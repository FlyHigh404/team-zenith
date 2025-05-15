<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CertificationRegistration extends Model
{
    use HasFactory;

    protected $table = 'sertifikasi_pendaftaran';

    protected $fillable = [
        'user_id',
        'sertifikasi_id',
        'status',
        'alasan',
    ];

    // Relasi dengan user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi dengan sertifikasi admin
    public function sertifikasi()
    {
        return $this->belongsTo(AdminCertification::class, 'sertifikasi_id');
    }
}
