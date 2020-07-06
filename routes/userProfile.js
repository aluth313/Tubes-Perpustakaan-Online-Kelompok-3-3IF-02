const express = require('express');
const router = express.Router();
const models = require('../models');
const Anggota = models.Anggota;
const upload = require('express-fileupload');


//index
router.get('/profile', (req, res) => {
        res.render('sites/user/master/profile/profile');
   });

module.exports = router