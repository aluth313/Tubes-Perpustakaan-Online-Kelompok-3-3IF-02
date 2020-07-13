const express = require('express');
const router = express.Router();
const models = require('../models');
const Anggota = models.Anggota;
const upload = require('express-fileupload');


//index
router.get('/profile', (req, res) => {
	Anggota.findByPk(req.session.anggotaId, {include: ['user']})
	.then((anggota) => {
		res.render('sites/user/master/profile/profile', {anggota: anggota});
	})
});

module.exports = router