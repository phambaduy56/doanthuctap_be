const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.verifyToKen = (req, res, next) => {
    const authHeader = req.headers('Authorization')
    const token = authHeader && authHeader.split('')[1]

    if(!token){
        return res.status(401).json({success: false, message:'khong co token'})
    }

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.userId = decode.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({success: false, message: 'token khong ton tai'})
    }
}

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
      } else {
        return res.status(400).json({ message: "Authorization required" });
      }
      next();
}
