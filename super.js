const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const livesDisplay = document.querySelector('#lives');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 920;
// const boardHeight = 650;
const ballDiameter = 15;
let prevPosX;
let prevPosY;
let timerId;
let xDirection = 5;
let yDirection = 5;
let score = 0;
let lives = 3;
let level = 1;

let userStart = [230, 10];
let currentPosition = userStart;

let ballStart = [270, 40];
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
let blocks = [];

function loadLevel(index) {
  clearBlockList();

  for (let i = 0; i < levels[index].length; i++) {
    newBlock = new Block(
      levels[index][i].xAxis,
      levels[index][i].yAxis,
      levels[index][i].color,
      levels[index][i].hitCounter
    );
    blocks.push(newBlock);
  }
}

function clearBlockList() {
  blocks = [];
}

loadLevel(2);

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

function levelUp() {
  level++;
  if (levels[level]) {
    loadLevel(level);
  } else {
    alert('You Win');
  }
}

function checkForCollisions() {
  prevPosX = ballCurrentPosition[0] - xDirection;
  prevPosY = ballCurrentPosition[1] - yDirection;

  // block
  for (let i = 0; i < blocks.length; i++) {
    let hit =
      ballCurrentPosition[0] + ballDiameter > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] + ballDiameter < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] + ballDiameter < blocks[i].topLeft[1];
    if (hit) {
      // if (
      //   prevPosY <= blocks[i].bottomLeft[1] &&
      //   prevPosY >= blocks[i].bottomLeft[1] &&
      //   prevPosY <= blocks[i].bottomRight[1] &&
      //   prevPosY >= blocks[i].bottomRight[1]
      // ) {
      //   xDirection = -xDirection;
      //   alert('hitY');
      // }

      const allBlocks = Array.from(document.querySelectorAll('.block'));
      blocks[i].hitCounter--;

      if (blocks[i].hitCounter < 0) blocks[i].hitCounter = 0;
      console.log('hitCounter =' + ' ' + blocks[i].hitCounter);

      if (blocks[i].hitCounter === 0) {
        if (blocks[i].color === 'red') score += 5;
        if (blocks[i].color === 'blue') score += 10;
        if (blocks[i].color === 'yellow') score += 10;
        if (blocks[i].color === 'green') score += 15;
        if (blocks[i].color === 'purple') score += 15;
        if (blocks[i].color === 'orange') score += 20;
        if (blocks[i].color === 'olive') score += 20;
        if (blocks[i].color === 'aqua') score += 25;

        blocks.splice(i, 1);
        allBlocks[i].remove();
        // if (allBlocks.length) {
        //   allBlocks[i].remove();
        // }
      }

      yDirection = -yDirection;

      scoreDisplay.innerHTML = score;
      livesDisplay.innerHTML = lives;
      // alert('hit');

      // win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = score;
        livesDisplay.innerHTML = 'YOU WIN';
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);
        levelUp();
      }
    }
  }

  // wall
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter &&
    prevPosY > (ballCurrentPosition[1] && prevPosY < ballCurrentPosition[1])
  ) {
    xDirection = -xDirection;
  }

  if (
    ballCurrentPosition[1] >= boardHeight - ballDiameter &&
    (prevPosX > ballCurrentPosition[0] || prevPosX < ballCurrentPosition[0])
  ) {
    yDirection = -yDirection;
  }

  if (
    ballCurrentPosition[0] <= 0 &&
    (prevPosY < ballCurrentPosition[1] || prevPosY > ballCurrentPosition[1])
  ) {
    xDirection = -xDirection;
  }

  // user
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    yDirection = -yDirection;
  }

  // you lost the life
  if (ballCurrentPosition[1] <= 0) {
    livesDisplay.innerHTML = 'You lost the life';
    lives--;
    console.log('lives = ' + lives);
    yDirection = -yDirection;

    if (lives === 0) {
      clearInterval(timerId);
      document.removeEventListener('keydown', moveUser);
      document.removeEventListener('keydown', start);
      livesDisplay.innerHTML = 'Game over';
      clearBlockList();
    }
  }
}

function changeDirection() {
  // if (xDirection === 2 && yDirection === 2) {
  //   yDirection = -2;
  //   return;
  // }
  // if (xDirection === 2 && yDirection === -2) {
  //   xDirection = -2;
  //   return;
  // }
  // if (xDirection === -2 && yDirection === -2) {
  //   yDirection = 2;
  //   return;
  // }
  // if (xDirection === -2 && yDirection === 2) {
  //   xDirection = 2;
  //   return;
  // }
}
