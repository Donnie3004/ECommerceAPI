import express from 'express';
import productController from './product.controller.js';
import jwtauth from '../../middlewares/jwtAuth.js';

const router = express.Router();

const ProductController = new productController();
router.get('/', ProductController.getAllProducts.bind(ProductController));
router.get('/filter', ProductController.filterProduct); // this should be above /:id routes becoz in node.js we move from specific to gen.
router.get('/:id', ProductController.getProductWithID.bind(ProductController));
router.post('/',  ProductController.addProduct.bind(ProductController)); // jwtauth
router.post('/rating', jwtauth, ProductController.insertRating);
router.post('/:id',  ProductController.updateProduct.bind(ProductController)); // jwtauth
router.delete('/productDelete/:id', ProductController.deleteProductByID.bind(ProductController));

// router.put('/id',);
// router.delete('/id',);

export default router;