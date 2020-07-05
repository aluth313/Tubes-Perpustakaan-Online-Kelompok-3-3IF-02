const express = require('express');
const router = express.Router();
const models = require('../models');
const session = require('express-session');
const url = require('url');
const Anggota = models.Anggota;
const User = models.User;

//create
router.get('/anggota/tambah', (req, res) => {
    if (typeof req.session.nama !== 'undefined' || typeof req.session.loggedin !== 'undefined') {
        res.render('sites/admin/master/anggota/tambah', { data: null });
    }else {
        res.redirect('/login')
    }
});

//store
router.post('/anggota/tambah', (req, res) => {
    if (typeof req.session.nama !== 'undefined' || typeof req.session.loggedin !== 'undefined') {
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
                userId: user.id,
                status: 1,
            };

            Anggota
            .create(data);

            res.redirect(url.format({
                pathname:"/admin/anggota",
                query: {
                    "sukses": "Anggota berhasil ditambahkan!"
                }
            }));
      //       res.redirect(url.format({
      //        pathname:"/",
      //        query: {
      //         "a": 1,
      //         "b": 2,
      //         "valid":"your string here"
      //     }
      // }));
        })
    } else {
        res.redirect('/login')
    }
});

//update
router.post('/anggota/update/:id', (req, res) => {
    if (typeof req.session.nama !== 'undefined' || typeof req.session.loggedin !== 'undefined') {
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
    } else {
        res.redirect('/login')
    }
});


//verifikasi
router.post('/anggota/update-status/:id', (req, res) => {
    if (typeof req.session.nama !== 'undefined' || typeof req.session.loggedin !== 'undefined') {
        Anggota
        .update({
            status: 1,
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
    } else {
        res.redirect('/login')
    }
});

//index
router.get('/anggota', async(req, res) => {
    if (typeof req.session.nama !== 'undefined' || typeof req.session.loggedin !== 'undefined') {
        const anggota = await Anggota.findAll({
            where: {
                status: 1
            }
        });

        const anggotaBelumVerifikasi = await Anggota.findAll({
            where: {
                status: 0
            }
        });
        res.render('sites/admin/master/anggota/anggota', { data: anggota, verifikasi: anggotaBelumVerifikasi });
    } else {
        res.redirect('/login')
    }
});

//edit
router.get('/anggota/:id', (req, res) => {
    //mengecek session login
    if (typeof req.session.nama !== 'undefined' || typeof req.session.loggedin !== 'undefined') {
        Anggota
        .findByPk(req.params.id, {include: ['user']}) //ini buat relasi, 'user' itu dari alias di model
        .then((anggota) => {
            let data = anggota;
            res.render('sites/admin/master/anggota/edit', { data: data });
        })
        .catch((error) => {
            console.log(error);
        })
    } else {
        res.redirect('/login')
    }
});

// delete
router.get('/anggota/destroy/:id', (req, res) => {
    if (typeof req.session.nama !== 'undefined' || typeof req.session.loggedin !== 'undefined') {
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
    } else {
        res.redirect('/login')
    }
});

module.exports = router