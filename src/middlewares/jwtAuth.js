import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../resources/users/user.model.js';
dotenv.config();

const jwtauth = (req, res, next) => {
  // Read from headers
  if(req.headers && req.headers.authorization){
    console.log(req.headers);
    const [authType, token] = req.headers.authorization.split(" ");
    if(authType == 'Bearer'){
      // decode the token
      try {
        let payload = jwt.verify(token, process.env.SECRET_KEY);

        // check whether the user is same or not been deleted from DB;
        let email = payload.email;
        let user_obj = UserModel.getUserByEmail(email);

        if(!user_obj){
          return res.status(400).json({
            success:false,
            message:'user not found'
          })
        }
       // console.log(user_obj);
        req.user = user_obj;
        next();

      } catch (error) {
        console.error(error);
        return res.status(400).json({
          success:false,
          message:'Unauthorized'
        })
      }
    } 
  } else   {
    return res.status(400).json({
        success:false,
        message:'Unauthorized'
    })
  }
  next();
}


export default jwtauth;