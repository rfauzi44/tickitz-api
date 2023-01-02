const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const middleware = {}


middleware.login = async (req, res, next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return response(res, 400, {msg: 'token required'})
        }
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRETS)
        req.userData = decoded
        next()
    } catch (error) {
        return response(res, 500, error)
        
    }
}


middleware.isVerified = async (req, res, next) => {
    try {
        const user = req.userData
        console.log(user.is_verified)
        if(user.is_verified == true) {
            next()
        } else {
            return response(res, 400, {msg: 'Youre not verified, please check your email'})
        }
    } catch (error) {
        response(res, 500, error)
        
    }
}


middleware.isAdmin = async (req, res, next) => {
    try {
        const user = req.userData
        if(user.role === 0) {
            next()
        } else {
            return response(res, 400, {msg: 'Youre not admin'})
        }
    } catch (error) {
        response(res, 500, error)
        
    }
}

middleware.isCustomer = async (req, res, next) => {
    try {
        const user = req.userData
        if(user.role === 1) {
            next()
        } else {
            return response(res, 400, {msg: 'Youre not customer'})
        }
    } catch (error) {
        response(res, 500, error)
        
    }
}

module.exports = middleware