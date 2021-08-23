const Cart = require('../models/cart')
const Product = require('../models/product');


exports.addCart = async (req, res) => {
    
    

    const cart = new Cart({
        user: req.body.user,
        cartItems: req.body.cartItems,
        totalMoney: req.body.totalMoney,
        status: req.body.status,
    })
    cart.save((err, result) => {
        if(err) return res.status(400).json(err);

        req.body.cartItems.forEach( async (cartItem) => {
            const id = cartItem.product_id
            const qty = cartItem.qty
            const a = await Product.findOneAndUpdate({_id: id}, {$inc: {qty: -qty}})
        })

        return res.status(200).json({
            success: true,
            message: 'Mua hàng thành công!',
        });
    });

    

}


