import { getDB } from "../../config/mongoDBServer.js";

export default class UserRepo{
  async registerUserToDB(user_obj){
    let db = getDB();
    let collection = db.collection('Users');
    let result = await collection.insertOne(user_obj);
    console.log(result);
    if(result.acknowledged){
      return result;
    }
    return {
      acknowledged : false,
    };
  }

  async checkEmailExists(_email){
    let db = getDB();
    let collection = await db.collection('Users').find({email:_email}).toArray();
    console.log(collection);
    if(collection.length > 0){
      return collection[0];
    }
    return false;
  }

  async userLoginVerification(user){
    let db = getDB();
    let collection = await db.collection('Users').find({email:user.email}).toArray();
    console.log(collection, collection.length);
    if(collection.length < 1){
      console.log("User didn't exists..!");
      return false;
    }
    return collection[0].password;
  }

}