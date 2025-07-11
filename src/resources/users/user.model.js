import { hashingPassword, verifyPassword } from "../../utils.js";
import UserRepo from "./user.repository.js";

export default class UserModel {
  constructor() {
    this.repo = new UserRepo(); 
  }

  async createUser(obj){
    let user_obj = {
      name : obj.name,
      email:obj.email,
      password: await hashingPassword(obj.password),
      role:"customer"
    }
    let user_created = await this.repo.registerUserToDB(user_obj);
    return user_created;
  }

  async getUserByEmail(_email){ 
    // check from db whether user exists or not
    let check = await this.repo.checkEmailExists(_email);
    //console.log("check : ", check, typeof(check));
    return check;
  }

  // upgradeRoleToAdmin(){
  //   this.role = 'admin';
  //   return this;
  // }

  async userLoginAuthentication(user){
    let hashedPassword = await this.repo.userLoginVerification(user);
    if(!hashedPassword){
      return false;
    }
    let password_verfication = await verifyPassword(user.password, hashedPassword);
    return password_verfication;
  }
}