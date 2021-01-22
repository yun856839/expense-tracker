const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeToIcon = require('../../public/javascripts/changeToIcon')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        // record.date = record.date.toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
        record.date = new Date(record.date).toISOString().slice(0, 10).replace(/\-/g, '/')
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