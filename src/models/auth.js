const db = require('../configs/db')
const models = {}

models.register = async (name, email, password, verifyCode) => {
    try {
       result = await db.query(`INSERT INTO users (name, email, password, verifycode) VALUES($1, $2, $3, $4)`, [name, email, password, verifyCode])
       return result.rows
    } catch (error) {
        throw(error)
    }
}


models.login = async (email) => {
    try {
       result = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
       return result.rows
    } catch (error) {
        throw(error)
    }
}

models.searchUserCOde = async (userCode) => {
    try {        
       result = await db.query(`SELECT * FROM users WHERE verifyCode = $1`, [userCode])
       return result.rows
    } catch (error) {
        throw(error)
    }
}

models.updateVerify = async (user_id) => {
    try {        
       result = await db.query(`UPDATE users SET is_verified = ${true} WHERE user_id = ${user_id}`)
       return result.rows
    } catch (error) {
        throw(error)
    }
}

module.exports = models