const express = require('express');
const router = express.Router();
const models = require('../models');
const upload = require('express-fileupload');


//index
router.get('/ebook', (req, res) => {
        res.render('sites/umum/master/ebook/ebook');
   });

module.exports = router