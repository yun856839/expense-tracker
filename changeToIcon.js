function changeToIcon(category) {
  switch (category) {
    case '家居物業':
      return 'fas fa-home'
    case '交通出行':
      return 'fas fa-shuttle-van'
    case '休閒娛樂':
      return 'fas fa-grin-beam'
    case '餐飲食品':
      return 'fas fa-utensils'
    case '其他':
      return 'fas fa-pen'
    case 'house':
      return '家居物業'
    case 'transportation':
      return '交通出行'
    case 'entertainment':
      return '休閒娛樂'
    case 'food':
      return '餐飲食品'
    case 'other':
      return '其他'
  }
}

module.exports = changeToIcon