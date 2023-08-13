const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
  {
    "name": "string",         // Title of the product
    "description": "string",   // Description of the product
    "category_main": "string",      // Category or type of the product (Electronics, Clothing, etc.)
    "category_secondary":"string",
    "category_tertiary":"string",
    "price": "number",         // Price of the product
    "brand":"string",
    "images": ["string"],      // Array of image URLs for the product
    "features": ["string"],    // Array of product features or specifications
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

