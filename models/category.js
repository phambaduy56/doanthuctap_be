const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const categoryqSchema = new Schema({
    name_category : { 
        type : String,
        required : true,
        text: true,
    },

    status: {
        type: String,
        enum: ['active', 'disable'],
        default: 'active',
    }
});

module.exports = mongoose.model('category', categoryqSchema)