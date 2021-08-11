const Category = require('../models/category')
const Product = require('../models/product')
const verifyToKen = require('../middleware/auth')


//them category
exports.addCategory = async (req, res) => {

    const { name_category } = req.body

    if (!name_category) {
        return res.json({ success: false, message: 'khong duoc de rong' })
    }

    try {

        const category = await Category.findOne({ name_category }) // username:username
        if (category) {
            return res.status(400).json({ success: false, message: 'Thể loại sản phẩm bị trùng' });
        }

        const cat = new Category({
            name_category,
        })
        await cat.save();

        return res.status(200).json({
            success: true,
            message: 'Thêm thể loại thành công!',
        });

    } catch (error) {

    }

}

// get list category
exports.getCategory = async (req, res) => {
    try {

        const category = await Category.find({})
        res.status(200).json({ category })

    } catch (error) {

    }  
}

//put category
exports.putCategory = async (req, res) => {
    const { name_category, status } = req.body


    Category.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name_category,
            status
        }
    })
        .then(result => {

        })

    return res.status(200).json({
        success: true,
        message: 'update thanh cong',
    });

}

//search
exports.searchCate = async (req, res) => {
    const { title } = req.query
    try {

        if (title !== '') {
            const category = await Category.find({ name_category: { $regex: title, $options: '$i' } })
                .then(data => {
                    res.send(data)
                })
        } else {
            const category = await Category.find({})
            res.status(200).json({ category })
        }
    } catch (error) {

    }
}
