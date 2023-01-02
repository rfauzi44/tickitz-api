require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.APP_PORT || 3000
const router = require('./src/routers/index');
const dbms = require('./src/configs/db');

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(router)

dbms.connect().then(() => {
    server.listen(PORT, ()=> {
        console.log(`running on ${PORT}`)

    })
    
}).catch((error) => {
    console.log(error)
})
