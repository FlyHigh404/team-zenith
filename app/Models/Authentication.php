<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Authentication extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'authentications';

    protected $fillable = [
        'user_id',
        'token'
    ];

    // Relasi dengan user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
