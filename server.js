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
const { response } = require('express');


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
    res.send("Hello mounaim")
});


// retourne toutes les pharmacies
app.get('/products' , async (req, res) =>{
    const results = await db.getAllProducts();    
    res.status(201).send(results)
});

app.get('/products/:id_product' , async (req, res) =>{
    const results = await db.getProduct(req.params.id_product);    
    res.status(201).send(results[0])
});

app.get('/products/category/:productCategory' , async (req, res) =>{
    const results = await db.getCategorieProducts(req.params.productCategory);    
    res.status(201).send(results)
});

app.get('/commandes' , async (req, res) =>{

  var response = []

  const commandesId = await db.getCommandesId();

  const ids =[]
  commandesId.forEach(cmd =>{
    ids.push(cmd.id_commande)
  })
  
   for await (const id of ids){

    const commande = await db.getCommande(id);    
    const commandeProducts = await db.getCommandeProducts(id)

    const cmd =  {"id_commande" :commande[0].id_commande , "date" : commande[0].date ,
    "montantTotale" : commande[0].montantTotale ,"products" : commandeProducts}

    response.push(cmd)
   }

    res.status(201).send(response)
   
});

app.post('/commandes' , async (req,res) =>{
  const commande  = req.body
  products = commande.products
  const response = await db.addCommande(commande.id_commande , commande.date , commande.montantTotale)

  for(const prod of products){
    await db.addCommandeProducts(response[0] ,prod.id_product , prod.quantite)
  }
  
  res.status(201).send("true")
});


app.get('/test' , (req,res) =>{
    res.status(200).json({succes : true});
});


app.listen(process.env.PORT || 3000, () =>{ console.log("server is running on port 3000")});



function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}



