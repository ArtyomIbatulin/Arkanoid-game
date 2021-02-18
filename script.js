let field = document.querySelector('.field');
let platform = document.querySelector('.platform');
let ball = document.querySelector('.ball');
let blocks = document.querySelector('.blocks');

platform.style.left =
  Math.round(field.clientWidth / 2 - platform.offsetWidth / 2) + 'px';

ball.style.left =
  Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = field.clientHeight - 25 + 'px';

const start = function () {
  let posB = ball.getBoundingClientRect();
  let posP = platform.getBoundingClientRect()
  console.log(posB);
  console.log(posP);

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      ball.classList.add('ball-fly');
    }

    if (event.code === 'ArrowLeft') {
      platform.style.left = parseInt(platform.style.left) - 5 + 'px';
    }

    if (event.code === 'ArrowRight') {
      platform.style.left = parseInt(platform.style.left) + 5 + 'px';
    }
  });

};



// let game = function () {
//   setInterval(start, 1000 / 50);
// };

start();

// game();
