import productModel from "./product.model.js";


export default class ProductController {
  
  getAllProducts(req, res){
    try {
      let products = productModel.getAllProducts();
      return res.status(200).json({
        success : true,
        data : products
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        data:[],
        message:'Internal server error'
      });
    }  
  }

  getProductWithID(req, res){
    try {
      let {id} = req.params;
      id= Number(id);
      if(Number.isNaN(id)){
        return res.status(400).json({
          success:false,
          msg:'Invalid product ID'
        })
      }
      const productByID = productModel.getProductByID(id);
      return res.status(200).json({
        success:true,
        data:productByID
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success:false,
        data:[],
        message:"Internal server error"
      });
    }
  }

  addProduct(req, res){
    const {name, desc, category, price, imgURL, size} = req.body;
    
    // put validation later here...
    if(!name || !desc || !category || !imgURL || !size){
      return res.status(400).json({
        success:false,
        message:"Invalid inputs"
      })
    }

    if(price < 0){
      return res.status(400).json({
        success:false,
        message:"Price cannot be negative"
      })
    }

    if(!productModel.isValidCategory(category)){
      return res.status(400).json({
        success:false,
        message:"Incorrect Category"
      })
    }

    const product_obj = {
      name:name,
      desc:desc,
      category:category,
      price:price,
      imgURL:imgURL,
      size:size
    }

    const obj_created = productModel.addNewProduct(product_obj);

    if(obj_created){
      return res.status(200).json({
        success:true,
        message:"Product created"
      })
    }

  }

  filterProduct(req, res){
    console.log("here");
    try {
      let {minPrice, maxPrice, category} = req.query; // it's not post request; it's a get request that's why req.query

      //validations
      minPrice = Number(minPrice);
      if(Number.isNaN(minPrice) || minPrice < 0){
        return res.status(400).json({
          success:false,
          message:"Price should be a number and greater or equal to 0"
        })
      }

      maxPrice = Number(maxPrice);
      if(Number.isNaN(maxPrice)){
        return res.status(400).json({
          success:false,
          message:"Price should be a number"
        })
      }

      if(minPrice > maxPrice){
        return req.status(400).json({
          success:false,
          message:"min price should be smaller than max price"
        })
      }

      if(!category || !productModel.isValidCategory(category)){
        return req.status(400).json({
          success:false,
          message:"Not a valid category"
        })
      }

      let products = productModel.productsFilter(minPrice, maxPrice, category);

      return res.status(200).json({
        success:true,
        data:products
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Internal server error'
      })
    }
  }

  insertRating(req, res){
    try {
      let {productID, rating} = req.body;
      productID = Number(productID);
      rating = Number(rating);

      if(Number.isNaN(productID)){
        return res.status(400).json({
          success:false,
          message:'Enter valid inputs'
        });
      }

      // console.log("Controller : ", req.user);
      let user_id = req.user[0].id;

      let rating_updated = productModel.ratingProduct(user_id, productID, rating);

      if(!rating_updated){
        return res.status(404).json({
          success:false,
          message: 'Product not found'
        });
      }
      return res.status(202).json({
        success:true,
        message: rating_updated
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Internal server error'
      });
    }
  }
}