const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
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
  ).then(() => console.log('categoyrSeeder done!'))
    .then(() => db.close())
    .then(() => console.log('Close categoyrSeeder!'))
})
