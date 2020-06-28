const express = require('express');
const router = express.Router();

const Buku = require('../models/buku');


router.get('/buku/tambah', (req, res) => {
    res.render('sites/admin/master/buku/tambah', { data: null });
});

router.post('/buku/tambah', (req, res) => {
    let data = {
        judul: req.body.judulBuku,
        penerbit: req.body.penerbitBuku,
        pengarang: req.body.pengarangBuku,
        tahun: req.body.tahunBuku,
        isbn: req.body.isbnBuku


    };

    Buku
        .create(data)
        .then((buku) => {
            res.redirect('/admin/buku');
        })
        .catch((error) => {
            console.log(error);
        })
});

//update
router.post('/buku/update/:id', (req, res) => {
    Buku
        .update({
            judul: req.body.judulBuku,
            penerbit: req.body.penerbitBuku,
            pengarang: req.body.pengarangBuku,
            tahun: req.body.tahunBuku,
            isbn: req.body.isbnBuku
        }, {
            where: {
                id: req.params.id
            }
        })
        .then((buku) => {
            res.redirect('/admin/buku');
        })
        .catch((error) => {
            console.log(error);
        })
});

//index
router.get('/buku', (req, res) => {
    Buku
        .findAll()
        .then((buku) => {
            let data = buku;
            res.render('sites/admin/master/buku/buku', { data: data });
        })
        .catch((error) => {
            console.log(error);
        })
});

//edit
router.get('/buku/:id', (req, res) => {
    Buku
        .findByPk(req.params.id)
        .then((buku) => {
            let data = buku;
            res.render('sites/admin/master/buku/edit', { data: data });
        })
        .catch((error) => {
            console.log(error);
        })
});

// delete
router.get('/buku/destroy/:id', (req, res) => {
    Buku.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.redirect('/admin/buku');
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = router