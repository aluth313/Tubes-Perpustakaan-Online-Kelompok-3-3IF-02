//fitur yang digunakan pada perangkat lunak
var express = require("express");
var path = require("path");
var app = express();
const sequelize = require('./configs/sequelize');
const models = require('./models');
const Anggota1 = models.Anggota;
const User1 = models.User;
const session = require('express-session');
const upload = require('express-fileupload');

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

const Anggota = require('./models/Anggota');
const anggotaRoutes = require('./routes/anggota');
const bukuRoutes = require('./routes/buku');
const peminjamanRoutes = require('./routes/peminjaman');
// const penggunaRoutes = require('./routes/pengguna');
// const detailRoutes = require('./routes/detail');
const Buku = require('./models/buku');
const Peminjaman = require('./models/peminjaman');
// const Pengguna = require('./models/pengguna');
const Ebook = require('./models/ebook');
const User = require('./models/User');
const ebookRoutes = require('./routes/ebook');

app.get("/", function (request, response) {
	response.render('sites/index');
});

app.get("/login", function (request, response) {
	response.render('sites/login');
});

app.get("/logout", function (request, response) {
	console.log(request.session.nama)
	request.session.destroy();
	response.redirect('/login')
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
			console.log('')
			console.log('sebelum')
			console.log(req.session.loggedin)
			console.log(req.session.nama)
			req.session.loggedin = true;
			req.session.nama = anggotaLogin.nama;
			res.redirect('/admin/dashboard')
			console.log('')
			console.log('sesudah')
			console.log(req.session.loggedin)
			console.log(req.session.nama)
		} else {
			res.redirect('/')
			req.session.loggedin = true;
			req.session.nama = anggotaLogin.nama;
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

		res.redirect('/login');
	})
});


app.get('/admin/dashboard', function (req, res) {
	var buku = 20;
	var ebook = 25;
	var anggota = 30;
	var peminjaman = 35;

	res.render('sites/admin/dashboard', {

		buku: buku,
		ebook: ebook,
		anggota: anggota,
		peminjaman: peminjaman
	});

});
app.use('/admin', anggotaRoutes);
app.use('/admin', bukuRoutes);
app.use('/admin', peminjamanRoutes);
// app.use('/admin', penggunaRoutes);
// app.use('/admin', detailRoutes);
app.use('/admin', ebookRoutes);



//port
app.listen(3000, () => {
	sequelize.sync();
	console.log('Server Started');
});