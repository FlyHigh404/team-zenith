<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Perusahaan;
use App\Models\Loker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PerusahaanController extends Controller
{
    /**
     * Display a listing of all companies (not just owned by current user)
     * GET /admin/companies
     */
    public function index()
    {
        try {
            // Get all companies, not just those owned by current user
            $companies = Perusahaan::all();

            return response()->json([
                'status' => 'success',
                'message' => 'Daftar perusahaan berhasil diambil',
                'data' => $companies
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil daftar perusahaan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created company
     * POST /admin/companies
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nama' => 'required|string|max:100',
                'deskripsi' => 'required|string',
                'alamat' => 'required|string',
                'kota' => 'required|string|max:50',
                'provinsi' => 'required|string|max:50',
                'notelp' => 'nullable|string|max:25',
                'email' => 'nullable|email|max:100',
                'jumlahPegawai' => 'required|integer|min:1',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            $data['user_id'] = Auth::id();
            $data['createdAt'] = now();

            // Handle upload logo
            if ($request->hasFile('logo')) {
                $file = $request->file('logo');
                $fileName = time() . '_company_logo.' . $file->getClientOriginalExtension();
                $file->storeAs('public/company', $fileName);
                // Simpan path RELATIF dari storage/public
                $data['logo'] = 'company/' . $fileName;
            }

            $company = Perusahaan::create($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Perusahaan berhasil dibuat',
                'data' => $company
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membuat perusahaan',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified company
     * GET /admin/companies/{id}
     */
    public function show($id)
    {
        try {
            // Access any company, not just owned by current user
            $company = Perusahaan::findOrFail($id);

            return response()->json([
                'status' => 'success',
                'message' => 'Detail perusahaan berhasil diambil',
                'data' => $company
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengambil detail perusahaan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified company
     * PUT /admin/companies/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            // Access any company, not just owned by current user
            $company = Perusahaan::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nama' => 'sometimes|string|max:100',
                'deskripsi' => 'sometimes|string',
                'alamat' => 'sometimes|string',
                'kota' => 'sometimes|string|max:50',
                'provinsi' => 'sometimes|string|max:50',
                'notelp' => 'nullable|string|max:25',
                'email' => 'nullable|email|max:100',
                'jumlahPegawai' => 'sometimes|integer|min:1',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            $data['updatedAt'] = now();

            // Handle upload logo
            if ($request->hasFile('logo')) {
                if ($company->logo) {
                    Storage::delete('public/company/' . $company->logo);
                }
                $file = $request->file('logo');
                $fileName = time() . '_company_logo.' . $file->getClientOriginalExtension();
                $file->storeAs('public/company', $fileName);
                $data['logo'] = $fileName;
            }

            $company->update($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Perusahaan berhasil diperbarui',
                'data' => $company
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal memperbarui perusahaan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified company
     * DELETE /admin/companies/{id}
     */
    public function destroy($id)
    {
        try {
            // Access any company, not just owned by current user
            $company = Perusahaan::findOrFail($id);

            // Hapus logo jika ada
            if ($company->logo) {
                Storage::delete('public/company/' . $company->logo);
            }

            $company->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Perusahaan berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus perusahaan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
