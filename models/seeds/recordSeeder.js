const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(
    {
      name: '午餐',
      category: '餐飲食品',
      date: '2019/4/23',
      amount: '60',
      icon: 'fas fa-utensils'
    },
    {
      name: '晚餐',
      category: '餐飲食品',
      date: '2019/4/23',
      amount: '60',
      icon: 'fas fa-utensils'
    },
    {
      name: '捷運',
      category: '交通出行',
      date: '2019/4/23',
      amount: '120',
      icon: 'fas fa-shuttle-van'
    },
    {
      name: '電影：驚奇隊長',
      category: '休閒娛樂',
      date: '2019/4/23',
      amount: '220',
      icon: 'fas fa-grin-beam'
    },
    {
      name: '租金',
      category: '家居物業',
      date: '2019/4/23',
      amount: '25000',
      icon: 'fas fa-home'
    })
  console.log('recordSeeder done!')
})