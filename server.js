const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/pharmacies');
const formidable = require('express-formidable');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const fse = require('fs-extra');
const stream = require('stream');
const mime = require('mime');
const crypto = require('crypto');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './imgs/ords/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname) //Appending .jpg
  }
})

var upload = multer({ storage: storage })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

//images
app.use(express.static('imgs'))
app.use(express.static('imgs/ords'))

// retourne toutes les pharmacies
app.get('/' , async (req, res) =>{
    res.send("Hello world")
});


// retourne toutes les pharmacies
app.get('/products' , async (req, res) =>{
    const results = await db.getAllProducts();    
    res.status(201).send(results)
});

app.get('/products/:categorie' , async (req, res) =>{
    const results = await db.getCategorieProducts(req.params.categorie);    
    res.status(201).send(results)
});

app.get('/commandes/:id_commande' , async (req, res) =>{
    const results = await db.getCommandeProducts(req.params.id_commande);    
    res.status(201).send(results)
});


app.get('/test' , (req,res) =>{
    res.status(200).json({succes : true});
});


app.listen(process.env.PORT || 5000, () =>{ console.log("server is running on port 3000")});





