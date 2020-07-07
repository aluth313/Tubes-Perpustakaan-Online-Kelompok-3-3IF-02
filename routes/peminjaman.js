const express = require('express');
const router = express.Router();
const models = require('../models');
const Peminjaman = models.Peminjaman;
const Buku = models.Buku;
const { Op } = require("sequelize");

router.get('/peminjaman', async (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        let booking = await Peminjaman.findAll({
            where: {
                status: 'booking'
            },
            include: ['anggota','buku']
        });

        let pinjam = await Peminjaman.findAll({
            where: {
                status: {
                    [Op.notIn]: ['booking']
                }
            },
            include: ['anggota','buku']
        });
        res.render('sites/admin/master/peminjaman/peminjaman', { data: pinjam, booking: booking });
    } else {
        res.redirect('/login')
    }
});

//terima
router.post('/peminjaman/terima/:id', (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        Peminjaman.findByPk(req.params.id)
        .then((peminjaman) => {
            Peminjaman.update({
                status: 'dipinjam'
            }, {
                where: {
                    id: peminjaman.id
                }
            });
            res.redirect('/admin/peminjaman')
        });
    } else {
        res.redirect('/login')
    }
});

//tolak
router.get('/peminjaman/tolak/:id', async (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        let peminjaman = await Peminjaman.findByPk(req.params.id);
        Buku.findByPk(peminjaman.buku_id)
        .then((buku) => {
            Buku.update({
                jumlah: (buku.jumlah + 1)
            }, {
                where: {
                    id: buku.id
                }
            });
        });
        Peminjaman.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/admin/peminjaman')
    } else {
        res.redirect('/login')
    }
});

//kembali
router.post('/peminjaman/kembali/:id', async (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        let idBuku = await Peminjaman.findByPk(req.params.id);
        Peminjaman.findByPk(req.params.id)
        .then((peminjaman) => {
            Peminjaman.update({
                status: 'selesai'
            }, {
                where: {
                    id: peminjaman.id
                }
            });
        });
        Buku.findByPk(idBuku.buku_id)
        .then((buku) => {
            Buku.update({
                jumlah: (buku.jumlah + 1)
            }, {
                where: {
                    id: buku.id
                }
            });
        });
        res.redirect('/admin/peminjaman')
    } else {
        res.redirect('/login')
    }
});

module.exports = router