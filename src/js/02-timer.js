import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

const { log } = console;

let date = new Date();
let newDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= date.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      start.disabled = false;
      newDate = selectedDates[0];
    }
  },
};

const addLeadingZero = value => {
  return value.padStart(2, '0');
};

const start = document.querySelector('button');
flatpickr('input', options);
//disabling button at start
start.disabled = true;

function convertMs(ms) {
  date = new Date();

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  timerDays.innerHTML = days;
  timerHours.innerHTML = addLeadingZero(String(hours));
  timerMinutes.innerHTML = addLeadingZero(String(minutes));
  timerSeconds.innerHTML = addLeadingZero(String(seconds));
}

start.addEventListener('click', () => {
  start.disabled = true;
  const timer = setInterval(() => {
    let timeDiff = newDate.getTime() - date.getTime();
    if (timeDiff > 0) {
      convertMs(timeDiff);
    } else {
      clearInterval(timer);
      Notify.info('Timer has hit 0!');
    }
  }, 1000);
});
