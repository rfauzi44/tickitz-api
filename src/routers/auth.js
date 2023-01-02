const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/auth')

routers.post('/register', ctrl.register)
routers.post('/login', ctrl.login)
routers.get('/verify/:userCode', ctrl.verify)


module.exports = routers