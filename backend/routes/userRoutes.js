const express=require('express');
const router=express.Router();
const {protect}=require('../middleware/authMiddleware')
const {registerUser,authUser,allUsers}=require('../controllers/userController');
const { getCartItems,addToCart,removeFromCart } = require('../controllers/cartControllers');

router.route('/').post(registerUser).get(allUsers);
router.route('/login').post(authUser);
router.route('/cart').get(protect,getCartItems).post(protect,addToCart).delete(protect,removeFromCart);
router.route('/cart/:productId').delete(protect,removeFromCart);

module.exports=router;