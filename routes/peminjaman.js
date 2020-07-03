const express = require('express');
const router = express.Router();
const models = require('../models');
const Peminjaman = models.Peminjaman;

router.get('/peminjaman/tambah', (req, res) => {
    res.render('sites/admin/master/peminjaman/tambah', { data: null });
});

router.post('/peminjaman/tambah', (req, res) => {
    let data = {
        tanggal_peminjaman: req.body.pemPinjam,
        tanggal_pengembalian: req.body.pengPinjam,
        status: req.body.statusPinjam,
        nip: req.body.nipPinjam,
        isbn: req.body.isbnPinjam,
        no_registrasi: req.body.regPinjam

    };

    Peminjaman
        .create(data)
        .then((peminjaman) => {
            res.render('sites/admin/master/peminjaman/tambah', { data: data });
        })
        .catch((error) => {
            console.log(error);
        })
});

router.get('/peminjaman', (req, res) => {
    Peminjaman
        .findAll()
        .then((peminjamn) => {
            let data = peminjamn;
            res.render('sites/admin/master/peminjaman/peminjaman', { data: data });
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = router