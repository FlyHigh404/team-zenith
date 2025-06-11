<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Postingan extends Model
{
    protected $table = 'postingan';
    protected $fillable = ['user_id', 'description', 'attachment_file', 'attachment_image', 'view_count'];

    public function likes() {
        return $this->hasMany(PostinganLike::class);
    }

    public function comments() {
    return $this->hasMany(PostinganComment::class)
                ->whereNull('parent_id')
                ->with([
                    'children.children',  // Jika kamu ingin dukungan 3 level
                    'children.user',
                    'children.likes',     // Tambahkan ini
                    'user',
                    'likes'               // Tambahkan ini
                ]);}
    
    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class, 'bookmarkable');
    }
}
