require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@do-an-thuc-tap-2021.dhkif.mongodb.net/do-an-thuc-tap-2021?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();    

const app = express();
app.use(express.json());


app.use('/api/user', userRouter)

app.use('/api', categoryRouter)

app.use('/api', productRouter)

app.use('/api', cartRouter)


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});