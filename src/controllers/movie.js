const models = require('../models/movie')
const response = require('../helpers/response')
ctrl = {}

ctrl.getMovieAll = async (req, res) => {
    try {
        const {page, limit} = req.query
        console.log(page)
        const pageVal = page ? parseInt(page) : 1
        const limitVal = limit ? parseInt(limit) : 5
        const offset = pageVal === 1 ? 0: limitVal * (pageVal-1)
        const result = await models.getMovieAll({limit : limitVal, offset})
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


ctrl.getMovieDetail = async (req, res) => {
    try {
        const {movie_id} = req.params
        const result = await models.getMovieDetail(movie_id)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


ctrl.addMovie = async (req, res) => {
    try {
        const image = req.file.filename
        const {title, categories, release_date, directors, duration, casts, synopsis} = req.body
        const result = await models.addMovie({title, categories, release_date, directors, duration, casts, synopsis}, image)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


ctrl.updateMovie = async (req, res) => {
    try {
        const image = req.file.filename
        const {movie_id, title, categories, release_date, directors, duration, casts, synopsis} = req.body
        const result = await models.updateMovie({movie_id, title, categories, release_date, directors, duration, casts, synopsis}, image)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


ctrl.deleteMovie = async (req, res) => {
    try {
        const {movie_id} = req.body
        const result = await models.deleteMovie(movie_id)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


ctrl.searchMovie = async (req, res) => {
    try {
        const {title} = req.query
        const result = await models.searchMovie(title)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


ctrl.sortMovie = async (req, res) => {
    try {
        const {by, sort} = req.query
        const result = await models.sortMovie(by, sort)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = ctrl