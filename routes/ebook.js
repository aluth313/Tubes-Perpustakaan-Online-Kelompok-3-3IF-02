const express = require('express');
const router = express.Router();
const models = require('../models');
const Ebook = models.Ebook;
const upload = require('express-fileupload');

const app = express()
app.use(upload())

//create
router.get('/ebook/tambah', (req, res) => {
    res.render('sites/admin/master/ebook/tambah', { data: null });
});

//store
router.post('/ebook/tambah', (req, res) => {
    if (req.files) {
        let file = req.files.file;
        let filename = file.name;
        file.mv('./public/ebook/'+filename, function(err) {
            if (err) {
                res.send(err)
            } else {
    let data = {
        judul: req.body.judul,
        penerbit: req.body.penerbit,
        pengarang: req.body.pengarang,
        tahun: req.body.tahun,
        file: filename
    };

    Ebook
    .create(data)
    .then((ebook) => {
        res.redirect('/admin/ebook');
    })
    .catch((error) => {
        console.log(error);
    })

      }
        })
    } else {
        res.send('Tidak ada file')
    }

});

//update
router.post('/ebook/update/:id', (req, res) => {
    Ebook
    .update({
        judul: req.body.judul,
        penerbit: req.body.penerbit,
        pengarang: req.body.pengarang,
        tahun: req.body.tahun,
        file: req.body.file
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