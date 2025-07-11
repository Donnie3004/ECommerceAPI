import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongoDBServer.js";

export default class ProductRepo {
  async getAll(){
    const db = getDB();
    let products = await db.collection("Products").find({}).toArray();
    return products;
  }

  async getProductByID(id){
    const db = getDB();
    let collection = db.collection("Products");
    return await collection.findOne({_id: new ObjectId(id)});
  }

  async createProduct(product_obj){
    const db = getDB();
    let collection = db.collection("Products");
    let result = await collection.insertOne(product_obj);
    return result;
  }

  async updateProduct(productID, product_obj){
    let db = getDB();
    let collection = db.collection("Products");
    let result = await collection.updateOne({_id: new ObjectId(productID) }, {$set: product_obj}, {returnOriginal : false});
    console.log(result);
    return result;
  }

  async deleteProduct(productID){
    let db = getDB();
    let collection = db.collection("Products");
    let result = await collection.deleteOne({_id: new ObjectId(productID) });
    return result;
  }

  async rateProduct(userID, productID, rating) {
    try {
      const db = getDB();

      // validations for checking whether user id exists
      const document = await db.collection('Products').findOne({_id:new ObjectId(productID)});
      if(document.rating){
        let user_rating = document.rating.find(obj =>obj.userID?.toString() === userID?.toString());
  
        if(user_rating){
          const updateDB = await db.collection('Products').updateOne(
             {
                _id: new ObjectId(productID), // Match the product
                "rating.userID": new ObjectId(userID) // Match the userID inside rating array
              },
              {
                $set: {
                  "rating.$.rating": rating // 👈 New rating you want to set Important positional operators
                }
              }
          );
          return updateDB;
        }
      }
      const collection = await db.collection("Products").updateOne(
        { _id: new ObjectId(productID) },
        {
          $push: {
            rating: {
              userID: new ObjectId(userID),
              rating : rating
            }
          }
        }
      );
      return collection;
    } catch (error) {
      console.error("Error in rateProduct:", error);
      throw error; // Let the controller handle the response
    }
  }
}