const models = require('../models/auth')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const random = require ('../helpers/randomString')
const transporter = require('../configs/mail');
const auth = {}


auth.register = async(req, res) => {
  try {
    const {name, email, password} =  req.body
    const verifyCode = random(100)
    const message = {
      from: "no-reply@tickitz.com",
      to: `"${email}"`,
      subject: "Email verification",
      text: "Plaintext version of the message",
      html: `<p>To verify click this <a href="${process.env.BASE_URL}:${process.env.APP_PORT}/auth/verify/${verifyCode}" target="_blank">link</a></p>`
    }
    await transporter.sendMail(message)
    const saltRounds = 10
    const hash = await bcrypt.hashSync(password, saltRounds)
    await models.register(name, email, hash, verifyCode)
    return response(res, 200, "Youre registered, please check your email")
  } catch (error) { 
    return response(res, 500, error)
  }
}

auth.login = async(req, res) => {
  try {
    const {email, password} = req.body
    const result = await models.login(email)
    const user = result[0]
    if(!user) {
      return response(res, 401, "email not registered")
    }
    const compared = await bcrypt.compareSync(password, user.password)
    if(!compared) {
      return response(res, 401, "wrong password")
    }
    delete user.password
    const token = `Bearer ${jwt.sign(user, process.env.JWT_SECRETS, {expiresIn: '1h'})}`
    const data = {
      token,
      user
    }
    return response(res, 200, data)
  } catch (error) { 
    return response(res, 500, error)
  }
}

auth.verify = async(req, res) => {
  try {
    
    const userCode = req.params.userCode
    const result = await models.searchUserCode(userCode)
    if (result.length > 0) {
      await models.updateVerify(result[0].user_id)
      return response(res, 200, "You're verified, please log-in again")
    } else {
      return response(res, 400, "Verified code is wrong, please check your email again")
    }

  } catch (error) { 
    return response(res, 500, error)
  }
}

module.exports = auth