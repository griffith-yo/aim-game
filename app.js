const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = [
  '#0d6efd',
  '#6610f2',
  '#6f42c1',
  '#d63384',
  '#dc3545',
  '#fd7e14',
  '#ffc107',
  '#198754',
  '#20c997',
  '#0dcaf0',
]
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault() // Убирает # в строке
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time')) // Получаем значение атрибута data-time из тега
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRundomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRundomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    setTime(current)
  }
}

function setTime(value) {
  if (value < 10) timeEl.innerHTML = `00:0${value}`
  else timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRundomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = colors[Math.floor(Math.random() * colors.length)]

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function winTheGame() {
  function kill() {
    const circle = document.querySelector('.circle')
    if (circle) circle.click()
  }

  setInterval(kill, 42)
}
