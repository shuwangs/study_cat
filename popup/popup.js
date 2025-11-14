
/*
TODOS:
1. format time
2. Disply that that user entered
3. count down
4. reset timer.

*/
const timer_display = document.getElementById("timerDisplay")
const input_min = document.getElementById("minutes");
const input_sec = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let isRunning = false;
let totalSeconds = 0;
let remainingSeconds = 0;
/*
* Get input time and minutes
*/
function getInputTime(inputTime){
  const time = parseInt(input_min.value, 10) || 0;
  return time;
}

/*
* Toggle between buttons
*/
function toggleBtns() {
  if(!isRunning) {
    startBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
    resetBtn.style.display = 'flex';
  } else {
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
    resetBtn.style.display = 'flex';
  }
}


/*
* Update timerDisplay with Input time
*/
function UpdateDisplayFromInput() {
  const m = getInputTime(input_min.value);
  const s = getInputTime(input_sec.value);
  timer_display.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

/*
* Start button
* Once Start btn is clicked, the input area is invisible
* 
*/

function startTimer() {
    if (!isRunning) {
      const m = getInputTime(input_min.value);
      const s = getInputTime(input_sec.value);
     
      totalSeconds = m * 60 + s;
      remainingSeconds = totalSeconds;

      if (totalSeconds <= 0) {
        alert("Please Enter a valid time");
        return;
      }

      isRunning = true;
      toggleBtns(); 

      const inputArea = document.getElementById("timeInput");
      if (inputArea) {
        inputArea.style.display = "none";
      }
  
    }
}


// Reset btn function
function resetTimer() {
  isRunning = false;
  toggleBtns();
  const inputArea = document.getElementById("timeInput");
    if (inputArea) {
      inputArea.style.display = "flex";
    }
  timer_display.textContent = `25:00`
  input_min.value = "25";
  input_sec.value = "00";
}

input_min.addEventListener("input", UpdateDisplayFromInput);
input_sec.addEventListener("input", UpdateDisplayFromInput);

// Add EventListener to Start button, reset button
startBtn.addEventListener("click", startTimer);

resetBtn.addEventListener("click", resetTimer);

// Start btn
// 


