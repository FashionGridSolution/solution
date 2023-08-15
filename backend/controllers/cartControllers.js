const expressAsyncHandler = require("express-async-handler");
const express = require("express");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const userInteraction = require("../models/userInteraction");
// req.user.id is the id of the logged in user

const addToCart = expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;
  try {
    const userId = await req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the item already exists in the cart

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    quantity = 1;
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const newInteraction = await userInteraction.create({
      userId: req.user._id,
      product: productId,
      action: 3,
    });
    newInteraction.dateScore = await newInteraction.getDateScore();
    try {
      await user.userInteractions.push(newInteraction._id);
    } catch {
      console.log("error");
    }
    await user.save();
    return res
      .status(201)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error}` });
  }
});

const getCartItems = expressAsyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate({
    path: "items.product",
    model: "Product",
  });
  res.json(cart);
});

const removeFromCart = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
    return;
  }
  const checkifItemExists = cart.items.find((item) =>
    item.product.equals(productId)
  );
  if (!checkifItemExists) {
    res.status(404).json({ message: "Item not found" });
    return;
  }
  const updatedItems = cart.items.filter(
    (item) => !item.product.equals(productId)
  );

  cart.items = updatedItems;

  await cart.save();

  res.json({ message: "Product removed from cart" });
});

const decreaseQuantity = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
    return;
  }
  const itemToUpdate = cart.items.find((item) =>
    item.product.equals(productId)
  );
  if (!itemToUpdate) {
    res.status(404).json({ message: "Item not found" });
    return;
  }
  if (itemToUpdate.quantity > 1) {
    itemToUpdate.quantity -= 1;
  } else {
    // If quantity becomes 0 or less, remove the item from the cart
    const updatedItems = cart.items.filter(
      (item) => !item.product.equals(productId)
    );
    cart.items = updatedItems;
  }

  await cart.save();

  res.json({ message: "Product quantity updated in the cart" });
});

const checkOut=expressAsyncHandler(async(req,res)=>{
  try {
    // Find the user's cart based on the authenticated user
    const userId = await req.user._id;
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: userId });
    let cartItems = cart.items;

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if(cartItems.length===0){
      res.json({message:"Cart is empty"})
    }
    for (const cartItem of cartItems) {
      console.log(cartItem);
      const { product } = cartItem;

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }
      const newInteraction = await userInteraction.create({
        userId: req.user._id,
        product: product,
        action: 5,
      });
      newInteraction.dateScore = await newInteraction.getDateScore();
      try {
        await user.userInteractions.push(newInteraction._id);
      } catch {
        console.log("error");
      }

    }
    await user.save();
    cart.items = [];
    await cart.save();

    return res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
})
module.exports = { addToCart, getCartItems, removeFromCart, decreaseQuantity,checkOut };
