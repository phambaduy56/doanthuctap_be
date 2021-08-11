const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const argon2 = require('argon2')
dotenv.config()
const User = require('../models/Users')

//@api dang ky u
exports.singup = async (req, res) => {
    //lay gia tri nguoi dung nhap vao
    const {username, password, email, fullname, usernumber, userimage} = req.body;

    //kiem tra validation
    if(!username || !password || !email || !fullname || !usernumber || !userimage)
    {
        return res
            .status(404)
            .json({success: false, message: 'Gia tri khong duoc rong'})
    }

    try {
        //kiem tra username ton tai chua
        const user = await User.findOne({ username }) // username:username
        if(user)
        {
            return res.status(400).json({success: false, message: 'username bi trung'});
        }

        //ma hoa mat khau
        const hashedPassword = await argon2.hash(password)
        
        // khoi tao user moi va luu vao database
        const newUser = new User({
            username, 
            password: hashedPassword,
            email,
            fullname,
            usernumber,
            userimage,
            role : 'user',
        })
        await newUser.save()

        // return token 
        const accessToken = jwt.sign(
            {userId : newUser._id}, 
            process.env.ACCESS_TOKEN_SECRET
        )

        return res.status(200).json({
            success: true, 
            message: 'Tao tai khoan thanh cong', 
            accessToken,
        });

    } catch (error) {  
       console.log(error)
       res.status(500).json({success: false, message:'internet server'})
    }
}

//@api dang nhap user
exports.singin = async (req, res) => {
    // lay user and pass nguoi dung nhap vao
    const {username, password} = req.body

    // kiem tra khong validation
    if(!username || !password){
        return res.status(400).json({success: false, message: 'tai khaon mat khau khong duoc rong'})
    }

    try {
        //check username
        const user = await User.findOne({ username })

        if(!user){
            return res.status(400).json({success: false, message: 'tai khoan khong ton tai'})
        }

        //check password
        const passwordValid = await argon2.verify(user.password, password)
        const userRole = user.role;

        if(!passwordValid){
            return res.status(400).json({success: false, message: 'mat khau khong chinh xac'})
        }

        // return token 
        const accessToken = jwt.sign(
            {userId : user._id}, 
            process.env.ACCESS_TOKEN_SECRET
        );
        
        const {_id,fullname, email, usernumber, userimage, role} = user

        return res.status(200).json({
            success: true, 
            message: 'dang nhap thanh cong', 
            accessToken,
            user : {
                _id,
                fullname,
                email,
                usernumber,
                userimage,
                role,  
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message:'internet server'})
    }

}

//@api dang nhap admin
exports.AdminSingin = async (req, res) => {
    // lay user and pass nguoi dung nhap vao
    const {username, password} = req.body

    // kiem tra khong validation
    if(!username || !password){
        return res.json({success: false, message: 'tai khaon mat khau khong duoc rong'})
    }

    try {
        //check username
        const user = await User.findOne({ username })

        if(!user){
            return res.json({success: false, message: 'tai khoan khong ton tai'})
        }

        //check password
        const passwordValid = await argon2.verify(user.password, password)

        if(!passwordValid){
            return res.json({success: false, message: 'mat khau khong chinh xac'})
        }

        if(user.role !== 'admin'){
            return res.json({success: false, message: 'mat khau khong chinh xac'})
        }
        
        // return token 
        const accessToken = jwt.sign(
            {userId : user._id}, 
            process.env.ACCESS_TOKEN_SECRET,
        )
        
        const {_id,fullname, email, usernumber, userimage, role} = user

        return res.status(200).json({
            success: true, 
            message: 'dang nhap thanh cong', 
            accessToken,
            user : {
                _id,
                fullname,
                email,
                usernumber,
                userimage,
                role,  
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message:'internet server'})
    }

}

//@api dang ky admin
exports.AdminSingup = async (req, res) => {
   // lay gia tri nguoi dung nhap vao
    const {username, password} = req.body;

    //kiem tra validation
    if(!username || !password )
    {
        return res
            .status(404)
            .json({success: false, message: 'Gia tri khong duoc rong'})
    }

    try {
        //kiem tra username ton tai chua
        const user = await User.findOne({ username }) // username:username
        if(user)
        {
            return res.status(400).json({success: false, message: 'username bi trung'});
        }

        //ma hoa mat khau
        const hashedPassword = await argon2.hash(password)
        
        // khoi tao user moi va luu vao database
        const newUser = new User({
            username, 
            password: hashedPassword,
        })
        await newUser.save()

        // return token 
        const accessToken = jwt.sign(
            {userId : newUser._id}, 
            process.env.ACCESS_TOKEN_SECRET
        )

        return res.status(200).json({
            success: true, 
            message: 'Tao tai khoan thanh cong', 
            accessToken,
        });

    } catch (error) {  
       console.log(error)
       res.status(500).json({success: false, message:'internet server'})
    }
}

exports.getUser = async (req, res) => {
    try {

        const user = await User.find({})
        res.status(200).json({ category })

    } catch (error) {

    }
}
