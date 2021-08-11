const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require("path");
const shortid = require("shortid");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
            cb(null, path.join(path.dirname(__dirname), "uploads"));
        }else{
            cb(new Error('not image'), false);
        } 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

const { addProduct, getProduct, updateProduct, deleteProduct } = require('../controller/product')

router.post('/postProduct', upload.array("productPictures"), addProduct)
router.get('/getProduct', getProduct)
router.put('/putProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router