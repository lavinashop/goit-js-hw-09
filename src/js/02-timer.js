import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css'
import {Notify} from 'notiflix';

const buttonStart = document.querySelector('[data-start]');
const showDays = document.querySelector('[data-days]');
const showHours = document.querySelector('[data-hours]');
const showMinutes = document.querySelector('[data-minutes]');
const showSeconds = document.querySelector('[data-seconds]');
buttonStart.disabled = true;
// console.dir(showDays)

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const chosenDate = selectedDates[0].getTime();
      if (chosenDate <= new Date().getTime()) {
        Notify.failure('Please choose a date in the future');
        return;
      }
      buttonStart.disabled = false;
  buttonStart.addEventListener('click', () => {
    buttonStart.disabled = false;
    datePickerEl.disabled = false;
    let timerId = null;
    timerId = setInterval(() => {
        let timerEl = convertMs(chosenDate - new Date().getTime());
        showDays.textContent = addLeadingZero(timerEl.days);
        showHours.textContent = addLeadingZero(timerEl.hours);
        showMinutes.textContent = addLeadingZero(timerEl.minutes);
        showSeconds.textContent = addLeadingZero(timerEl.seconds);
        if (showSeconds.textContent === '00') {
            clearInterval(timerId);
        }
        function addLeadingZero(value) {
            return value.toString().padStart(2, '0')
          }
    }, 1000)
  })
},
};
  const datePickerEl = flatpickr('#datetime-picker', options);
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