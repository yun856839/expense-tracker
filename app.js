const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Record = require('./models/record')
const Category = require('./models/category')
const changeToIcon = require('../expense-tracker/changeToIcon')

const app = express()
const PORT = 3000


// ------------- mongodb 設定 -------------
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
// ------------- mongodb 設定 -------------

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// 首頁
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      for (let i in records) {
        records[i].category = changeToIcon(records[i].category)
        totalAmount += records[i].amount
      }
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.error(err))
})

// 新增
app.get('/records/new', (req, res) => {
  Category.find()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

app.post('/records', (req, res) => {
  console.log(req.body)
  const { name, date, category, amount, icon } = req.body
  Record.find()
    .lean()
    .then(records => {
      return Record.create({ name, date, category, amount, icon })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

// 編輯
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => console.log(err))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})

// 刪除
app.post('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})