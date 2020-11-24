const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Record = require('./models/record')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.error(err))
})

// 新增
app.get('/records/new', (req, res) => {
  return res.render('new')
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

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})