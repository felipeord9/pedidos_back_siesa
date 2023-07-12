const express = require('express')
const MailController = require('../../controllers/mailController')

const router = express.Router()

router.post('/send', MailController.sendMail)

module.exports = router