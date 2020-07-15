const express = require('express');
const router = express.Router();
const models = require('../models');
const Anggota = models.Anggota;
const upload = require('express-fileupload');


//index
router.get('/profile', (req, res) => {
	if (typeof req.session.loggedin !== 'undefined') {
		Anggota.findByPk(req.session.anggotaId, {include: ['user']})
		.then((anggota) => {
			res.render('sites/user/master/profile/profile', {anggota: anggota});
		})
	} else {
		res.redirect('/login')
	}
});

module.exports = router