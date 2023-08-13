const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.PORT || 8080
const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes')
const connectDB=require('./config/db');
const cors = require('cors');
connectDB();
const allowedOrigins = ['http://localhost:3000']; 
app.use(cors({
  origin: allowedOrigins,
}));
//resolve routes here

//api/v1

app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/product',productRoutes);
const server=app.listen(port,console.log(`App is running on port ${port}`))
