import express from 'express';
import productController from './product.controller.js';

const router = express.Router();

const ProductController = new productController();
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductWithID);

router.post('/',ProductController.addProduct);

// router.put('/id',);
// router.delete('/id',);

export default router;