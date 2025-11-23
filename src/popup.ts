import {Cat } from './models/Cat.js';
import {Mood} from './models/Mood.js';
import {StudyCatStorage} from "./storage/StudyCatStorage.js";
import { runStorageTest } from "./utils/StudyCatStorageTest.js"; 

console.log("Popup script loaded!");
// runStorageTest();
/*
Done: 
1. format time
2. Disply that that user entered
3. count down
4. reset timer.
*/
/** TODOS
 * 1. manage cat mood states, - On start: happy, on pause: sleepy, on end: excited
 * 2. save coins to storage
 * 3. load coins from storage
 */

// Get UI elements
const timer_display = document.getElementById("timerDisplay") as HTMLElement;
const input_min = document.getElementById("minutes") as HTMLInputElement;
const input_sec = document.getElementById("seconds") as HTMLInputElement;
const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const totalCoins = document.getElementById("coinCount")as HTMLElement;
const catEmoji = document.getElementById("cat-emoji") as HTMLElement;

// Global variables
const myCat = new Cat();
myCat.setName("bobo");

let isRunning: boolean = false;
let totalSeconds: number = 0;
let remainingSeconds: number = 0;
let coins: number = 0;
let timeCountDown: number | undefined;;

async function init() {
  const catState = await StudyCatStorage.loadState();

  coins = catState.coins;
  totalCoins.textContent = coins.toString();

  
  myCat.setMood(catState.currentMood);
  updateCatMoodDisplay();
}

// Start the init.
init();

/*
* Get input time and minutes
*/
function getInputTime(inputTime : string): number {
  const time = parseInt(inputTime, 10) || 0;
  return time;
}




// -------------------- Helper Functions ---------------------------
/**
 * Update cat mood
 */
function updateCatMoodDisplay() {
  switch (myCat.currentMood) {
    case "SLEEPY":
      catEmoji.textContent = myCat.getMoodEmoji();
      break;
    case "HAPPY":
      catEmoji.textContent = myCat.getMoodEmoji();

      break;
    case "EXCITED":
      catEmoji.textContent = myCat.getMoodEmoji();
      break;
    case "ANGRY":
      catEmoji.textContent = myCat.getMoodEmoji();
      break;
    default:
      catEmoji.textContent = myCat.getMoodEmoji();
      break;
  }
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
function UpdateDisplayFromInput(): void {
  const m = getInputTime(input_min.value);
  const s = getInputTime(input_sec.value);
  timer_display.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

//------------------------ Logic -------------------------------
/**
 * parse time from timer display
 * @returns [minute, seconds] 
 */
function parseTimeFromDisplay(): [number, number] {
  let timeParts = timer_display.textContent?.split(":");
  const m = parseInt(timeParts[0], 10) || 0;
  const s = parseInt(timeParts[1], 10) || 0;
  return [m, s];
}
/*
* Start button
* Once Start btn is clicked, the input area is invisible
* 
*/
async function startTimer() {
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

      // Update cat mood to happy when timer starts
      myCat.setMood(Mood.HAPPY);
      updateCatMoodDisplay();

      await StudyCatStorage.updateState({ 
        isStudying: true, 
        currentMood: Mood.HAPPY 
      });

      const inputArea = document.getElementById("timeInput");
      if (inputArea) {
        inputArea.style.display = "none";
      }
      
      // 1. Set time intevals to reduce time 
      // 2. add coins every minute
      timeCountDown = setInterval(async() => {
        remainingSeconds--;

        // update UI
        let displayMins = Math.floor(remainingSeconds / 60);
        let displaySecs = remainingSeconds % 60;
        timer_display.textContent = `${displayMins.toString().padStart(2, "0")}:${displaySecs.toString().padStart(2, "0")}`;

        // Increase total coins
        if ((totalSeconds - remainingSeconds) % 60 === 0 && remainingSeconds > 0) {
          coins += 1;
          totalCoins.textContent = coins.toString();
          await StudyCatStorage.updateState({ coins: coins });
        }

        if(remainingSeconds <= 0) {
          clearInterval(timeCountDown);
          isRunning = false;
          toggleBtns();

          coins += 5;
          totalCoins.textContent = coins.toString();
          myCat.setMood(Mood.EXCITED);
          updateCatMoodDisplay();
          
          await StudyCatStorage.updateState({ 
            isStudying: false, 
            currentMood: Mood.EXCITED,
            coins: coins
          });
        }
      }, 1000); 

    }
}

/**
 * Pause Btn function
 */
async function pauseTimer(){
  clearInterval(timeCountDown);

  isRunning = false;
  toggleBtns();

  // Update cat mood to SLEEPY when timer is paused
  myCat.setMood(Mood.SLEEPY);
  updateCatMoodDisplay();

  // Pause study, update the StudyCatState
  await StudyCatStorage.updateState ({
    isStudying: false, 
    currentMood: Mood.SLEEPY 
  });
}

/**
 *  Reset btn function
 */
async function resetTimer() {
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

  // Update cat mood to SLEEPY when timer is reset
  myCat.setMood(Mood.SLEEPY);
  updateCatMoodDisplay();

  await StudyCatStorage.updateState({
    isStudying: false, 
    currentMood: Mood.SLEEPY 
  })
}



input_min.addEventListener("input", UpdateDisplayFromInput);
input_sec.addEventListener("input", UpdateDisplayFromInput);


// Add EventListener to Start button, reset button
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
