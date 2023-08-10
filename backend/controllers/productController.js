const Product=require('../models/productModel')
const expressAsyncHandler=require("express-async-handler")
const mongoose=require('mongoose');
const User=require('../models/userModel');
const addProduct=expressAsyncHandler(async(req,res)=>{
    const {title,description,category,price,seller,stock,images,features}=req.body;
    if(!title || !description || !category || !price || !stock){
        res.status(400);
        throw new Error("Please fill out all the fields")
    }
    const productExists = await Product.findOne({ title });
    if (productExists) {
        res.status(400);
        throw new Error("Product already exists!");
    }

    const product= await Product.create({
        title,
        description,
        category,
        price,
        seller,
        stock,
        images,
        features
    })
    if (product) {
        res.status(201).json({
            _id: product._id,
            title: product.title,
            description: product.description,
            category: product.category,
            seller: product.seller,
            stock:product.stock,
            images:product.images,
            features:product.features
        })
    } else {
        res.status(400);
        throw new Error("product not found")
    }
})


const viewAllProducts=expressAsyncHandler(async(req,res)=>{
    const products=await Product.find({})
    if(products){
        res.json(products)
    }else{
        res.status(404)
        throw new Error("No products found")
    }
}   )

const findProductsByName=expressAsyncHandler(async(req,res)=>{
    const keyword=req.query.search
    ?{
        title:{
            $regex:req.query.search,
            $options:"i"
        }
    }
    :{}
    const products=await Product.find({...keyword})
    if(products){
        res.json(products)
    }else{
        res.status(404)
        throw new Error("No products found")
    }
})


const getProductById=expressAsyncHandler(async(req,res)=>{
    const { productId } = req.params;
    const user=await User.findById(req.user._id)
    if(!user){
        res.status(400);
        throw new Error("User not found")
    }

    if(!user.clickedProducts.includes(productId)){
        user.clickedProducts.push(productId);
        await user.save();
    }
    if(!productId){
        res.status(400);
        throw new Error("Please provide a product id")
    }
    try {
        const product = await Product.findById(productId);
    
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error finding product', error: error.message });
      }

})

module.exports={addProduct,viewAllProducts,findProductsByName,getProductById}