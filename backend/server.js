const express=require('express')
const app=express()
require('dotenv').config()
const multer = require('multer');
const port=process.env.PORT || 8080
const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes')
const connectDB=require('./config/db');
const cors = require('cors');
const path=require('path')
connectDB();
const allowedOrigins = ['http://localhost:3000']; 
app.use(cors());
//resolve routes here

//api/v1

app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/product',productRoutes);
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + path.extname(file.originalname);
      cb(null, filename);
    }
  });
   
  const upload = multer({ storage });
  
  app.post('/upload', upload.single('image'), (req, res) => {
    const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });

const server=app.listen(port,console.log(`App is running on port ${port}`))
