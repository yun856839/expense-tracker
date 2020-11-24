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
    {
      category: '家居物業',
      category_en: 'house'
    },
    {
      category: '交通出行',
      category_en: 'transportation'
    },
    {
      category: '休閒娛樂',
      category_en: 'entertainment'
    },
    {
      category: '餐飲食品',
      category_en: 'food'
    },
    {
      category: '其他',
      category_en: 'other'
    }
  )
  console.log('categoyrSeeder done!')

})
