const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeToIcon = require('../../public/javascripts/changeToIcon')

// 分類
router.get('/:currentCotegory', (req, res) => {
  const currentCotegory = changeToIcon(req.params.currentCotegory)
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      return records.filter(record => record.category === currentCotegory)
    })
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        record.category = changeToIcon(record.category)
        totalAmount += record.amount
      })
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => res.render('index', { records, categories, totalAmount, currentCotegory }))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

module.exports = router