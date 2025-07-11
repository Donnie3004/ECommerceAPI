import validator from 'validator';
import UserModel from './user.model.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { writeLog } from '../../utils.js';


export default class UserController {
  // Register / Sign Up
  async newUserRegister(req, res){
    writeLog("---------Inside newUserRegister--------");
    try {
      const {name, email, password} = req.body;
      // Validation 
      if(!validator.isEmail(email)){
        return res.status(400).json({
          success:false,
          message: 'Not a valid email'
        })
      }
      // put more validations for name email and password as per requirement.
      let modelObj = new UserModel();
      let email_check = await modelObj.getUserByEmail(email); 
      if(!email_check){
        return res.status(400).json({
          success: email_check,
          message: `Email : ${email} already exists..!`
        })
      }

      let user_obj = {
        name:name,
        password:password,
        email:email
      }

      const user_created = await modelObj.createUser(user_obj);
      if(user_created.acknowledged){
        return res.status(200).json({
          success:true,
          result:user_created
        });
      }
      throw new Error("DB error..!");
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Internal server Error'
      })
    } 
  }

  
  // Login / Sign in 
  async userLogin(req, res){
    const {email, password} = req.body;

    //put validations here..!

    let user_obj = {
      email:email,
      password:password
    }

    //process.env.SECRET_KEY;

    let payload = {   // payload creation
      email:user_obj.email,
    }  

    let token = jwt.sign(payload, process.env.SECRET_KEY,{expiresIn:6000}); //token expiry in 6000 second
    console.log(token);
    console.log(process.env.SECRET_KEY);

    let modelObj = new UserModel();
    let user_login = await modelObj.userLoginAuthentication(user_obj);
    if(user_login){
      return res.status(200).json({
        success:true,
        message:'user login successful',
        token:token
      })
    } else {
      return res.status(400).json({
        success:false,
        message:'user login unsucessful' //// product?.rating?.find
      })
    }
  }
}