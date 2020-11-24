const mongoose = require('mongoose')

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

module.exports = db