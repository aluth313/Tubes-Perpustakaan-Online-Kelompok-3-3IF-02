//fitur yang digunakan pada perangkat lunak
var express = require("express");
var path = require("path");
var app = express();
const sequelize = require('./configs/sequelize');
const models = require('./models');
const Anggota1 = models.Anggota;
const User1 = models.User;
const Peminjaman = models.Peminjaman;
const Buku = models.Buku;
const Ebook = models.Ebook;
const Anggota = models.Anggota;
const session = require('express-session');
const upload = require('express-fileupload');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'filmdownload769@gmail.com',
		pass: 'Persinas313.'
	}
});

const bodyParser = require('body-parser');
app.use(express.static('public'));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(upload());

// app.use(function(req, res, next) {
//   res.locals.user = req.session.nama;
//   next();
// });

const anggotaRoutes = require('./routes/anggota');
const bukuRoutes = require('./routes/buku');
const peminjamanRoutes = require('./routes/peminjaman');
// const Buku = require('./models/buku');
// const Peminjaman = require('./models/peminjaman');
const User = require('./models/User');
const ebookRoutes = require('./routes/ebook');

const userProfilekRoutes = require('./routes/userProfile');
const userPeminjamanRoutes = require('./routes/userPeminjaman');

const umumBuku = require('./routes/umumBuku');
const umumEbook = require('./routes/umumEbook');

app.get("/", async function (request, response) {
	let buku = await Buku.findAll({order: [
		['createdAt','DESC'],
		],
		limit: 6});
	let ebook = await Ebook.findAll({order: [
		['createdAt','DESC'],
		],
		limit: 6});
	console.log(buku);
	response.render('sites/index',{loggedin: request.session.loggedin, buku:buku, ebook:ebook});

});


app.get("/login", function (request, response) {
	response.render('sites/login');
});

app.get("/logout", function (request, response) {
	console.log(request.session.nama)
	request.session.destroy();
	response.redirect('/login')
});

app.post("/pinjam/:id", async function (req, res) {
	if (req.session.loggedin == true) {
		let today = new Date();
		let tglPinjam = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		let tglKembali = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
		Peminjaman
		.create({
			tgl_peminjaman: req.body.tglPinjam,
			tgl_pengembalian: req.body.tglKembali,
			status: 'booking',
			anggota_id: req.session.anggotaId,
			buku_id: req.params.id,
		})
		Buku.findByPk(req.params.id)
		.then((pinjam) => {
			Buku.update({
				jumlah: (pinjam.jumlah - 1)
			},{
				where: {
					id: pinjam.id
				}
			})
		})
		const mailOptions = {
			from: 'filmdownload769@gmail.com',
			to: 'luthfiahmad36@gmail.com',
			subject: 'Peminjaman Buku',
			html: '<h3>Haii Admin</h3><p>Ada yang mau pinjam buku nih, kuy buka di halaman Peminjaman</p>'
		};
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		res.render('sites/umum/master/buku/success')
	} else {
		res.redirect('/login')
	}
});

app.get("/pinjam/tgl-kembali/:id", async function (req, res) {
	if (req.session.loggedin == true) {
		Buku.findByPk(req.params.id)
		.then((buku) => {
			res.render('sites/umum/master/buku/pinjam', {buku: buku})
		})
	} else {
		res.redirect('/login')
	}
});

app.post("/login", async function(req, res) {
	let userLogin = await User1.findOne({
		where: {
			email: req.body.email,
			password: req.body.password
		}
	});
	if (userLogin) {
		let anggotaLogin = await Anggota1.findOne({
			where: {
				userId: userLogin.id
			}
		})
		if (userLogin.role == 'admin') {
			req.session.loggedin = true;
			req.session.nama = anggotaLogin.nama;
			req.session.userId = userLogin.id;
			req.session.anggotaId = anggotaLogin.id;
			res.redirect('/admin/dashboard')
		} else {
			if (anggotaLogin.status == 1) {
				req.session.loggedin = true;
				req.session.nama = anggotaLogin.nama;
				req.session.userId = userLogin.id;
				req.session.anggotaId = anggotaLogin.id;
				res.redirect('/user/profile')
			} else {
				res.render('sites/login', {error: 'Akun Anda belum di verifikasi oleh Admin!'})
			}
		}
	} else {
		res.render('sites/login', {error: 'Email atau password tidak terdaftar!'})
	}
});

app.get("/daftar", function (request, response) {
	response.render('sites/register');
});

app.post("/daftar", function (req, res) {
	User1.create({
		email: req.body.email,
		password: req.body.password,
		role: 'Anggota'
	})
	.then((user) => {
		let data = {
			nik: req.body.nik,
			nama: req.body.nama,
			alamat: req.body.alamat,
			jk: req.body.jkAnggota,
			kota_lahir: req.body.kota,
			tgl_lahir: req.body.tglLahir,
			userId: user.id,
			status: 0,
		};

		Anggota1
		.create(data);

		const mailOptions = {
			from: 'filmdownload769@gmail.com',
			to: 'luthfiahmad36@gmail.com',
			subject: 'Pendaftar Baru',
			html: '<h3>Haii Admin</h3><p>Ada yang daftar nih, kuy buka di halaman Data Anggota</p>'
		};
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		res.redirect('/login');
	})
});


app.get("/", async function (request, response) {
	let buku = await Buku.findAll({order: [
		['createdAt','DESC'],
		],
		limit: 6});
	let ebook = await Ebook.findAll({order: [
		['createdAt','DESC'],
		],
		limit: 6});
	console.log(buku);
	response.render('sites/index',{loggedin: request.session.loggedin, buku:buku, ebook:ebook});

});

app.get('/admin/dashboard', async function (req, res) {
	if (typeof req.session.nama !== 'undefined' || typeof req.session.loggedin !== 'undefined') {
    
	let buku = await Buku.count();
	let ebook = await Ebook.count();
	let anggota = await Anggota.count();
	let peminjaman = await Peminjaman.count();

	res.render('sites/admin/dashboard', {
	buku: buku,
	ebook: ebook,
	anggota: anggota,
	peminjaman: peminjaman
	});

} else {
	res.redirect('/login')
}
});


app.use('/admin', anggotaRoutes);
app.use('/admin', bukuRoutes);
app.use('/admin', peminjamanRoutes);
// app.use('/admin', penggunaRoutes);
// app.use('/admin', detailRoutes);
app.use('/admin', ebookRoutes);
app.use('/user', userProfilekRoutes);
app.use('/user', userPeminjamanRoutes);
app.use('/umum', umumBuku);
app.use('/umum', umumEbook);



//port
app.listen(3000, () => {
	sequelize.sync();
	console.log('Server Started');
});