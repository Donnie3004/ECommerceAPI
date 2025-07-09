import { getDB } from "../../config/mongoDBServer.js";

export default class UserModel {
  constructor(_id, _name, _email, _password, _type) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.role = 'customer'; // since we don't take user type from frontend; it will be promoted
  }

  static async createUser(obj){
    const user = new UserModel(users.length+1, obj.name, obj.email, obj.password);
    // users.push(user);
    console.log(user);
    let db = getDB();
    let resp = await db.collection('NewCollection').insertOne(user);
    // let finalResp = await resp.json();
    return resp;
  }

  static getUserByEmail(_email){
    const user = users.filter(obj=> obj.email === _email);
    return user;
  }
  upgradeRoleToAdmin(){
    this.role = 'admin';
    return this;
  }

  static userLoginAuthentication(user){
    for(let i=0;i<users.length;i++){
      if(users[i].email === user.email && users[i].password === user.password){
        return true;
      }
    }
    return false;
  }

  static userLogin(_email, _password){
    for(let i=0;i<users.length;i++){
      if(users[i].email === _email && users[i].password === _password){
        return users[i];
      }
    }
    return null;
  }
}

let users = [
  new UserModel(1, "arbaz", "arbaz@gmail.com", "12345", "admin"),
  new UserModel(2, "sheikh", "sheikh@gmail.com", "12345", "customer")
]