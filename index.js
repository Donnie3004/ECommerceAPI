import express from 'express';
import productRouter from './src/resources/products/product.routes.js';
import userRouter from './src/resources/users/user.routes.js';
import cartRouter from './src/resources/cart/cart.routes.js';
import basicAuth from './src/middlewares/basicAuthorization.js';
import jwtauth from './src/middlewares/jwtAuth.js';
import cors from 'cors';

const app = express();

// const corsOption = {
//   origin : 'http://localhost:8001',
//   method : ['GET', 'POST'], 
// }

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors()); // instead of this we can specify it on individual routes also fro specific resource sharing

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

// app.get('/tester', init);


export default app;