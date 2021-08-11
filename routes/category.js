const express = require('express')
const router = express.Router()

const category = require('../models/category')
const {verifyToKen} = require('../middleware/auth')

const { addCategory, getCategory, putCategory, searchCate} = require('../controller/category')
    
//them danh muc
router.post('/postCategory',addCategory);
router.get('/getCategory',getCategory);
router.put('/putCategory/:id', putCategory);
router.get('/searchCate', searchCate);

module.exports = router