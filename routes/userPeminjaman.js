const express = require('express');
const router = express.Router();
const models = require('../models');
const Anggota = models.Anggota;
const Peminjaman = models.Peminjaman;

//index
router.get('/peminjaman', (req, res) => {
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
});

module.exports = router