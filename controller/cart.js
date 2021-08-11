const Cart = require('../models/cart')


exports.addCart = async (req, res) => {
    const cart = new Cart({
        user: req.body.user,
        cartItems: req.body.cartItems
    })
    cart.save((err, result) => {
        if(err) return res.status(400).json(err);
    });

    return res.status(200).json({
        success: true,
        message: 'Thêm sản phẩm thành công!',
    });
}


