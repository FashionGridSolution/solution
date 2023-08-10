const expressAsyncHandler = require("express-async-handler");
const express = require("express");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
// req.user.id is the id of the logged in user

const addToCart = expressAsyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const cartItem = {
    product: product._id,
    quantity: quantity || 1,
  };

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [cartItem],
    });
  } else {
    // Check if the product is already in the cart, update quantity if found
    const existingItem = cart.items.find((item) =>
      item.product.equals(product._id)
    );
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push(cartItem);
    }
  }

  await cart.save();

  res.status(201).json({ message: "Product added to cart" });
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
 const checkifItemExists=cart.items.find((item)=>item.product.equals(productId))
  if(!checkifItemExists){
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

module.exports = { addToCart, getCartItems, removeFromCart };
