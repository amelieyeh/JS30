// get our elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

// built out functions
function togglePlay() {
  // `.paused` is the property of `video`, and there is no `.playing` property live on `video`
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  // video[video.paused ? 'play' : 'pause']();
  // if(video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}

function updateButton() {
  // console.log("update the button!");
  const icon = this.paused ? '►' : '❚ ❚';  // `this` is the `video`
  toggle.textContent = icon;  // toggle the icon, in this case is change the `textContent` property
  // console.log({toggle});
}

function skip() {
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  console.log(`${this.name}: ${this.value}`);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  console.log(percent);
}

function scrub(e){
  // console.log(e) the `MouseEvent` out and you will find the `offsetX` which is relative to the progress `offsetWidth`, use it to calculate the `scrubTime` and then update the video's currentTime
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

// hook up the event listeners
video.addEventListener('click', togglePlay);   // click the video to play
video.addEventListener('play', updateButton);  // update the play button when the video plays
video.addEventListener('pause', updateButton);  // update the play button when the video pauses
video.addEventListener('timeupdate', handleProgress);  // update the progress bar when the video plays

toggle.addEventListener('click', togglePlay);  // click the play button to play
skipButtons.forEach(button => button.addEventListener('click', skip));  // click to skip

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));  // handle range input sliders
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));  // handle range input sliders, for updating real-time, rather than just when we let go of the button

progress.addEventListener('click', scrub);  // change the progress bar width
