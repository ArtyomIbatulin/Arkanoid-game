let TOP = topWall.getBoundingClientRect().height;
let BOTTOM =
  leftWall.getBoundingClientRect().height -
  bottomWall.getBoundingClientRect().height;
let RIGHT = topWall.getBoundingClientRect().width;
let LEFT = leftWall.getBoundingClientRect().width;

let vx = 5,
  vy = 5;
let ballStyle = ball.getBoundingClientRect();
let BW = ballStyle.width / 2;
let posX = ballStyle.left + BW;
let posY = ballStyle.top + BW;

let bStyle = bita.getBoundingClientRect();
let WBITA = bStyle.width;
let HBITA = bStyle.height;
let posBitaY = bStyle.top;
let vBita = 10;

let idGo = setInterval(go, 1000 / 20);

document.addEventListener('keydown', moveBita);

function go() {
  let stBita = bita.getBoundingClientRect();
  posX += vx;
  posY += vy;

  if (posX - BW < LEFT) {
    posX = LEFT + BW;
    vx = -vx;
  }

  if (posY - BW < TOP) {
    posY = TOP + BW;
    vy = -vy;
  }

  if (posY + BW > BOTTOM) {
    posY = BOTTOM - BW;
    vy = -vy;
  }

  if (posX + BW > RIGHT - WBITA) {
    if (posY >= stBita.top && posY <= stBita.top + stBita.height) {
      posX = RIGHT - WBITA - BW;
      vx = -vx;
    }
  }

  ball.style.top = posY + 'px';
  ball.style.left = posX + 'px';

  if (posX + BW > RIGHT) {
    clearInterval(idGo);
    document.removeEventListener('keydown', moveBita);
    console.log('Вы проиграли');
  }
}

function moveBita(event) {
  if (event.keyCode == 38) posBitaY -= vBita;
  if (event.keyCode == 40) posBitaY += vBita;
  if (posBitaY < TOP) {
    posBitaY = TOP;
  }
  if (posBitaY + HBITA > BOTTOM) {
    posBitaY = BOTTOM - HBITA;
  }
  bita.style.top = posBitaY + 'px';
}
