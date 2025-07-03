import express from 'express';
import cartController from './cart.controller.js';

const router = express.Router();

const CartController = new cartController();
router.get('/', CartController.getCartDetails);
router.post('/addItem', CartController.addToCart);

export default router;