const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique : true, 
    },

    password: {
        type: String, 
        required: true, 
    },

    email: {
        type: String,
    },

    fullname: {
        type: String,  
    },

    usernumber: {
        type: String, 
    },

    userimage: {
        type: String, 
    },

    role: {
        type: String, 
        enum: ['user', 'admin'], 
        default: 'admin',
    },
    
    createdAt: {
        type: Date, 
        default: Date.now,
    }
});

//users ten table trong mongo con goi la colection, schema lay vao : UserSchema
module.exports = mongoose.model('users', UserSchema)