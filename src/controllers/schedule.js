const models = require('../models/schedule')
const response = require('../helpers/response')
ctrl = {}

ctrl.getSchedule = async (req, res) => {
    try {
        const result = await models.getSchedule()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


ctrl.getMovieSchedule = async (req, res) => {
    try {
        const {movie_id} = req.body
        const result = await models.getMovieSchedule(movie_id)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


module.exports = ctrl