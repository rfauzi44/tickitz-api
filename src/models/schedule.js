const db = require("../configs/db");
models = {};

models.getSchedule = async () => {
    try {
       result = await db.query(`SELECT * FROM schedule`)
       return result.rows
    } catch (error) {
        throw(error)
    }
}

models.addSchedule = async ({studio_id, movie_id, date, time, price}) => {
    try {
       result = await db.query(`INSERT INTO schedules (studio_id, movie_id, date, time, price) VALUES($1, $2, $3, $4, $5)`, [studio_id, movie_id, date, time, price])
       return result.rows
    } catch (error) {
        throw(error)
    }
}

models.getMovieSchedule = async (movie_id) => {
    try {
       result = await db.query(`SELECT date, time, price, studio.name AS studio, studio.location, schedule.create_at, schedule.update_at
       FROM schedule
       JOIN studio ON schedule.studio_id = studio.studio_id
       JOIN movie ON movie.movie_id = schedule.movie_id
       WHERE movie.movie_id = $1
       `, [movie_id])
       return result.rows
    } catch (error) {
        throw(error)
    }
}

module.exports = models;
