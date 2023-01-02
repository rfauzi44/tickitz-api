const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/schedule')

routers.get('/', ctrl.getSchedule)
routers.get('/movies', ctrl.getMovieSchedule)


module.exports = routers