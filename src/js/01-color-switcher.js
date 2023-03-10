const startColor = document.querySelector('[data-start]');
const stopColor = document.querySelector('[data-stop]');
const { log } = console;

let interval = null;
stopColor.disabled = true;
const changeColor = () => {
  startColor.parentNode.style.background = getRandomColor();
  interval = setInterval(() => {
    startColor.parentNode.style.background = getRandomColor();
  }, 1000);
};
//after start pressing
startColor.addEventListener('click', () => {
  startColor.disabled = true;
  stopColor.disabled = false;
  changeColor();
});

stopColor.addEventListener('click', () => {
  log('stop');
  startColor.disabled = false;
  stopColor.disabled = true;
  clearTimeout(interval);
});

//Random Color function
function getRandomColor() {
  return `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
}
//Random Hex
function getRandomHex() {
  return Math.round(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
}
