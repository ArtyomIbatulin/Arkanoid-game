let ball = document.querySelector('.ball');
let field = document.querySelector('.field');
let bita = document.querySelector('.bita');
let leftWall = document.querySelector('.leftWall');
let rightWall = document.querySelector('.rightWall');
let topWall = document.querySelector('.topWall');
let blocks = document.querySelector('.blocks');

let topcord = topWall.getBoundingClientRect().height;
let bottomcord = leftWall.getBoundingClientRect().height;
let rightcord = topWall.getBoundingClientRect().width;
let leftcord = leftWall.getBoundingClientRect().width;

let vx = 20;
let vy = 20;
let ballStyle = ball.getBoundingClientRect();
let BW = ballStyle.width / 2;
// let posX = ballStyle.left + BW;
// let posY = ballStyle.top + BW;
let posX = Math.round(field.clientWidth / 2 - ball.offsetWidth / 2);
let posY = field.clientHeight - 35;

let bStyle = bita.getBoundingClientRect();
let WBITA = bStyle.width;
let HBITA = bStyle.height;
let posBitaY = bStyle.top;
let posBitaX = Math.round(field.clientWidth / 2 - bita.offsetWidth / 2);
let vBita = 20;

ball.style.left =
  Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = field.clientHeight - 35 + 'px';

bita.style.left =
  Math.round(field.clientWidth / 2 - bita.offsetWidth / 2) + 'px';


const start = setInterval(go, 1000 / 20);

document.addEventListener('keydown', moveBita);

function go() {
  let stBita = bita.getBoundingClientRect();
  posX -= vx;
  posY -= vy;

  if (posX + BW < leftcord) {
    posX = leftcord + BW - 5;
    vx = -vx;
  }

  if (posY - BW < topcord) {
    posY = topcord + BW - 7;
    vy = -vy;
  }

  if (posX + BW > rightcord) {
    posX = rightcord - BW - 20;
    vx = -vx;
  }

  if (posY + BW > bottomcord - HBITA) {
    if (posX >= stBita.left && posX <= stBita.left + stBita.width) {
      posY = bottomcord - HBITA - BW - 20;
      vy = -vy;
    }
  }

  ball.style.top = posY + 'px';
  ball.style.left = posX + 'px';

  if (posY + BW > bottomcord) {
    clearInterval(start);
    document.removeEventListener('keydown', moveBita);
    console.log('Вы проиграли');
  }
}

function moveBita(event) {
  // if (event.code === 'ArrowUp') posBitaY -= vBita;

  // if (event.code === 'ArrowDown') posBitaY += vBita;

  if (event.code === 'ArrowLeft') posBitaX -= vBita;

  if (event.code === 'ArrowRight') posBitaX += vBita;

  if (posBitaY < topcord) posBitaY = topcord;

  if (posBitaY + HBITA > bottomcord) posBitaY = bottomcord - HBITA;

  if (posBitaX + WBITA > rightcord) posBitaX = rightcord - WBITA;

  if (posBitaX < leftcord) posBitaX = leftcord;

  bita.style.top = posBitaY + 'px';
  bita.style.left = posBitaX + 'px';
}

function drawRect (num) {
  let bricks = [];
  for(let i=0; i<num;i++) {
    let brick = document.createElement('div');
    brick.style.width = '50px';
    brick.style.height = '20px';
    brick.style.margin = '0 5px 5px 5px';
    const color = ['red', 'blue', 'yellow', 'green', 'black'];
    const random = Math.floor(Math.random() * color.length);
    brick.style.backgroundColor = color[random];
    bricks.push(brick);
  }

  return bricks;
}

blocks.append(...drawRect(30));
