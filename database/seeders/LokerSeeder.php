<?php

namespace Database\Seeders;

use App\Models\Loker;
use Illuminate\Database\Seeder;

class LokerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lowongan 1
        Loker::create([
            'perusahaan_id' => 1, // PT Petro Wellindo
            'judul' => 'Welding Inspector',
            'desc' => 'Sebagai Welding Inspector, Anda akan bertugas melakukan inspeksi sambungan las pada proyek minyak darat dan laut, memastikan hasil pengelasan memenuhi standar kualitas dan keselamatan berdasarkan ketentuan AWS dan ASME.',
            'durasi_bulan' => 12,
            'pengalaman' => 3,
            'lokasi' => 'Surabaya, Jawa Timur',
            'provinsi' => 'Jawa Timur',
            'kota' => 'Surabaya',
            'jenisIndustri' => json_encode(['Pengelasan', 'Minyak dan Gas']),
            'gaji' => 7500000,
            'tanggalMulai' => now()->addDays(10),
            'tanggalSelesai' => now()->addDays(10)->addYear(),
            'kualifikasi' => "- Minimal pendidikan D3 Teknik Mesin atau Pengelasan\n- Memiliki sertifikasi Welding Inspector\n- Pengalaman minimal 3 tahun sebagai Welding Inspector\n- Menguasai standar AWS D1.1 dan ASME Section IX",
            'detail' => json_encode([
                'Keahlian Teknis' => ['Pembacaan WPS', 'Interpretasi kode AWS/ASME', 'NDT'],
                'Peralatan' => ['WPS/PQR interpretation', 'Visual inspection tools'],
                'Bahasa' => ['Indonesia', 'English (basic)'],
            ]),
            'gambar' => 'welding_inspector.jpg',
            'createdAt' => now()->subDays(5),
        ]);

        // Lowongan 2
        Loker::create([
            'perusahaan_id' => 1, // PT Petro Wellindo
            'judul' => 'Welder 6G SMAW',
            'desc' => 'Dibutuhkan Welder dengan keahlian 6G SMAW untuk proyek pipeline di wilayah Jawa Timur. Bertanggung jawab dalam pengelasan pipa baja karbon dengan standar ASME.',
            'durasi_bulan' => 6,
            'pengalaman' => 2,
            'lokasi' => 'Gresik, Jawa Timur',
            'provinsi' => 'Jawa Timur',
            'kota' => 'Gresik',
            'jenisIndustri' => json_encode(['Pengelasan', 'Konstruksi', 'Minyak dan Gas']),
            'gaji' => 6000000,
            'tanggalMulai' => now()->addDays(15),
            'tanggalSelesai' => now()->addDays(15)->addMonths(6),
            'kualifikasi' => "- Minimal SMK Teknik Pengelasan\n- Memiliki sertifikasi 6G SMAW\n- Pengalaman 2 tahun dalam pengelasan pipa\n- Mampu bekerja di lapangan dengan kondisi ekstrem",
            'detail' => json_encode([
                'Material' => ['Carbon Steel', 'Stainless Steel'],
                'Posisi Pengelasan' => ['6G'],
                'Lokasi Kerja' => ['On-site', 'Remote area'],
            ]),
            'gambar' => 'welder_6g_smaw.jpg',
            'createdAt' => now()->subDays(7),
        ]);

        // Lowongan 3
        Loker::create([
            'perusahaan_id' => 2, // CV FlyHigh Sinergi Indonesia
            'judul' => 'Welder 3G GMAW',
            'desc' => 'CV FlyHigh Sinergi Indonesia membuka lowongan untuk Welder dengan keahlian 3G GMAW untuk proyek konstruksi di Jakarta. Pekerjaan meliputi pengelasan struktur baja untuk gedung bertingkat.',
            'durasi_bulan' => 8,
            'pengalaman' => 1,
            'lokasi' => 'Jakarta Selatan, DKI Jakarta',
            'provinsi' => 'DKI Jakarta',
            'kota' => 'Jakarta Selatan',
            'jenisIndustri' => json_encode(['Pengelasan', 'Konstruksi']),
            'gaji' => 5500000,
            'tanggalMulai' => now()->addWeek(),
            'tanggalSelesai' => now()->addWeek()->addMonths(8),
            'kualifikasi' => "- Minimal SMK Teknik Pengelasan\n- Memiliki sertifikasi 3G GMAW\n- Pengalaman minimal 1 tahun\n- Mampu bekerja dalam tim",
            'detail' => json_encode([
                'Material' => ['Carbon Steel'],
                'Posisi Pengelasan' => ['3G'],
                'Lokasi Kerja' => ['High-rise building'],
            ]),
            'gambar' => 'welder_3g_gmaw.jpg',
            'createdAt' => now()->subDays(10),
        ]);

        // Lowongan 4
        Loker::create([
            'perusahaan_id' => 2, // CV FlyHigh Sinergi Indonesia
            'judul' => 'Supervisor Welding',
            'desc' => 'Dibutuhkan Supervisor Welding untuk mengawasi tim welder dan memastikan kualitas pengelasan sesuai standar yang ditentukan pada proyek konstruksi gedung perkantoran.',
            'durasi_bulan' => 24,
            'pengalaman' => 5,
            'lokasi' => 'Jakarta Pusat, DKI Jakarta',
            'provinsi' => 'DKI Jakarta',
            'kota' => 'Jakarta Pusat',
            'jenisIndustri' => json_encode(['Pengelasan', 'Konstruksi', 'Manajemen']),
            'gaji' => 12000000,
            'tanggalMulai' => now()->addDays(20),
            'tanggalSelesai' => now()->addDays(20)->addYears(2),
            'kualifikasi' => "- Minimal D3 Teknik Mesin/Pengelasan\n- Memiliki sertifikasi Welding Inspector\n- Pengalaman minimal 5 tahun sebagai welder dan 2 tahun sebagai supervisor\n- Kemampuan leadership yang baik",
            'detail' => json_encode([
                'Keahlian' => ['Welding inspection', 'Team management', 'Quality control'],
                'Jumlah Tim' => ['10-15 welder'],
                'Lokasi Kerja' => ['Office building project'],
            ]),
            'gambar' => 'supervisor_welding.jpg',
            'createdAt' => now()->subDays(3),
        ]);

        // Lowongan 5
        Loker::create([
            'perusahaan_id' => 3, // PT Teknik Industri Nusantara
            'judul' => 'Junior Welder 1G SMAW',
            'desc' => 'PT Teknik Industri Nusantara membuka kesempatan bagi lulusan baru untuk posisi Junior Welder dengan keahlian dasar pengelasan SMAW. Kami menyediakan pelatihan lanjutan bagi kandidat terpilih.',
            'durasi_bulan' => 3,
            'pengalaman' => 0,
            'lokasi' => 'Surabaya, Jawa Timur',
            'provinsi' => 'Jawa Timur',
            'kota' => 'Surabaya',
            'jenisIndustri' => json_encode(['Pengelasan', 'Manufaktur']),
            'gaji' => 3500000,
            'tanggalMulai' => now()->addDays(5),
            'tanggalSelesai' => now()->addDays(5)->addMonths(3),
            'kualifikasi' => "- Minimal SMK Teknik Pengelasan\n- Memahami dasar-dasar pengelasan SMAW\n- Fresh graduate dipersilakan melamar\n- Bersedia mengikuti pelatihan",
            'detail' => json_encode([
                'Material' => ['Carbon Steel'],
                'Posisi Pengelasan' => ['1G'],
                'Program' => ['Training on-the-job'],
            ]),
            'gambar' => 'junior_welder.jpg',
            'createdAt' => now()->subDays(2),
        ]);
    }
}
