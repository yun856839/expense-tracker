const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const recordList = require('../../record.json').results

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      email: SEED_USER.email,
      password: hash
    })
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: recordList.length },
          (_, i) => {
            return Record.create(Object.assign(recordList[i], { userId }))
          }))
      }))
    .then(() => {
      console.log('recordSeeder is done!')
      process.exit()
    })
})