const express = require('express')
const routers = express.Router()
const movie = require('./movie');
const schedule = require('./schedule');
const booking = require('./booking');
const auth = require('./auth');

routers.use('/movies', movie)
routers.use('/schedules', schedule)
routers.use('/bookings', booking)
routers.use('/auth', auth)


module.exports = routers