const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const categories = require('./modules/categories')

router.use('/', home)
router.use('/records', records)
router.use('/categories', categories)

module.exports = router