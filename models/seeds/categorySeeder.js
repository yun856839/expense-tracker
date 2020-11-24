const mongoose = require('mongoose')
const Category = require('../category')

mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(
    { category: '家居物業' },
    { category: '交通出行' },
    { category: '休閒娛樂' },
    { category: '餐飲食品' },
    { category: '其他' }
  )
  console.log('categoyrSeeder done!')

})
