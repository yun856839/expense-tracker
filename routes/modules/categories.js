const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeToIcon = require('../../public/javascripts/changeToIcon')

// 分類
// router.get('/:currentCotegory', (req, res) => {
//   const currentCotegory = changeToIcon(req.params.currentCotegory)
//   Record.find()
//     .lean()
//     .sort({ date: 'desc' })
//     .then(records => {
//       return records.filter(record => record.category === currentCotegory)
//     })
//     .then(records => {
//       let totalAmount = 0
//       records.forEach(record => {
//         record.category = changeToIcon(record.category)
//         totalAmount += record.amount
//       })
//       Category.find()
//         .lean()
//         .sort({ _id: 'asc' })
//         .then(categories => res.render('index', { records, categories, totalAmount, currentCotegory }))
//         .catch(err => console.error(err))
//     })
//     .catch(err => console.error(err))
// })

router.get('/', (req, res) => {
  // console.log(req.query)
  const month = req.query.month
  const currentCotegory = req.query.currentCotegory
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const selected = records.filter(record => {
        if (currentCotegory !== '全部' && month !== '全部') {
          return record.category === currentCotegory && record.date.getMonth() === month - 1
        } else if (currentCotegory !== '全部') {
          return record.category === currentCotegory
        } else if (month !== '全部') {
          return record.date.getMonth() === month - 1
        } else {
          return record
        }
      })

      selected.forEach((record, index, records) => {
        records[index].date = record.date.toLocaleDateString()
      })

      let totalAmount = 0
      selected.forEach(record => {
        record.category = changeToIcon(record.category)
        totalAmount += record.amount
      })

      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => res.render('index', { records: selected, categories, totalAmount, currentCotegory, month }))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})


module.exports = router