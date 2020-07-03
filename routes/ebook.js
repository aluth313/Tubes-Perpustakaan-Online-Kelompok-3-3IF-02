const express = require('express');
const router = express.Router();
const models = require('../models');
const Ebook = models.Ebook;

//create
router.get('/ebook/tambah', (req, res) => {
    res.render('sites/admin/master/ebook/tambah', { data: null });
});

//store
router.post('/ebook/tambah', (req, res) => {
    let data = {
        judul: req.body.judul,
        penerbit: req.body.penerbit,
        pengarang: req.body.pengarang,
        tahun: req.body.tahun,
        linkFile: req.body.linkFile
    };

    Ebook
    .create(data)
    .then((ebook) => {
        res.redirect('/admin/ebook');
    })
    .catch((error) => {
        console.log(error);
    })
});

//update
router.post('/ebook/update/:id', (req, res) => {
    Ebook
    .update({
        judul: req.body.judul,
        penerbit: req.body.penerbit,
        pengarang: req.body.pengarang,
        tahun: req.body.tahun,
        linkFile: req.body.linkFile
    }, {
        where: {
            id: req.params.id
        }
    })
    .then((ebook) => {
        res.redirect('/admin/ebook');
    })
    .catch((error) => {
        console.log(error);
    })
});

//index
router.get('/ebook', (req, res) => {
    Ebook
    .findAll()
    .then((ebook) => {
        let data = ebook;
        res.render('sites/admin/master/ebook/ebook', { data: data });
    })
    .catch((error) => {
        console.log(error);
    })
});

//edit
router.get('/ebook/:id', (req, res) => {
    Ebook
    .findByPk(req.params.id)
    .then((ebook) => {
        let data = ebook;
        res.render('sites/admin/master/ebook/edit', { data: data });
    })
    .catch((error) => {
        console.log(error);
    })
});

// delete
router.get('/ebook/destroy/:id', (req, res) => {
    Ebook.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('/admin/ebook');
    })
    .catch((error) => {
        console.log(error);
    })
});

module.exports = router