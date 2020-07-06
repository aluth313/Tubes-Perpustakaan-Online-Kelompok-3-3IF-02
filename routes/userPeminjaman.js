const express = require('express');
const router = express.Router();
const models = require('../models');
const Anggota = models.Anggota;
const upload = require('express-fileupload');


//index
router.get('/peminjaman', (req, res) => {
        res.render('sites/user/master/peminjaman/peminjaman');
   });

module.exports = router