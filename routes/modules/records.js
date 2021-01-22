const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeToIcon = require('../../public/javascripts/changeToIcon')

//分類
router.get('/', (req, res) => {
  const userId = req.user._id
  // console.log(req.query)
  const month = req.query.month
  const currentCotegory = req.query.currentCotegory
  Record.find({ userId })
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
        // records[index].date = record.date.toLocaleDateString()
        records[index].date = new Date(record.date).toISOString().slice(0, 10)
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


// 新增
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  // console.log(req.body)
  const { name, date, category, amount, merchant } = req.body
  return Record.create({ name, date, category, amount, merchant, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 編輯
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      // record.date = record.date.toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
      record.date = new Date(record.date).toISOString().slice(0, 10);
      const currentCategory = record.category
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => res.render('edit', { record, categories, currentCategory }))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})

// 刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router