const knex = require("./knex");


//working
function getAllProducts() {
    return knex("Products").select("*");
}

//working
function getCategorieProducts(categorie) {
    return knex("Products")
    .select("*")
    .where("Products.productCategory",categorie);
}

//working
function getCommandes() {
    return knex("Commande")
    .select("*")
    //.where("Products.productCategory",categorie);
}

//working
function getCommandeProducts(id_commande) {
    return knex("Commande_Products")
    .join("Products" , "Commande_Products.id_product",'=',"Products.id_product")
    .select("Products.productTitle", "Products.productPrice", "Commande_Products.quantite")
    .where("Commande_Products.id_commande",id_commande)
    //.where("Products.productCategory",categorie);
}



module.exports = {
    getAllProducts,
    getCategorieProducts,
    getCommandeProducts
}