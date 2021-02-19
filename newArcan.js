let ball = document.querySelector('.ball');
let field = document.querySelector('.field');
let bita = document.querySelector('.bita');
let leftWall = document.querySelector('.leftWall');
let rightWall = document.querySelector('.rightWall');
let topWall = document.querySelector('.topWall');

let topcord = topWall.getBoundingClientRect().height;
let bottomcord = leftWall.getBoundingClientRect().height;
let rightcord = topWall.getBoundingClientRect().width;
let leftcord = leftWall.getBoundingClientRect().width;

let vx = 5;
let vy = 5;
let ballStyle = ball.getBoundingClientRect();
let BW = ballStyle.width / 2;
let posX = ballStyle.left + BW;
let posY = ballStyle.top + BW;

let bStyle = bita.getBoundingClientRect();
let WBITA = bStyle.width;
let HBITA = bStyle.height;
let posBitaY = bStyle.top;
let posBitaX = Math.round(field.clientWidth / 2 - bita.offsetWidth / 2);
let vBita = 10;

ball.style.left =
  Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = field.clientHeight - 35 + 'px';

bita.style.left =
  Math.round(field.clientWidth / 2 - bita.offsetWidth / 2) + 'px';

// let idGo = setInterval(go, 1000 / 20);

document.addEventListener('keydown', moveBita);

function moveBita(event) {
  if (event.code === 'ArrowUp') posBitaY -= vBita;

  if (event.code === 'ArrowDown') posBitaY += vBita;

  if (event.code === 'ArrowLeft') posBitaX -= vBita;

  if (event.code === 'ArrowRight') posBitaX += vBita;

  if (posBitaY < topcord) posBitaY = topcord;

  if (posBitaY + HBITA > bottomcord) posBitaY = bottomcord - HBITA;

  if (posBitaX + WBITA > rightcord) posBitaX = rightcord - WBITA;

  if (posBitaX < leftcord) posBitaX = leftcord;

  bita.style.top = posBitaY + 'px';
  bita.style.left = posBitaX + 'px';
}
