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
    let result = await collection.insertOne({product_obj});
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
}