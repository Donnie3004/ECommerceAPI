import validator from 'validator';
import UserModel from './user.model.js';

export default class UserController {
  // Register / Sign Up
  newUserRegister(req, res){
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
      if(!UserModel.getUserByEmail(email)){
        return res.status(400).json({
          success:false,
          message: `Email : ${email} already exists..!`
        })
      }
      let user_obj = {
        name:name,
        password:password,
        email:email
      }
      const user_created = UserModel.createUser(user_obj);
      let user_created_final = {...user_created};
      user_created_final.password = '************';
      if(user_created){
        return res.status(200).json({
          success:true,
          data:user_created_final
        })
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Internal server Error'
      })
    } 
  }
  // Login / Sign in 
  userLogin(req, res){
    const {email, password} = req.body;

    //put validations here..!

    let user_obj = {
      email:email,
      password:password
    }

    if(UserModel.userLoginAuthentication(user_obj)){
      return res.status(200).json({
        success:true,
        message:'user login successful'
      })
    } else {
      return res.status(400).json({
        success:false,
        message:'user login unsuccessful'
      })
    }
  }
}