const express = require('express');
const router = express.Router();
const models = require('../models');
const Buku = models.Buku;
const upload = require('express-fileupload');

router.get('/buku/tambah', (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        res.render('sites/admin/master/buku/tambah', { data: null });
    } else {
        res.redirect('/login')
    }
});

router.post('/buku/tambah', (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        if (req.files) {
            let file = req.files.file;
            let filename = file.name;
            file.mv('./public/buku/'+filename, function(err) {
                if (err) {
                    res.send(err)
                } else {
                    let data = {
                        judul: req.body.judulBuku,
                        penerbit: req.body.penerbitBuku,
                        pengarang: req.body.pengarangBuku,
                        tahun: req.body.tahunBuku,
                        isbn: req.body.isbnBuku,
                        jumlah: req.body.jumlah,
                        cover: filename,
                    };

                    Buku
                    .create(data)
                    .then((buku) => {
                        res.redirect('/admin/buku');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            })
        } else {
            res.send('Tidak ada file')
        }
    } else {
        res.redirect('/login')
    }
});

//update
router.post('/buku/update/:id', (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        if (req.files) {
            let file = req.files.file;
            let filename = file.name;
            file.mv('./public/buku/'+filename, function(err) {
                if (err) {
                    res.send(err)
                } else {
                    Buku
                    .update({
                        judul: req.body.judulBuku,
                        penerbit: req.body.penerbitBuku,
                        pengarang: req.body.pengarangBuku,
                        tahun: req.body.tahunBuku,
                        isbn: req.body.isbnBuku,
                        jumlah: req.body.jumlah,
                        cover: filename,
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
                }
            })
        } else {
            Buku
            .update({
                judul: req.body.judulBuku,
                penerbit: req.body.penerbitBuku,
                pengarang: req.body.pengarangBuku,
                tahun: req.body.tahunBuku,
                isbn: req.body.isbnBuku,
                jumlah: req.body.jumlah,
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
        }
    } else {
        res.redirect('/login')
    }
});

//index
router.get('/buku', (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        Buku
        .findAll()
        .then((buku) => {
            let data = buku;
            res.render('sites/admin/master/buku/buku', { data: data });
        })
        .catch((error) => {
            console.log(error);
        })
    } else {
        res.redirect('/login')
    }
});


//edit
router.get('/buku/:id', (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
        Buku
        .findByPk(req.params.id)
        .then((buku) => {
            let data = buku;
            res.render('sites/admin/master/buku/edit', { data: data });
        })
        .catch((error) => {
            console.log(error);
        })
    } else {
        res.redirect('/login')
    }
});

// delete
router.get('/buku/destroy/:id', (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
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
    } else {
        res.redirect('/login')
    }
});

module.exports = router