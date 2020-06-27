const express = require('express');
const router = express.Router();

const Anggota = require('../models/anggota');

//create
router.get('/anggota/tambah', (req, res) => {
    res.render('sites/admin/master/anggota/tambah', { data: null });
});

//store
router.post('/anggota/tambah', (req, res) => {
    let data = {
        nip: req.body.nipAnggota,
        nik: req.body.nikAnggota,
        email: req.body.emailAnggota,
        nama: req.body.namaAnggota,
        alamat: req.body.alamatAnggota,
        jenis_kelamin: req.body.jkAnggota,
        kota_lahir: req.body.klAnggota,
        tanggal_lahir: req.body.tlAnggota

    };

    Anggota
    .create(data)
    .then((anggota) => {
        res.redirect('/admin/anggota');
    })
    .catch((error) => {
        console.log(error);
    })
});

//update
router.post('/anggota/update/:id', (req, res) => {
    Anggota
    .update({
        nip: req.body.nipAnggota,
        nik: req.body.nikAnggota,
        email: req.body.emailAnggota,
        nama: req.body.namaAnggota,
        alamat: req.body.alamatAnggota,
        jenis_kelamin: req.body.jkAnggota,
        kota_lahir: req.body.klAnggota,
        tanggal_lahir: req.body.tlAnggota
    }, {
        where: {
            id: req.params.id
        }
    })
    .then((anggota) => {
        res.redirect('/admin/anggota');
    })
    .catch((error) => {
        console.log(error);
    })
});

//index
router.get('/anggota', (req, res) => {
    Anggota
    .findAll()
    .then((anggota) => {
        let data = anggota;
        res.render('sites/admin/master/anggota/anggota', { data: data });
    })
    .catch((error) => {
        console.log(error);
    })
});

//edit
router.get('/anggota/:id', (req, res) => {
    Anggota
    .findByPk(req.params.id)
    .then((anggota) => {
        let data = anggota;
        res.render('sites/admin/master/anggota/edit', { data: data });
    })
    .catch((error) => {
        console.log(error);
    })
});

// delete
router.get('/anggota/destroy/:id', (req, res) => {
    Anggota.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('/admin/anggota');
    })
    .catch((error) => {
        console.log(error);
    })
});

module.exports = router