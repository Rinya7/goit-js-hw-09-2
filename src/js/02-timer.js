import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  days: document.querySelectorAll('.value'),
  btnStart: document.querySelector('button[data-start]'),
  timerCss: document.querySelector('.timer'),
  fieldSection: document.querySelectorAll('.field'),
};

refs.btnStart.addEventListener('click', callbackStartTimer);
refs.btnStart.setAttribute('disabled', 'disabled');
const DELAY = 1000;
cssTimer();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const time = selectedDates[0] - new Date();
    if (time < 0) {
      Notify.failure('Please choose a date in the future', {
        cssAnimationStyle: 'zoom',
      });

      return;
    }
    Notify.success('Date selected. Press strat to "START" the timer', {
      cssAnimationStyle: 'zoom',
    });
    refs.btnStart.removeAttribute('disabled');
    const dataInput = convertMs(time);
    setDataToStart(dataInput);
  },
};

const flatpickr = require('flatpickr');
flatpickr('#datetime-picker', options);

function callbackStartTimer(evt) {
  const idTimer = setInterval(() => {
    setDataToStart(valueDifferenceDate());
    if (valueDifferenceDate() < DELAY) {
      clearInterval(idTimer);
    }
  }, DELAY);
}

function setDataToStart(evt) {
  const key = Object.values(evt);
  //  console.log(key);
  for (let i = 0; i < key.length; i++) {
    refs.days[i].textContent = addLeadingZero(key[i]);
  }
}

function valueDifferenceDate() {
  return convertMs(new Date(refs.input.value) - new Date());
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function cssTimer() {
  const key = Object.values(refs.days);
  for (let i = 0; i < key.length; i++) {
    refs.days[i].style.display = 'block';
    refs.days[i].style.textAlign = 'center';
  }

  refs.timerCss.style.display = 'flex';
  refs.timerCss.style.marginTop = '20px';

  const keys = Object.values(refs.fieldSection);
  //  console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    refs.fieldSection[i].style.marginRight = '20px';
    refs.fieldSection[i].style.padding = '5px';
    refs.fieldSection[i].style.outline = 'auto';
  }
}
