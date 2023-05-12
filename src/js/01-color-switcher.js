function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let intervalId = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  bodyColor: document.querySelector('body'),
};
//console.log(refs.btnStart);

refs.btnStart.addEventListener('click', callbackStart);
refs.btnStop.addEventListener('click', callbackStop);

function callbackStart() {
  intervalId = setInterval(changeColor => {
    refs.bodyColor.style.background = getRandomHexColor();
  }, 1000);
  refs.btnStart.setAttribute('disabled', 'disabled');
}

function callbackStop() {
  clearInterval(intervalId);
  refs.btnStart.removeAttribute('disabled');
}
