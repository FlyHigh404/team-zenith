<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostinganLike extends Model
{
    protected $table = 'postingan_likes';
    protected $fillable = [
        'user_id',
        'postingan_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function postingan()
    {
        return $this->belongsTo(Postingan::class);
    }
}