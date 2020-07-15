const express = require('express');
const router = express.Router();
const models = require('../models');
const Peminjaman = models.Peminjaman;
const Buku = models.Buku;
const Anggota = models.Anggota;
const User = models.User;
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'filmdownload769@gmail.com',
        pass: 'Persinas313.'
    }
});

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
router.post('/peminjaman/terima/:id', async (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        let anggota_id = await Peminjaman.findByPk(req.params.id, {include: ['anggota']});
        let email_user = await User.findByPk(anggota_id.anggota.userId);
        
        Peminjaman.findByPk(req.params.id, {include: ['anggota']})
        .then((peminjaman) => {
            Peminjaman.update({
                status: 'dipinjam'
            }, {
                where: {
                    id: peminjaman.id
                }
            });

            const mailOptions = {
                from: 'filmdownload769@gmail.com',
                to: email_user.email,
                subject: 'Peminjaman telah dikonfirmasi',
                html: '<h3>Haii ' + peminjaman.anggota.nama + ' </h3><p>Kamu sekarang udah minjam buku, jangan lupa kembalikan lagi yaa sesuai tanggal kembalinya :)</p>'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
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
        let anggota_id = await Peminjaman.findByPk(req.params.id, {include: ['anggota']});
        let email_user = await User.findByPk(anggota_id.anggota.userId);
        Buku.findByPk(anggota_id.buku_id)
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
        const mailOptions = {
            from: 'filmdownload769@gmail.com',
            to: email_user.email,
            subject: 'Peminjaman ditolak',
            html: '<h3>Haii ' + anggota_id.anggota.nama + ' </h3><p>Maaf yah, untuk saat ini kamu belum bisa pinjam buku, mungkin lain kali :)</p>'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
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