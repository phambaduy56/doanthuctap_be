const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const cartSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    
    cartItems : [
        {
            product_id: {
                type: Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },

            qty: {
                type: Number,
                default: 1,
                
            },
        }
    ],

    totalMoney : {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ['true', 'false'],
        default: 'false',
    }

    
});

module.exports = mongoose.model('cart', cartSchema)