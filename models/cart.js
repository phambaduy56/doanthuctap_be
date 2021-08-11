const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const cartSchema = new Schema({
    user : { 
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    
    cartItems : [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },

            qty: {
                type: Number,
                default: 1,
                
            },

            price: {
                type: Number,
                required: true,
            },
        }
    ]

    
});

module.exports = mongoose.model('cart', cartSchema)