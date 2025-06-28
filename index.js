// Memanggil semua paket yang dibutuhkan
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// PENTING: Tambahkan ini agar server bisa membaca data JSON dari Saweria
app.use(express.json());

// Menyajikan file index.html sebagai halaman utama
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- ENDPOINT WEBHOOK ---
// Ini adalah "telinga" yang akan mendengarkan notifikasi dari Saweria
app.post('/api/webhook/saweria', (req, res) => {
    console.log('--- NOTIFIKASI DARI SAWERIA DITERIMA! ---');
    console.log('Isi Data:', req.body);

    // Contoh mengambil data spesifik
    const donator = req.body.donator_name;
    const amount = req.body.amount_raw;
    const message = req.body.message;
    
    console.log(`Donasi dari: ${donator}, Sejumlah: ${amount}, Pesan: ${message}`);

    // LOGIKA ANDA SELANJUTNYA: Verifikasi, simpan ke database, kirim produk, dll.
    
    // Kirim balasan ke Saweria bahwa notifikasi sudah diterima dengan sukses
    res.status(200).json({ status: "success", message: "Webhook received" });
});

// Ekspor aplikasi agar Vercel bisa menggunakannya
module.exports = app;
