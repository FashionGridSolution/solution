const Product=require('../models/productModel')
const expressAsyncHandler=require("express-async-handler")
const mongoose=require('mongoose');
const User=require('../models/userModel');
const userInteraction=require('../models/userInteraction');
const addProduct=expressAsyncHandler(async(req,res)=>{
    const {name,
      description,
      category_main,
      category_secondary,
      category_tertiary,
      price,
      brand,
      images,
      features}=req.body;
    if(!name || !description || !category_main || !price || !brand){
        res.status(400);
        throw new Error("Please fill out all the fields")
    }
    const productExists = await Product.findOne({ name });
    if (productExists) {
        res.status(400);
        throw new Error("Product already exists!");
    }

    const product= await Product.create({
        name,
        description,
        category_main,
        category_secondary,
        category_tertiary,
        price,
        brand,
        images,
        features
    })
    if (product) {
        res.status(201).json({
            _id: product._id,
            name: product.name,
            description: product.description,
            category_main: product.category_main,
            category_secondary: product.category_secondary,
            category_tertiary: product.category_tertiary,
            price: product.price,
            brand: product.brand,
            images: product.images,
            features: product.features,
        });
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
  const keyword = req.query.search || ''; // Set an empty string as default

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    user.searchedProducts.push(keyword);
    await user.save();
  } catch (error) {
    // Handle error updating user's searchedProducts
    console.error('Error updating user searchedProducts:', error);
  }

  const products = await Product.find({
    name: {
      $regex: keyword,
      $options: 'i',
    },
  });

  res.json(products);
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
    
   const newInteraction=await userInteraction.create({
        userId:req.user._id,
        product:productId,
        action:1
    })
    newInteraction.dateScore=await newInteraction.getDateScore();
    try{
      await user.userInteractions.push(newInteraction._id);
    }catch{
      console.log("error")
    }
    user.save();
    
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
// productController.js


const getObjectId = async (req, res) => {
  const {productid} = req.params;
  try {
    const product = await Product.findOne({ productid: productid });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ objectId: product._id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={addProduct,viewAllProducts,findProductsByName,getProductById,getObjectId}