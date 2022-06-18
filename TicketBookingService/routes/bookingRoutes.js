const express = require('express')
const {BookTicket} = require('../src/controllers/bookingController')
const router = express.Router()

router.post('/bookticket', BookTicket)
module.exports = router