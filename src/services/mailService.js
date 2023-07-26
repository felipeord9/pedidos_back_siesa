const nodemailer = require("nodemailer")
const pdf = require('html-pdf')
const { config } = require('../config/config')

async function sendEmails() {  
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: true,
    auth: {
      user: config.smtpEmail,
      pass: config.smtpPassword
    }
  })

  if(!transporter) throw new Error('Error')

  return transporter
}

async function generatePDF(info, callback) {
  pdf.create(info, {
    childProcessOptions: {
      env: {
        OPENSSL_CONF: '/dev/null',
      },
    }
  }).toBuffer((error, buffer) => {
    if(error) {
      callback(error, null)
    } else {
      callback(null, buffer)
    }
  })
}

module.exports = {
  sendEmails,
  generatePDF
}