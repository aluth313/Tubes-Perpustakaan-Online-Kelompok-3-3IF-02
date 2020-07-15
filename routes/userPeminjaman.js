const express = require('express');
const router = express.Router();
const models = require('../models');
const Anggota = models.Anggota;
const Peminjaman = models.Peminjaman;

//index
router.get('/peminjaman', (req, res) => {
	if (typeof req.session.loggedin !== 'undefined') {
		Peminjaman.findAll({
			where: {
				anggota_id: req.session.anggotaId
			},
			order: [
			['createdAt','DESC']
			],
			include: ['buku']
		})
		.then((peminjaman) => {
			res.render('sites/user/master/peminjaman/peminjaman', {peminjaman: peminjaman});
		})
	} else {
		res.redirect('/login')
	}
});

module.exports = router