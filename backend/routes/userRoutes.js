const express=require('express');
const router=express.Router();
const {protect}=require('../middleware/authMiddleware')
const {registerUser,authUser,allUsers}=require('../controllers/userController');
const { getCartItems,addToCart,removeFromCart, decreaseQuantity,checkOut } = require('../controllers/cartControllers');


router.route('/').post(registerUser).get(allUsers);
router.route('/login').post(authUser);
router.route('/cart').get(protect,getCartItems).post(protect,addToCart).delete(protect,removeFromCart);
router.route('/cart/:productId').delete(protect,removeFromCart).put(protect,decreaseQuantity);
router.route('/checkout').post(protect,checkOut);
module.exports=router;