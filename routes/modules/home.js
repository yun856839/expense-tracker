const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeToIcon = require('../../public/javascripts/changeToIcon')

// 首頁
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      // for (let i in records) {
      //   records[i].category = changeToIcon(records[i].category)
      //   totalAmount += records[i].amount
      // }
      records.forEach(record => {
        record.date = record.date.toLocaleDateString()
        record.category = changeToIcon(record.category)
        totalAmount += record.amount
      })
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => res.render('index', { records, categories, totalAmount }))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

module.exports = router