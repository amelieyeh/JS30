let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// we can't use:
// setInterval(seconds,{
//   seconds—;
// });
// because sometimes when the browser is not active, it might pause the setInterval(), and also pauses while scrolling in iOS.

function timer(seconds) {
  // when start a timer, clear existing timers
  clearInterval(countdown);

  const now = Date.now();
  // will get us current timestamp in milliseconds
  const then = now + seconds * 1000;
  // `now` plus the number of seconds that you wish to run the tim for. `now` is in milliseconds, but `seconds` is not, so we need to multiple by 1000 to be in milliseconds as well
  displayTimeLeft(seconds);
  displayEndTime(then);

  // setInterval does not run immediately, it needs 1 second to start
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // display it
    // console.log(secondsLeft);
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display; // the `<title>` tag on HTML
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  // console.log(this.dataset.time);
  const seconds = parseInt(this.dataset.time);
  // console.log(seconds);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  // console.log(mins);
  timer(mins * 60);
  this.reset();  // clear form input value
});

