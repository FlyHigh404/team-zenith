<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    use HasFactory;

    protected $table = 'koneksi';

    protected $fillable = [
        'user_id',
        'koneksi_user_id',
        'status',
        'tanggalKoneksi',
    ];

    protected $casts = [
        'tanggalKoneksi' => 'datetime'
    ];

    /**
     * Relasi ke model User sebagai pengirim koneksi.
     */
    public function pengirim()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relasi ke model User sebagai penerima koneksi.
     */
    public function penerima()
    {
        return $this->belongsTo(User::class, 'koneksi_user_id');
    }
}
