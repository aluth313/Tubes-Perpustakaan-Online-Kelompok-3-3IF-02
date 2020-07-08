const express = require('express');
const router = express.Router();
const models = require('../models');
const Ebook = models.Ebook;
const upload = require('express-fileupload');


//index
router.get('/ebook', (req, res) => {
        Ebook
    .findAll()
    .then((ebook) => {
        let data = ebook;
        res.render('sites/umum/master/ebook/ebook', { data: data });
    })
    .catch((error) => {
        console.log(error);
    })
   
});


//download
router.get('/ebook/download/:id', (req, res) => {
             
            Ebook
         .findByPk(req.params.id)
         .then((ebook) => {
            let data = ebook;
            var filePath = "/../public/ebook/"; // Or format the path using the `id` rest param
            var fileName = data.file; // file name
            console.log(fileName); 
            res.download(__dirname +filePath + fileName, fileName);
         })
         .catch((error) => {
             console.log(error);
         })
      
      
     });

module.exports = router