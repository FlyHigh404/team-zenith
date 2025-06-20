<?php

namespace Database\Seeders;

use App\Models\AdminCertification;
use Illuminate\Database\Seeder;

class AdminCertificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sertifikasi 1
        AdminCertification::create([
            'judul' => 'Sertifikasi Welding Inspector',
            'bidang' => 'Inspeksi',
            'jenisSertifikat' => 'CSWIP 3.1',
            'tanggalMulai' => now()->addMonth(),
            'tanggalSelesai' => now()->addMonth()->addDays(5),
            'jamMulai' => '08:00:00',
            'jamSelesai' => '17:00:00',
            'lokasi' => 'Jakarta',
            'metode' => 'Hybrid',
            'deskripsi' => 'Sertifikasi Welding Inspector mengikuti standar CSWIP 3.1 yang diakui secara internasional untuk inspektur pengelasan. Pelatihan ini mencakup teori dan praktik inspeksi visual, pengujian non-destructive, dan interpretasi standar pengelasan.',
            'sertifikatDidapat' => 'CSWIP 3.1 Welding Inspector Certificate (valid for 5 years)',
            'syaratPeserta' => "- Minimal 3 tahun pengalaman sebagai welder\n- Pengetahuan dasar mengenai standar AWS D1.1 dan ASME IX\n- Pendidikan minimal D3 Teknik Mesin atau sederajat",
            'fasilitas' => "- Materi pelatihan\n- Alat tulis\n- Sertifikat\n- Makan siang\n- Akses ke laboratorium pengujian",
            'kuota' => 30,
            'catatan' => 'Peserta diharapkan membawa APD (kacamata safety, sepatu safety)',
            'gambar' => 'welding_inspector_cert.jpg',
            'createdAt' => now()->subDays(30),
            'updatedAt' => now()->subDays(30),
        ]);

        // Sertifikasi 2
        AdminCertification::create([
            'judul' => 'Sertifikasi 6G Pipe Welding SMAW',
            'bidang' => 'Pengelasan',
            'jenisSertifikat' => 'AWS 6G SMAW',
            'tanggalMulai' => now()->addWeeks(3),
            'tanggalSelesai' => now()->addWeeks(3)->addDays(7),
            'jamMulai' => '08:00:00',
            'jamSelesai' => '16:00:00',
            'lokasi' => 'Surabaya',
            'metode' => 'Offline',
            'deskripsi' => 'Kursus sertifikasi pengelasan pipa 6G menggunakan metode SMAW (Shielded Metal Arc Welding). Pelatihan ini menekankan pada praktik pengelasan dalam posisi 6G yang merupakan posisi tersulit dalam pengelasan pipa.',
            'sertifikatDidapat' => 'AWS Certified 6G Pipe Welder (SMAW)',
            'syaratPeserta' => "- Memiliki pengalaman pengelasan minimal 1 tahun\n- Menguasai dasar pengelasan SMAW\n- Mampu mengelas posisi 3G dan 4G",
            'fasilitas' => "- Material latihan\n- Elektroda\n- Perlengkapan safety\n- Sertifikat\n- Makan siang",
            'kuota' => 15,
            'catatan' => 'Uji sertifikasi akan dilakukan pada hari terakhir pelatihan',
            'gambar' => '6g_pipe_welding.jpg',
            'createdAt' => now()->subDays(20),
            'updatedAt' => now()->subDays(20),
        ]);

        // Sertifikasi 3
        AdminCertification::create([
            'judul' => 'Basic SMAW Training for Beginners',
            'bidang' => 'Pengelasan',
            'jenisSertifikat' => 'Basic Welding Certificate',
            'tanggalMulai' => now()->addWeeks(2),
            'tanggalSelesai' => now()->addWeeks(2)->addDays(3),
            'jamMulai' => '09:00:00',
            'jamSelesai' => '15:00:00',
            'lokasi' => 'Bandung',
            'metode' => 'Offline',
            'deskripsi' => 'Pelatihan ini didesain untuk pemula yang ingin mempelajari dasar-dasar pengelasan menggunakan metode SMAW. Peserta akan belajar tentang keselamatan kerja, persiapan material, pengoperasian mesin las, dan praktik pengelasan dasar.',
            'sertifikatDidapat' => 'Certificate of Completion - Basic SMAW Welding',
            'syaratPeserta' => "- Tidak diperlukan pengalaman sebelumnya\n- Usia minimal 17 tahun\n- Sehat jasmani",
            'fasilitas' => "- Material latihan\n- Elektroda\n- Perlengkapan safety\n- Sertifikat\n- Snack dan makan siang",
            'kuota' => 20,
            'catatan' => 'Peserta disarankan membawa baju lengan panjang dari bahan katun',
            'gambar' => 'basic_smaw_training.jpg',
            'createdAt' => now()->subDays(15),
            'updatedAt' => now()->subDays(15),
        ]);

        // Sertifikasi 4
        AdminCertification::create([
            'judul' => 'GTAW (TIG) Welding for Stainless Steel',
            'bidang' => 'Pengelasan',
            'jenisSertifikat' => 'Specialized Welding Certificate',
            'tanggalMulai' => now()->addWeeks(6),
            'tanggalSelesai' => now()->addWeeks(6)->addDays(4),
            'jamMulai' => '08:30:00',
            'jamSelesai' => '16:30:00',
            'lokasi' => 'Semarang',
            'metode' => 'Offline',
            'deskripsi' => 'Pelatihan khusus untuk pengelasan stainless steel menggunakan metode GTAW (Gas Tungsten Arc Welding) atau TIG. Fokus pada teknik kontrol torch, pengaturan gas pelindung, dan penanganan material stainless steel.',
            'sertifikatDidapat' => 'GTAW Stainless Steel Welding Specialist Certificate',
            'syaratPeserta' => "- Pengalaman dasar pengelasan\n- Pemahaman dasar tentang GTAW/TIG\n- Pendidikan minimal SMK Teknik/sederajat",
            'fasilitas' => "- Material stainless steel\n- Gas Argon\n- Tungsten electrodes\n- Alat safety\n- Sertifikat\n- Makan siang",
            'kuota' => 12,
            'catatan' => 'Pelatihan ini termasuk ujian praktik di hari terakhir',
            'gambar' => 'gtaw_stainless_training.jpg',
            'createdAt' => now()->subDays(10),
            'updatedAt' => now()->subDays(10),
        ]);

        // Sertifikasi 5
        AdminCertification::create([
            'judul' => 'Welding Code & Standards Workshop',
            'bidang' => 'Inspeksi',
            'jenisSertifikat' => 'Professional Development',
            'tanggalMulai' => now()->addMonths(2),
            'tanggalSelesai' => now()->addMonths(2)->addDays(2),
            'jamMulai' => '09:00:00',
            'jamSelesai' => '16:00:00',
            'lokasi' => 'Jakarta',
            'metode' => 'Online',
            'deskripsi' => 'Workshop tentang kode dan standar pengelasan internasional termasuk AWS D1.1, ASME IX, API 1104, dan ISO 9606. Peserta akan belajar interpretasi kode, persyaratan, dan aplikasinya dalam proyek nyata.',
            'sertifikatDidapat' => 'Certificate of Completion - Welding Code & Standards Workshop',
            'syaratPeserta' => "- Pengalaman di bidang pengelasan/inspeksi minimal 2 tahun\n- Pemahaman dasar tentang gambar teknik\n- Kemampuan bahasa Inggris dasar",
            'fasilitas' => "- Materi digital\n- Soft copy standar (untuk referensi selama pelatihan)\n- Sertifikat digital",
            'kuota' => 50,
            'catatan' => 'Peserta memerlukan koneksi internet stabil dan komputer dengan kamera',
            'gambar' => 'welding_code_workshop.jpg',
            'createdAt' => now()->subDays(5),
            'updatedAt' => now()->subDays(5),
        ]);
    }
}
