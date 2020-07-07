const express = require('express');
const router = express.Router();
const models = require('../models');
const upload = require('express-fileupload');


//index
router.get('/buku', (req, res) => {
        res.render('sites/umum/master/buku/buku');
   });

module.exports = router