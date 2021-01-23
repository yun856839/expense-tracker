const income = document.querySelector('#income')
const btn = document.querySelector('#click-me')
const balance = document.querySelector('.balance')
const totalAmount = document.querySelector('.totalAmount')
btn.addEventListener('click', function () {
  if (Number(income.value) <= 0) {
    balance.innerText = `總收入請輸入大於 0 的數字`
  } else {
    balance.innerText = `餘額 : ${Number(income.value) - Number(totalAmount.innerText.match(/\d+/g))}`
  }
})