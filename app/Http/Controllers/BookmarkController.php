<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
public function storeBookmark(Request $request)
{
    $request->validate([
        'bookmarkable_id' => 'required|integer',
        'bookmarkable_type' => 'required|string',
    ]);

    $user = auth()->user();
    $typeInput = strtolower($request->bookmarkable_type);
    $id = $request->bookmarkable_id;

    // Map input sederhana ke model
    $typeMap = [
        'experience' => \App\Models\Experience::class,
        'postingan' => \App\Models\Postingan::class,
        'certification' => \App\Models\AdminCertification::class,
    ];

    if (!array_key_exists($typeInput, $typeMap)) {
        return response()->json(['message' => 'Tipe bookmark tidak valid'], 400);
    }

    $modelClass = $typeMap[$typeInput];

    // Cek apakah model dengan ID tersebut benar-benar ada
    if (!$modelClass::find($id)) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }

    // Cek apakah sudah dibookmark
    $alreadyBookmarked = Bookmark::where('user_id', $user->id)
        ->where('bookmarkable_id', $id)
        ->where('bookmarkable_type', $typeInput) // simpan string sederhana
        ->exists();

    if ($alreadyBookmarked) {
        return response()->json(['message' => 'Sudah disimpan'], 409);
    }

    // Simpan bookmark
    $bookmark = Bookmark::create([
        'user_id' => $user->id,
        'bookmarkable_id' => $id,
        'bookmarkable_type' => $typeInput, // simpan string sederhana
    ]);

    return response()->json(['message' => 'Berhasil disimpan', 'data' => $bookmark], 201);
}


    public function destroy(Request $request)
    {
        $request->validate([
            'bookmarkable_id' => 'required|integer',
            'bookmarkable_type' => 'required|string',
        ]);

        $typeMap = [
            'experience' => \App\Models\Experience::class,
            'postingan' => \App\Models\Postingan::class,
            'certification' => \App\Models\AdminCertification::class,
        ];

        $typeInput = strtolower($request->bookmarkable_type);

        if (!array_key_exists($typeInput, $typeMap)) {
            return response()->json(['message' => 'Tipe bookmark tidak valid'], 400);
        }

        Bookmark::where('user_id', Auth::id())
            ->where('bookmarkable_id', $request->bookmarkable_id)
            ->where('bookmarkable_type', $typeInput) // string sederhana
            ->delete();

        return response()->json(['message' => 'Dihapus dari bookmark']);
    }


    public function index()
    {
        $bookmarks = Bookmark::with('bookmarkable')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($bookmarks);
    }
}
