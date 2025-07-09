import { getDB } from "../../config/mongoDBServer.js";

export default class productModel {
  constructor(_id, _name, _desc, _category, _price, _imgURL, _size, _qty) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.category = _category;
    this.price = _price;
    this.imgURL = _imgURL;
    this.size = _size;
    this.qty = _qty;
    this.rating = [];
  }

  static async getAllProducts(){
    let db = getDB();
    let all_products = await db.collection(collectionName).find().toArray();
    return all_products;
  }

  static getProductByID(_id){
    try {
      const req_product = products.filter(obj => obj.id === _id);
      return req_product;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static isValidCategory(_category){
    return categories.indexOf(_category) >= 0;
  }

  static async addNewProduct(obj){
    try {
      const new_product = new productModel(products.length + 1, obj.name, obj.desc, obj.category, obj.price, obj.imgURL, obj.size);
      let db = getDB();
      let resp = await db.collection(collectionName).insertOne(new_product); 
      // products.push(new_product);
      return resp;
    } catch (error) {
      console.error(error);
      return false
    }
  }

  static productsFilter(minPrice, maxPrice, category){
    let result = products.filter((item) => {
      if(item.price >= minPrice && item.price <= maxPrice && item.category === category){
        return true;
      }
      return false;
    })
    return result;
  }

  static ratingProduct(userID, productID, rating){
    for(let i=0;i<products.length;i++){
      if(products[i].id === productID){
        let user_exists = products[i].rating.find((obj) => obj.userID === userID);
        if(user_exists){
          user_exists.ratingParam = rating;
        } else {
          let rating_obj = {
            userID:userID,
            ratingParam:rating
          }
          products[i].rating.push(rating_obj);
        }
        return products[i];
      }
    }
    return false;
  }

  static reduceQty(product_id, qty){
    let required_product = products.find(obj => obj.id === product_id);
    if(required_product.qty - qty < 0){
      return false;
    } 
    required_product.qty = required_product.qty - qty;
    console.log("Qty : ", required_product.qty);
    return true;
  }

}

var products = [
  new productModel(1, "T-shirt", '100% cotton t-shirt', 'Upperwear', 700, 'image1.png', ['XS', 'S', 'M', 'L', 'XL'], 100),
  new productModel(2, "Jeans", '100% pure denim', 'Bottomwear', 1000, 'image2.png', ['XS', 'S', 'M', 'L', 'XL'], 50),
  new productModel(3, "Cargo", '100% cotton', 'Bottomwear', 1500, 'image3.png', ['XS', 'S', 'M', 'L', 'XL'], 10),
  new productModel(4, "Nike Shoe", 'mesh type', 'footwear', 7500, 'image4.png', ['UK-5', 'UK-6', 'UK-7', 'UK-8', 'UK-9'], 5)
];

var categories = ['Upperwear', 'Bottomwear', 'Footwear'];

const collectionName = "Products";