import UserModel from "../resources/users/user.model.js";
import { decodeBase64 } from "../utils.js";

const basicAuth = (req, res, next) => {
  const encodedData = req.headers['authorization'].split(' ');
  if(!encodedData){
    return res.status(401).json({
      success:false,
      message:'Unauthorized'
    })
  }
  const decodedData = decodeBase64(encodedData[1]);
  const [email, password] = decodedData.split(':');

  let user = UserModel.userLogin(email, password);
  if(!user){
    return res.status(400).json({
      success:false,
      message:'user not found'
    })
  }

  req.user = user;
  console.log("User : ", req.user);
  next();
}

export default basicAuth;