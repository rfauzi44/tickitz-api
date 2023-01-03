const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/booking')
const auth = require('../middlewares/auth');

routers.get('/', auth.login, auth.isAdmin, ctrl.getBooking)
routers.get('/my', auth.login, auth.isCustomer, ctrl.getBookingUsers)
routers.post('/my', auth.login, auth.isVerified, auth.isCustomer, ctrl.addBooking)


module.exports = routers