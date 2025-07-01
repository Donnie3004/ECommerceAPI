import express from 'express';
import productRouter from './src/resources/products/product.routes.js'

const app = express();

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/product', productRouter);



export default app;