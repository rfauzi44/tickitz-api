const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/movie')
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');


routers.get('/', ctrl.getMovieAll)
routers.get('/:movie_id', ctrl.getMovieDetail)
routers.post('/', auth.login, auth.isAdmin, upload.file, ctrl.addMovie)
routers.put('/',auth.login, auth.isAdmin, ctrl.updateMovie)
routers.delete('/',auth.login, auth.isAdmin, ctrl.deleteMovie)
routers.post('/search', ctrl.searchMovie)
routers.post('/sort', ctrl.sortMovie)


module.exports = routers