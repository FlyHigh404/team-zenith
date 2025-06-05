<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostinganComment extends Model
{
    protected $table = 'postingan_comments';
    protected $fillable = [
        'user_id',
        'postingan_id',
        'comment',
        'parent_id', // tambahkan parent_id untuk reply
    ];

    // Relasi ke user yang membuat komentar
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke postingan
    public function postingan()
    {
        return $this->belongsTo(Postingan::class);
    }

    // Relasi ke komentar parent (untuk reply)
    public function parent()
    {
        return $this->belongsTo(PostinganComment::class, 'parent_id');
    }

    // Relasi ke komentar balasan (child)
    public function replies()
    {
        return $this->hasMany(PostinganComment::class, 'parent_id');
    }

    
    public function children()
    {
        return $this->hasMany(PostinganComment::class, 'parent_id', 'id')->with('children');
    }

    // Relasi ke like pada komentar
    public function likes()
    {
        return $this->hasMany(PostinganCommentLike::class, 'postingan_comment_id');
    }
}