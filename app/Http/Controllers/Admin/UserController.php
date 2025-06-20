<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Tampilkan daftar user dengan pagination (10 per halaman).
     */
    public function index(Request $request)
    {
        $users = User::paginate(10);
        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);
    }
}
