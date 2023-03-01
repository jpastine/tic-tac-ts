const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let board: number[], turn: number, winner: boolean, tie: boolean

const squareEls = document.querySelectorAll<HTMLElement>('.sqr')

const messageEl = document.querySelector('#message') as HTMLHeadingElement

const resetBtnEl = document.querySelector('button') as HTMLButtonElement

document.querySelector<HTMLElement>('section')?.addEventListener('click', handleClick)
resetBtnEl?.addEventListener('click', init)

function init() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  turn = 1
  console.log('This is the init function')
  winner = false
  tie = false
  render()
}
init()

function render() {
  updateBoard()
  updateMessage()
}
  
function updateBoard(): void {
  board.forEach(function(el,idx) {
    let square = squareEls[idx]
    if (board[idx] === 0){
      square.textContent = ''
    } else if (board[idx] === 1) {
      square.textContent = 'X'
    } else if (board[idx] === -1) {
      square.textContent = 'O'
    }
  })
}
  
function updateMessage() {
  let name
  if (turn === 1) {
    name = 'X'
  }  else {
    name = 'O'
  }
  if (winner === false && tie === false) {
    messageEl.textContent = `It is ${name}'s turn `
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It's a tie!"
  } else {
    messageEl.textContent = `Congrats! ${name} won!`
    
  }
}

function handleClick(evt: MouseEvent): void {
  if (!(evt.target instanceof HTMLElement)) return
  if (winner === true) {
    return
  }
  
  //obtain the index of the square clicked
  
  let sqIdx: number = parseInt(evt.target.id.replace('sq', ''))
  
  if (board[sqIdx] !== 0) return 
  render()
  
}

function placePiece(idx: number): void {
    board[idx] = turn
    console.log(board)
    
}

  
function checkForTie(): void {
  if (!board.some(board => board === 0)) {
    tie = true
  }
}

function checkForWinner(): void {
  winningCombos.forEach(function(arr){
    let winning = 0
    arr.forEach(function(el){
      winning += board[el]
    })
    console.log('check winner', winning)
    if (Math.abs(winning) === 3) { 
        winner = true
    }
  })
}

function switchPlayerTurn(): void {
  if (winner === true){
    return
  } else {
    turn = turn * -1
  }
}
