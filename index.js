import express from 'express';
import productRouter from './src/resources/products/product.routes.js';
import userRouter from './src/resources/users/user.routes.js';
import cartRouter from './src/resources/cart/cart.routes.js';
import basicAuth from './src/middlewares/basicAuthorization.js';
import jwtauth from './src/middlewares/jwtAuth.js';

const app = express();

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// app.use('/', basicAuth);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/cart', jwtauth, cartRouter);

app.post('/test', jwtauth, (req, res)=>{
  return res.status(200).json({
    success:true,
    message:"all good"
  })
})



export default app;