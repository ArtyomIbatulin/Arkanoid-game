let field = document.querySelector('.field');
let platform = document.querySelector('.platform');
let ball = document.querySelector('.ball');

platform.style.left = 200 + 'px';
// ball.style.left =
//   Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';

// platform.style.left =
//   Math.round(field.clientWidth / 2 - platform.offsetWidth / 2) + 'px';

let start = function () {
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      ball.classList.add('ball-fly');
    }

    if (event.code === 'ArrowLeft') {
      platform.style.left = parseInt(platform.style.left) - 5 + 'px';
      // console.log(platform.style.left);
    }
    if (event.code === 'ArrowRight') {
      platform.classList.add('platform-right');
    }
  });
};

// function left() {
//   platform.style.left = parseInt(platform.style.left) - 5 + 'px';
// }

// let game = function () {
//   setInterval(start, 1000 / 50);
// };

start();

// game();
