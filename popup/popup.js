
/*
Done: 
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
const totalCoins = document.getElementById("coinCount");

let isRunning = false;
let totalSeconds = 0;
let remainingSeconds = 0;
let coins = 0;
let timeCountDown;
/*
* Get input time and minutes
*/
function getInputTime(inputTime){
  const time = parseInt(inputTime, 10) || 0;
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
function parseTimeFromDisplay() {
  let timeParts = timer_display.textContent.split(":");
  const m = parseInt(timeParts[0], 10) || 0;
  const s = parseInt(timeParts[1], 10) || 0;
  return [m, s];
}
function startTimer() {
    if (!isRunning) {
      const m = parseTimeFromDisplay()[0];
      const s = parseTimeFromDisplay()[1];
     
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
      // 1. Set time intevals to reduce time 
      // 2. add coins every minute
      timeCountDown = setInterval(() => {
        remainingSeconds--;

        // display time 
        displayMins = Math.floor(remainingSeconds / 60)
        displaySecs = remainingSeconds % 60;
        timer_display.textContent = `${displayMins.toString().padStart(2, "0")}:${displaySecs.toString().padStart(2, "0")}`
        

        // Increase total coins
        if((totalSeconds - remainingSeconds) % 60 === 0 && remainingSeconds > 0) {
          coins = parseInt(totalCoins.textContent) + 1;
          
          totalCoins.textContent = coins.toString();
        }
        if(remainingSeconds <= 0) {
          clearInterval(timeCountDown);
          isRunning = false;
          toggleBtns();

        }
      }, 1000); 

    }
}

// Pause Btn function
function pauseTimer() {
  clearInterval(timeCountDown);

  isRunning = false;
  toggleBtns();
}

// Reset btn function
function resetTimer() {
  clearInterval(timeCountDown);

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
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Start btn
// 


