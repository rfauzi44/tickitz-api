const models = require('../models/booking')
const response = require('../helpers/response')
ctrl = {}

ctrl.getBooking = async (req, res) => {
    try {
        const result = await models.getBooking()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}


ctrl.getBookingUsers = async (req, res) => {
    try {
        const activeuser = req.userData.user_id
        const result = await models.getBookingUsers(activeuser)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.addBooking = async (req, res) => {
    try {
        const activeuser = req.userData.user_id
        console.log(req)
        const {schedule_id, seat} = req.body
        const result = await models.addBooking({user_id: activeuser, schedule_id, seat})
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}



module.exports = ctrl