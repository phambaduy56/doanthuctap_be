const Product = require('../models/product');

exports.addProduct = async (req, res) => {

    const { category_id, name_product, price, discount, qty } = req.body;
    let productPictures = [];

    if (!name_product) {
        return res.json({ success: false, message: 'Tên sản phẩm không được rỗng!' })
    }

    if (!price) {
        return res.json({ success: false, message: 'Giá sản phẩm không được rỗng!' })
    }

    if(!qty){
        return res.json({ success: false, message: 'Số lượng không được rỗng!' })
    }

    if (!category_id) {
        return res.json({ success: false, message: 'Thể loại không được rỗng!' })
    }

   
    try {

        if (req.files.length > 0) {
            productPictures = req.files.map((file) => {
              return { img: file.filename };
            });
          }

        const product = await Product.findOne({ name_product }) // username:username
        if (product) {
            return res.status(400).json({ success: false, message: 'Sản phẩm bị trùng' });
        }

        const prod = new Product({
            category_id,
            name_product,
            price,
            discount,
            productPictures,
            qty
        })

        await prod.save((error, product) => {
            if (error) return res.status(400).json({ error });
        })

        return res.status(200).json({
            success: true,
            message: 'Thêm sản phẩm thành công!',
        });

    } catch (error) {
        return res.json({
            success: false,
            message: 'Thêm sản phẩm thất bại!',
        });
    }

}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json({ product })
    } catch (error) {
        
    }
}

exports.updateProduct = async (req, res) => {
    const {name_product, price, discount, qty, category_id} = req.body
    try {

        Product.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                name_product,
                price,
                discount,
                qty,
                category_id,
            }
        })
            .then(result => {
               
            })

        return res.status(200).json({
            success: true,
            message: 'Update thành công',
        });

    } catch (error) {

    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.json({ success: false, message: 'Sản phẩm không tồn tại!' })
        }

        await product.remove();

        return res.status(200).json({
            success: true,
            message: 'Delete thành công',
        });
    } catch (error) {
        
    }
}