const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Ebook extends Sequelize.Model { }

Ebook.init({
    judul: Sequelize.STRING,
    penerbit: Sequelize.STRING,
    pengarang: Sequelize.STRING,
    tahun: Sequelize.STRING,
    linkFile: Sequelize.STRING
}, {
    sequelize, modelName: 'ebook'
});

module.exports = Ebook;