const express=require('express')
const router=express.Router();
const {protect}=require('../middleware/authMiddleware')
const {addProduct,viewAllProducts,findProductsByName,getProductById}=require('../controllers/productController');

router.route('/').post(protect,addProduct).get(protect,viewAllProducts);

router.route('/search').get(protect,findProductsByName);

router.route('/:productId').get(protect,getProductById);

module.exports=router