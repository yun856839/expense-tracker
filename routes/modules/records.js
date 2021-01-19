const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

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