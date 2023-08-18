const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const expressAsyncHandler = require('express-async-handler');
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password,gender,age,city,chestSize,hipSize,footSize,pic } = req.body;
    if (!name || !email || !password || !gender || !age || !city || !chestSize || !hipSize || !footSize) {
        res.status(400);
        throw new Error("Please fill out all the fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }
    const user = await User.create({
        name,
        email,
        password,
        gender,
        age,
        city,
        chestSize,
        hipSize,
        footSize,
        pic
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            gender:user.gender,
            city:user.city,
            age:user.age,
            chestSize:user.chestSize,
            hipSize:user.hipSize,
            footSize:user.footSize,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("User not found")
    }

})

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            gender:user.gender,
            city:user.city,
            age:user.age,
            chestSize:user.chestSize,
            hipSize:user.hipSize,
            footSize:user.footSize,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
    // res.send("Authorize user bitch");
})
const allUsers = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find();
    res.send(users);
})


module.exports = { registerUser, authUser, allUsers};