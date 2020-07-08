const express = require('express');
const router = express.Router();
const models = require('../models');
const Buku = models.Buku;
const upload = require('express-fileupload');


//index
router.get('/buku', (req, res) => {
	console.log(req.session.loggedin)
	Buku.findAll({
		order: [
		['judul','ASC'],
		]
	})
	.then((buku) => {
		res.render('sites/umum/master/buku/buku', {buku: buku});
	})
});

module.exports = router