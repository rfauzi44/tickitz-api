const db = require("../configs/db");
models = {};

models.getMovieAll = async ({limit, offset}) => {
    try {
       result = await db.query(`SELECT * FROM movie LIMIT ${limit} OFFSET ${offset}`)
       return result.rows
    } catch (error) {
        throw(error)
    }
}

models.getMovieDetail = async (movie_id) => {
    try {
       result = await db.query(`SELECT *
       FROM movie
       LEFT JOIN schedule ON movie.movie_id = schedule.movie_id
       LEFT JOIN studio ON schedule.studio_id = studio.studio_id
       WHERE movie.movie_id = $1
       `, [movie_id])
       return result.rows
    } catch (error) {
        throw(error)
    }
}


models.addMovie = async ({title, categories, release_date, directors, duration, casts, synopsis}, image) => {
    try {
       result = await db.query(`INSERT INTO movie (image, title, categories, release_date, directors, duration, casts, synopsis) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [image, title, categories, release_date, directors, duration, casts, synopsis])
       return result.rows
    } catch (error) {
        throw(error)
    }
}


models.updateMovie = async ({movie_id, title, categories, release_date, directors, duration, casts, synopsis}, image) => {
    try {
       result = await db.query(`UPDATE movie SET image = $1, title = $2, categories = $3, release_date = $4, directors = $5, duration = $6, casts = $7, synopsis = $8, update_at = now() WHERE movie_id = $9`, [image, title, categories, release_date, directors, duration, casts, synopsis, movie_id])
       return result.rows
    } catch (error) {
        throw(error)
    }
    
}



models.deleteMovie = async (movie_id) => {
    try {
       result = await db.query(`DELETE FROM movie WHERE movie_id = $1`, [movie_id])
       return result.rows
    } catch (error) {
        throw(error)
    }
}


models.searchMovie = async (title) => {
    try {
       result = await db.query(`SELECT * FROM movie WHERE LOWER(title) LIKE '%' || $1 || '%'`, [title])
       return result.rows
    } catch (error) {
        throw(error)
    }
}

models.sortMovie = async (by, sort) => {
    try {
       result = await db.query(`SELECT * FROM movie ORDER BY ${by} ${sort}`)
       return result.rows
    } catch (error) {
        throw(error)
    }
}

module.exports = models;
