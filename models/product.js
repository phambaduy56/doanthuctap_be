const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const productSchema = new Schema({
    category_id : {
        type: Schema.Types.ObjectId,
        ref: 'category',
    },

    name_product : {
        type: String,
        required: true,
    },

    price : {
        type: Number,
        required: true,
    },

    discount: {
        type: Number,
    },

    productPictures: [
        { 
            img: { 
                type: String 
            } 
        }
    ],

    qty: {
        type: Number,
    },

    description: {
        type: String,
    }
});

module.exports = mongoose.model('product', productSchema)