const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
//import 
const User = require('../models/Users')
const { singup, singin, AdminSingin, AdminSingup, getUser } = require('../controller/user')

//@router post api 
router.post('/dangky',singup);

router.post('/dangnhap', singin);

router.post('/dangnhap/admin', AdminSingin);

router.post('/dangky/admin',AdminSingup);

router.post('/getUser' ,getUser)

module.exports = router