<?php
// app/Http/Controllers/PostinganController.php
namespace App\Http\Controllers;

use App\Models\Postingan;
use App\Models\PostinganLike;
use App\Models\PostinganComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PostinganCommentLike;

class PostinganController extends Controller
{
    // Upload Postingan
    public function store(Request $request)
    {
        $data = $request->validate([
            'description' => 'required|string|max:1500',
            'attachment_file' => 'nullable|file',
            'attachment_image' => 'nullable|image',
        ]);

        $data['user_id'] = Auth::id();

        if ($request->hasFile('attachment_file')) {
            $data['attachment_file'] = $request->file('attachment_file')->store('attachments');
        }
        if ($request->hasFile('attachment_image')) {
            $data['attachment_image'] = $request->file('attachment_image')->store('images');
        }

        $post = Postingan::create($data);
        return response()->json($post, 201);
    }

    // Edit Postingan
    public function update(Request $request, $id)
    {
        $post = Postingan::findOrFail($id);

        // Cek apakah user yang mengedit adalah pemilik postingan
        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validasi input
        $data = $request->validate([
            'description' => 'required|string|max:1500',
            'attachment_file' => 'nullable|file',
            'attachment_image' => 'nullable|image',
        ]);

        // Update file jika ada
        if ($request->hasFile('attachment_file')) {
            // Hapus file lama jika ada
            if ($post->attachment_file && \Storage::exists($post->attachment_file)) {
                \Storage::delete($post->attachment_file);
            }
            $data['attachment_file'] = $request->file('attachment_file')->store('attachments');
        }

        if ($request->hasFile('attachment_image')) {
            // Hapus image lama jika ada
            if ($post->attachment_image && \Storage::exists($post->attachment_image)) {
                \Storage::delete($post->attachment_image);
            }
            $data['attachment_image'] = $request->file('attachment_image')->store('images');
        }

        $post->update($data);

        return response()->json($post);
    }


    // Hapus Postingan
    public function destroy($id)
    {
        $post = Postingan::find($id);

        // Jika postingan tidak ditemukan (sudah dihapus atau tidak pernah ada)
        if (!$post) {
            return response()->json(['message' => 'Tidak ada postingan yang perlu dihapus'], 404);
        }

        // Jika bukan milik user yang sedang login
        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->delete();
        return response()->json(['message' => 'Postingan deleted successfully']);
    }

    // Like Postingan
    public function like($id)
    {
        $like = PostinganLike::firstOrCreate([
            'user_id' => Auth::id(),
            'postingan_id' => $id,
        ]);
        return response()->json($like);
    }

    // Comment Postingan
    public function comment(Request $request, $id)
    {
        $data = $request->validate([
            'comment' => 'required|string',
        ]);
        $comment = PostinganComment::create([
            'user_id' => Auth::id(),
            'postingan_id' => $id,
            'comment' => $data['comment'],
        ]);
        return response()->json($comment, 201);
    }

    // Edit Comment Postingan
    public function updateComment(Request $request, $id)
    {
        $comment = PostinganComment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'comment' => 'required|string',
        ]);

        $comment->update(['comment' => $data['comment']]);

        return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment]);
    }

    // Hapus Comment Postingan
    public function destroyComment($id)
    {
        $comment = PostinganComment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment tidak ditemukan'], 404);
        }

        // Cek apakah user yang menghapus adalah pemilik comment
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment berhasil dihapus']);
    }

    // Balas Comment Postingan
    public function replyComment(Request $request, $id)
    {
        $parent = PostinganComment::findOrFail($id);

        $data = $request->validate([
            'comment' => 'required|string',
        ]);

        // Pastikan parent_id sesuai dengan postingan_id yang sama
        $reply = PostinganComment::create([
            'user_id' => Auth::id(),
            'postingan_id' => $parent->postingan_id, // penting agar sesuai
            'parent_id' => $parent->id,
            'comment' => $data['comment'],
        ]);

        return response()->json($reply, 201);
    }


    // Like Comment Postingan
    public function likeComment($id)
    {
        $like = PostinganCommentLike::firstOrCreate([
            'user_id' => Auth::id(),
            'postingan_comment_id' => $id,
        ]);

        return response()->json($like);
    }


    // View Count Postingan
    public function show($id)
{
    $post = Postingan::with(['likes', 'comments'])->findOrFail($id);

    // Increment view count setiap kali postingan diakses
    $post->increment('view_count');

    return response()->json($post);
}


    // Get Postingan
    public function index(Request $request)
    {
        $query = Postingan::with([
            'likes',
            'comments.user',
            'comments.likes',               // LIKE komentar utama
            'comments.children.user',
            'comments.children.likes',      // LIKE balasan komentar
            'comments.children.children.likes', // LIKE untuk nested reply (opsional)
            'comments.children.children.user'   // jika ingin user info nested reply
        ]);

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $postingan = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($postingan);
    }
}