const express = require('express')
const router = express.Router()

const {addCart} = require('../controller/cart')


router.post('/postCart', addCart);


module.exports = router