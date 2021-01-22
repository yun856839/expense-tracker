const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const recordList = require('../../record.json').results

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  SEED_USERS.forEach((user, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        email: user.email,
        password: hash
      })
        .then(user => {
          const userId = user._id
          return Promise.all(
            Array.from(
              { length: 3 },
              (_, i) => {
                return Record.create(Object.assign(recordList[i + index * 3], { userId }))
              }))
        }))
      .then(() => {
        console.log('recordSeeder is done!')
        process.exit()
      })
  })

})