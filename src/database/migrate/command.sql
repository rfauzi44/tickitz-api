-- CREATE TABLE movie (
--     movie_id SERIAL PRIMARY KEY NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     categories VARCHAR(255) NOT NULL,
--     release_date DATE NOT NULL,
--     duration VARCHAR(255) NOT NULL,
--     directors VARCHAR(255) NOT NULL,
--     casts VARCHAR(255) NOT NULL,
--     synopsis VARCHAR(255) NOT NULL
-- )

-- ALTER TABLE movie
-- ADD image VARCHAR(255) NOT NULL;


-- ALTER TABLE movie MODIFY COLUMN create_at DEFAULT now()

-- ALTER TABLE customers ALTER COLUMN image AFTER movie_id;


-- CREATE TABLE schedule (
--     schedule_id SERIAL PRIMARY KEY NOT NULL,
--     studio_id INTEGER NOT NULL,
--     movie_id INTEGER NOT NULL,
--     date DATE NOT NULL,
--     time TIME NOT NULL,
--     price INTEGER NOT NULL,
--     create_at TIMESTAMP DEFAULT now() NOT NULL,
--     update_at TIMESTAMP,
--     CONSTRAINT fk_movie
--       FOREIGN KEY(movie_id) 
-- 	   REFERENCES movie(movie_id)
-- )

-- CREATE TABLE studio (
--     studio_id SERIAL PRIMARY KEY NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     location VARCHAR(255) NOT NULL
-- )

-- ALTER TABLE schedule ADD CONSTRAINT fk_studio FOREIGN KEY(studio_id) REFERENCES studio (studio_id)

-- SELECT *
--        FROM movie
--        LEFT JOIN schedule ON movie.movie_id = schedule.movie_id
--        LEFT JOIN studio ON schedule.studio_id = studio.studio_id
--        WHERE movie.movie_id = 3


-- CREATE TABLE booking (
--     booking_id SERIAL PRIMARY KEY NOT NULL,
--     user_id INTEGER NOT NULL REFERENCES users(user_id),
--     movie_id INTEGER NOT NULL REFERENCES movie(movie_id),
--     schedule_id INTEGER NOT NULL REFERENCES schedule(schedule_id),
--     create_at TIMESTAMP DEFAULT now() NOT NULL,
--     update_at TIMESTAMP
-- )

-- ALTER TABLE booking ADD COLUMN seat VARCHAR(255) NOT NULL;



-- -- CREATE TABLE users (
-- --     user_id SERIAL PRIMARY KEY NOT NULL,
-- --     name VARCHAR(255) NOT NULL,
-- --     email VARCHAR(255) UNIQUE NOT NULL,
-- --     password VARCHAR(255) NOT NULL,
-- --     role INTEGER NOT NULL,
-- --     is_verified BOOLEAN DEFAULT false NOT NULL,
-- --     create_at TIMESTAMP DEFAULT now() NOT NULL,
-- --     update_at TIMESTAMP
-- -- )


-- ALTER TABLE users ALTER COLUMN role TYPE INTEGER
