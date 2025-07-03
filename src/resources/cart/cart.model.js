export default class CartModel {
  constructor(_id, _productID, _userID, _qty) {
    this.id = _id;
    this.productID = _productID;
    this.userID = _userID;
    this.qty = _qty;
  }

  static addToCart(user_id, product_id, qty){
    try {
      let product_found = cart.find(obj => obj.productID === product_id);
      if(product_found){
        product_found.qty++;
        return product_found;
      } else {
        const newItem = new CartModel(1000 + cart.length + 1, product_id, user_id, qty);
        cart.push(newItem);
        return newItem;
      }
    } catch (error) {
      console.error(error);
      return false;
    } 
  }

  static sendDetailByID(user_id){
    let all_products = cart.filter(obj => obj.userID === user_id);
    return all_products;
  }
}

var cart = [
  new CartModel(1001,1,1, 1),
  new CartModel(1002,2,1, 2),
  new CartModel(1003,2,2, 2),
];