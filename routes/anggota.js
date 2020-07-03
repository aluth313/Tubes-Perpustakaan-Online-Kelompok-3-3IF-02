const express = require('express');
const router = express.Router();
const models = require('../models');
const Anggota = models.Anggota;
const User = models.User;

//create
router.get('/anggota/tambah', (req, res) => {
    res.render('sites/admin/master/anggota/tambah', { data: null });
});

//store
router.post('/anggota/tambah', (req, res) => {
    let user_id;
    let createUser = User.create({
        email: req.body.emailAnggota,
        password: '12345678',
        role: req.body.role
    })
    .then((user) => {
        let data = {
            nik: req.body.nikAnggota,
            nama: req.body.namaAnggota,
            alamat: req.body.alamatAnggota,
            jk: req.body.jkAnggota,
            kota_lahir: req.body.klAnggota,
            tgl_lahir: req.body.tlAnggota,
            userId: user.id
        };

        Anggota
        .create(data);

        res.redirect('/admin/anggota');
    })
});

//update
router.post('/anggota/update/:id', (req, res) => {
    Anggota.findByPk(req.params.id)
    .then((anggotaId) => {
        User.update({
            email: req.body.emailAnggota,
            role: req.body.role
        }, {
            where: {
                id: anggotaId.userId
            }
        });
    });

    Anggota
    .update({
        nik: req.body.nikAnggota,
        nama: req.body.namaAnggota,
        alamat: req.body.alamatAnggota,
        jk: req.body.jkAnggota,
        kota_lahir: req.body.klAnggota,
        tgl_lahir: req.body.tlAnggota
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
    .findByPk(req.params.id, {include: ['user']})
    .then((anggota) => {
        let data = anggota;
        // console.log(anggota.user.email)
        res.render('sites/admin/master/anggota/edit', { data: data });
    })
    .catch((error) => {
        console.log(error);
    })
});

// delete
router.get('/anggota/destroy/:id', (req, res) => {
    Anggota.findByPk(req.params.id)
    .then((anggotanya) => {
        Anggota.destroy({
            where: {
                id: req.params.id
            }
        });

        User.destroy({
            where: {
                id: anggotanya.userId
            }
        });

        res.redirect('/admin/anggota');
    })
});

module.exports = router