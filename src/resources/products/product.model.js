export default class productModel {
  constructor(_id, _name, _desc, _category, _price, _imgURL, _size) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.category = _category;
    this.price = _price;
    this.imgURL = _imgURL;
    this.size = _size;
  }

  static getAllProducts(){
    return products;
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

  static addNewProduct(obj){
    try {
      const new_product = new productModel(products.length + 1, obj.name, obj.desc, obj.category, obj.price, obj.imgURL, obj.size);
      products.push(new_product);
      return true;
    } catch (error) {
      console.error(error);
      return false
    }
  }

}

var products = [
  new productModel(1, "T-shirt", '100% cotton t-shirt', 'Upperwear', 700, 'image1.png', ['XS', 'S', 'M', 'L', 'XL']),
  new productModel(2, "Jeans", '100% pure denim', 'Bottomwear', 1000, 'image2.png', ['XS', 'S', 'M', 'L', 'XL']),
  new productModel(3, "Cargo", '100% cotton', 'Bottomwear', 1500, 'image3.png', ['XS', 'S', 'M', 'L', 'XL']),
  new productModel(4, "Nike Shoe", 'mesh type', 'footwear', 7500, 'image4.png', ['UK-5', 'UK-6', 'UK-7', 'UK-8', 'UK-9'])
];

var categories = ['Upperwear', 'Bottomwear', 'Footwear'];