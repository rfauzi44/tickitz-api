const db = require("../configs/db");
models = {};

models.getBooking = async () => {
    try {
       result = await db.query(`SELECT * FROM booking`)
       return result.rows
    } catch (error) {
        throw(error)
    }
}


models.getBookingUsers = async (user_id) => {
    try {
       result = await db.query(`SELECT booking_id, title, price, date, time, studio.name AS studio, location, seat, time FROM booking
       INNER JOIN users ON users.user_id = booking.user_id
       INNER JOIN schedule ON schedule.schedule_id = booking.schedule_id
       INNER JOIN movie ON schedule.movie_id = movie.movie_id
       INNER JOIN studio ON schedule.studio_id = studio.studio_id     
       WHERE booking.user_id = $1
       `, [user_id])
       return result.rows
    } catch (error) {
        throw(error)
    }
}

models.addBooking = async ({user_id, schedule_id, seat}) => {
    try {
       result = await db.query(`INSERT INTO booking (user_id, schedule_id, seat) VALUES($1, $2, $3)`, [user_id, schedule_id, seat])
       return result.rows
    } catch (error) {
        throw(error)
    }
}


module.exports = models;
