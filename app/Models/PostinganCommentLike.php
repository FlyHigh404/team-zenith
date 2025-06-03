<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostinganCommentLike extends Model
{
    protected $table = 'postingan_comment_likes';
    protected $fillable = [
        'user_id',
        'postingan_comment_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comment()
    {
        return $this->belongsTo(PostinganComment::class, 'postingan_comment_id');
    }
}