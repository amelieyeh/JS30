const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
const checkboxesArray = [...checkboxes]; // fixup-step-1: turn the NodeList into an Array
// console.log(checkboxes);

let lastChecked;

// original
// function handleCheck(e) {
//   // console.log(e);
//   // check if they have shift key down
//   // and check that they are checking it
//   let inBetween = false;
//   if(e.shiftKey && this.checked) {
//     // go ahead and do what we please
//     // loop over every single checkbox
//     checkboxes.forEach(checkbox => {
//       if(checkbox === this || checkbox === lastChecked) {
//         inBetween = !inBetween;
//         console.log('Starting to check them inbetween');
//         console.log(`%c inBetween state is: ${inBetween}`, "background-color:blue;color:#fff;");
//       }
//
//       if(inBetween) {
//         checkbox.checked = true;
//         console.log(`%c inBetween state is: ${inBetween}`, "background-color:#eeaf1e;color:#fff;");
//       }
//       console.log(`checked:${checkbox.checked} and inBetween: ${inBetween}`);
//     });
//   }
//
//   lastChecked = this;
// }

// fixup one
// fixup-step-2: use `array.indexOf()` to get the index of seleted inputs in the array to define the range (with the start point like `checkbox === lastChecked` and end point like `checkbox === this`)
// fixup-step-3: the `checkState` variable represents the inputs in the range which are checked or not, it's set `false` at the begining
// fixup-step-4: use `array.slice()` to take all the elements between the range and change their `checkState`

let checkState = false;  // fixup-step-3
function handleCheck(e) {
  if(!lastChecked) { lastChecked = this; }  // mark the lastChecked to redefine the range
  checkState = lastChecked.checked ? true : false;  // checked or unchecked

  if(e.shiftKey) {
    // fixup-step-2
    let start = checkboxesArray.indexOf(lastChecked);
    let end = checkboxesArray.indexOf(this);
    // fixup-step-4
    checkboxesArray
      .slice(Math.min(start, end), Math.max(start, end) + 1)
      .forEach(input => input.checked = checkState);

    if(start - end < 0) {
      console.log(`from first selected input ${start} to second selected input ${end} are checked`);
    } else {
      console.log(`[Backforwad]form first selected input ${start} to second selected input ${end} are checked`);
    }
  }
  lastChecked = this;
}
checkboxes.forEach(checkbox => checkbox.addEventListener( 'click', handleCheck));  // `click` also fire when use keyboard


