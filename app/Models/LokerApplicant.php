<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LokerApplicant extends Model
{
    use HasFactory;

    protected $table = 'loker_applicants';

    protected $fillable = [
        'loker_id',
        'user_id',
        'status',
        'alasan',
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
}
