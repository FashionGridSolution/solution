const mongoose=require('mongoose')
const productSchema=mongoose.Schema(
    {
        "title": "string",         // Title of the product
        "description": "string",   // Description of the product
        "category": "string",      // Category or type of the product (Electronics, Clothing, etc.)
        "price": "number",         // Price of the product
        // "discount": "number",      // Discount percentage applied to the product (optional)
        "seller": {
           type: mongoose.Schema.Types.ObjectId, ref: "User"
          },
        "stock": {type:"number",required:true,default:1},         // Available stock quantity
        "images": ["string"],      // Array of image URLs for the product
        "features": ["string"],    // Array of product features or specifications
      },
      { timestamps: true }
)

const Product=mongoose.model('Product',productSchema);

module.exports=Product;