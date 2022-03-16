const knex = require("./knex");


//working
function getAllProducts() {
    return knex("Products")
    .select("*");
}

//working
function getProduct(id_product) {
    return knex("Products")
    .select("*")
    .where("Products.id_product",id_product);
}

//working
function getCategorieProducts(productCategory) {
    return knex("Products")
    .select("*")
    .where("Products.productCategory",productCategory);
}

//working
function getCommandesId() {
    return knex.select("id_commande")
    .from("Commande")
    .orderBy('id_commande','desc')
    
}


//working
function getCommande(id_commande) {
    return knex("Commande")
    .select("*")
    .where("Commande.id_commande",id_commande);
}

//working
function getCommandeProducts(id_commande) {
    return knex("Commande_Products")
    .join("Products" , "Commande_Products.id_product",'=',"Products.id_product")
    .select("Products.productTitle", "Products.productPrice", "Commande_Products.quantite")
    .where("Commande_Products.id_commande",id_commande)
    //.where("Products.productCategory",categorie);
}

function addCommande(id_commande , date, montantTotale) {
    return knex('Commande')
    .insert(
    {
    date: date,
    montantTotale: montantTotale
    })
}

function addCommandeProducts(id_commande , id_product , quantite) {
    return knex('Commande_products')
    .insert(
    {id_commande: id_commande,
    id_product: id_product,
    quantite: quantite
    })
}



module.exports = {
    getAllProducts,
    getProduct,
    getCategorieProducts,
    getCommandesId,
    getCommande,
    getCommandeProducts,
    addCommande,
    addCommandeProducts
}