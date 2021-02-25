const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const livesDisplay = document.querySelector('#lives');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 920;
const ballDiameter = 15;
let timerId;
let xDirection = 5;
let yDirection = 5;
let score = 0;
let lives = 3;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

class Block {
  constructor(xAxis, yAxis, color, hitCounter) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    this.color = color;
    this.hitCounter = hitCounter;
  }
}

const blocks = [
  new Block(10, 800, 'green', 3),
  new Block(120, 800, 'green', 3),
  new Block(230, 800, 'green', 3),
  new Block(340, 800, 'green', 3),
  new Block(450, 800, 'green', 3),
  new Block(10, 770, 'yellow', 2),
  new Block(120, 770, 'yellow', 2),
  new Block(230, 770, 'yellow', 2),
  new Block(340, 770, 'yellow', 2),
  new Block(450, 770, 'yellow', 2),
  new Block(10, 740, 'blue', 2),
  new Block(120, 740, 'blue', 2),
  new Block(230, 740, 'blue', 2),
  new Block(340, 740, 'blue', 2),
  new Block(450, 740, 'blue', 2),
  new Block(10, 710, 'red', 1),
  new Block(120, 710, 'red', 1),
  new Block(230, 710, 'red', 1),
  new Block(340, 710, 'red', 1),
  new Block(450, 710, 'red', 1),
];

function start(event) {
  if (event.code === 'Space') {
    timerId = setInterval(moveBall, 20);
  }
}

document.addEventListener('keydown', start);

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    block.style.backgroundColor = blocks[i].color;
    grid.append(block);
  }
}

addBlocks();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.append(user);

function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveUser(event) {
  switch (event.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;

    case 'ArrowRight':
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener('keydown', moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.append(ball);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

function checkForCollisions() {
  // block
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] + ballDiameter > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] + ballDiameter < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] + ballDiameter < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));

      blocks[i].hitCounter--;
      if (blocks[i].hitCounter < 0) blocks[i].hitCounter = 0;
      console.log('hitCounter =' + ' ' + blocks[i].hitCounter);

      if (blocks[i].hitCounter === 0) {
        blocks.splice(i, 1);
        allBlocks[i].classList.remove('block');

        if (blocks[i].color === 'red') score += 5;
        if (blocks[i].color === 'blue') score += 10;
        if (blocks[i].color === 'yellow') score += 15;
        if (blocks[i].color === 'green') score += 20;

        // высота, жизни, очки, туры, нач позиция, плавность движения
      }

      changeDirection();

      scoreDisplay.innerHTML = score;
      livesDisplay.innerHTML = lives;

      // win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = 'YOU WIN';
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);
      }
    }
  }

  // wall
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter / 1.5 ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] + ballDiameter / 1.5 <= 0
  ) {
    changeDirection();
  }

  // user
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  // you lost the life
  if (ballCurrentPosition[1] <= 0) {
    livesDisplay.innerHTML = 'You lost the life';
    lives--;
    console.log('lives = ' + lives);
    changeDirection();

    if (lives === 0) {
      clearInterval(timerId);
      document.removeEventListener('keydown', moveUser);
      document.removeEventListener('keydown', start);
      livesDisplay.innerHTML = 'Game over';
    }
  }
}

function changeDirection() {
  // alert('xDirection=' + xDirection + ' ' + 'yDirection=' + yDirection);
  if (xDirection === 5 && yDirection === 5) {
    // yDirection = -5;
    xDirection = -5;
    return;
  }

  if (xDirection === 5 && yDirection === -5) {
    // xDirection = -5;
    yDirection = 5;
    return;
  }

  if (xDirection === -5 && yDirection === -5) {
    // yDirection = 5;
    xDirection = 5;
    return;
  }

  if (xDirection === -5 && yDirection === 5) {
    // xDirection = 5;
    yDirection = -5;
    return;
  }
  // alert('xDirection=' + xDirection + ' ' + 'yDirection=' + yDirection);
}
