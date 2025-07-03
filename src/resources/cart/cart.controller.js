import productModel from "../products/product.model.js";
import CartModel from "./cart.model.js";

export default class CartController {
  addToCart(req, res){
    try {
      let {productID, qty} = req.body;
      let userID = req.user[0].id;
      productID = Number(productID);
      qty = Number(qty);
      userID = Number(userID);
      if(Number.isNaN(productID) || Number.isNaN(qty)){
        return res.status(400).json({
          success:false,
          message:"enter valid details"
        })
      }

      if(qty < 0){
        return res.status(400).json({
          success:false,
          message:"qty cannot be less than 0"
        });
      }
      let product_Updated = productModel.reduceQty(productID, qty);
      if(!product_Updated){
        return res.status(400).json({
          success:false,
          message:"not enough qty."
        });
      }
      let cart_updated = CartModel.addToCart(userID, productID, qty);
      if(cart_updated){
        return res.status(200).json({
          success:true,
          data:cart_updated
        });
      } else {
        return res.status(400).json({
          success:false,
          message:"Item not added..!"
        })
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }
  }

  getCartDetails(req, res){
    try {
      let userID = req.user[0].id;
      userID = Number(userID);
      const cart_details = CartModel.sendDetailByID(userID);
      return res.status(200).json({
        success:true,
        data:cart_details
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }
  }
}