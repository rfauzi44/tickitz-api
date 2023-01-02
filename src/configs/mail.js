const nodemailer = require('nodemailer')
const Transport = require('nodemailer-sendinblue-transport')

const transporter = nodemailer.createTransport(
    new Transport({ apiKey: `${process.env.SENDINBLUEAPI}` })
  )


module.exports = transporter