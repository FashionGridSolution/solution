const express=require('express')
const { default: mongoose } = require('mongoose')
const Product=require('../models/productModel')

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});
const cartSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      items: [cartItemSchema],
    }, {
      timestamps: true,
});

const Cart=mongoose.model('Cart',cartSchema)
module.exports=Cart