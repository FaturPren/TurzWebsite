// Memanggil semua paket yang dibutuhkan
require('dotenv').config();
const express = require('express');
const path = require('path');

// Membuat aplikasi express
const app = express();

// Ini akan menyajikan file index.html dari folder yang sama saat server diakses
// Vercel cukup pintar untuk menangani ini
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Di sinilah nanti kita akan membuat logika API pembayaran
app.get('/api/status', (req, res) => {
    const serverTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' });
    res.json({ 
        status: 'online', 
        platform: 'Vercel',
        timestamp: serverTime,
        message: 'Backend serverless Turz Store aktif!'
    });
});

// PENTING: Hapus app.listen() untuk Vercel
// app.listen(PORT, () => { ... });

// TAMBAHKAN BARIS INI: Ekspor aplikasi agar Vercel bisa menggunakannya
module.exports = app;
