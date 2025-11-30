import {Cat } from './models/Cat.js';
import {Mood} from './models/Mood.js';
import {StudyCatStorage} from "./storage/StudyCatStorage.js";
import { StudyCatState } from './models/StudyCatState.js'; 

console.log("Popup script loaded!");
// runStorageTest();

// --- UI Elements (Home) ---
const timer_display = document.getElementById("timerDisplay") as HTMLElement;
const input_min = document.getElementById("minutes") as HTMLInputElement;
const input_sec = document.getElementById("seconds") as HTMLInputElement;
const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const totalCoins = document.getElementById("coinCount")as HTMLElement;
const catEmoji = document.getElementById("cat-emoji") as HTMLElement;

// --- UI Elements (Navigation & Views) ---
const navHome = document.getElementById("nav-home") as HTMLElement;
const navStats = document.getElementById("nav-stats") as HTMLElement;
const navSettings = document.getElementById("nav-settings") as HTMLElement;
const viewHome = document.getElementById("view-home") as HTMLElement;
const viewStats = document.getElementById("view-stats") as HTMLElement;
const viewSettings = document.getElementById("view-settings") as HTMLElement;


// --- UI Elements (Settings) ---
const blacklistInput = document.getElementById("blacklist-input") as HTMLInputElement;
const btnAddSite = document.getElementById("btn-add-site") as HTMLButtonElement;
const btnUpdateSite = document.getElementById("btn-update-site") as HTMLButtonElement;
const btnDeleteSite = document.getElementById("btn-delete-site") as HTMLButtonElement;

const blacklistUl = document.getElementById("blacklist-ul") as HTMLElement;

// --- Global Variables ---
const myCat = new Cat();
myCat.setName("bobo");

let isRunning: boolean = false;
let totalSeconds: number = 0;
let remainingSeconds: number = 0;
let coins: number = 0;
let timeCountDown: number | undefined;;
let minutesRewarded: number = 0;

// ==========================================
// Initalization 
// ==========================================
async function init() {
  const catState = await StudyCatStorage.loadState();

  // Basic data
  coins = catState.coins;
  totalCoins.textContent = coins.toString();
  myCat.setMood(catState.currentMood);
  updateCatMoodDisplay();

  // render blacklist and stats
  renderBlacklist(catState.blackList);
  renderStats();

  // cat mood recover and give coins
  if(catState.isStudying && catState.targetEndTime) {
    const now = Date.now();
    const diff = catState.targetEndTime - now;

    if (diff > 0) {
      console.log("Counting is back on ...");
      remainingSeconds = Math.ceil(diff / 1000);

      isRunning = true;
      toggleBtns();
      hideInputArea();

      updateDisplayFromRemaining(); // Fresh the time display
      
      // Start the countdown, pass in the targetEndTime
      runTimerLoop(catState.targetEndTime);
    } else {
      console.log("The set time has been finished");
      timeCompleteHandler();
    }
  }
}

// Start the init.
init();

// ==========================================
// Switch views 
// ==========================================
function switchView(viewName: 'home' | 'stats' | 'settings') {
  // hide all 
  viewHome.style.display = "none";
  viewStats.style.display = "none";
  viewSettings.style.display = "none";

  if (viewName == 'home') {
    viewHome.style.display = "block";;
    navHome.classList.add("active");
  } else if (viewName == 'stats') {
    viewStats.style.display = "block";;
    navHome.classList.add("active");
  } else if (viewName == 'settings') {
    viewSettings.style.display = "block";;
    navHome.classList.add("active");
  } 
}

// ==========================================
// Blacklist related logic
// ==========================================
function renderBlacklist(list:string[]) {
  return null;
}

function addSiteToBlacklist() {
  return null;
}
function updateSiteFromBlacklist () {
  return null;
}

function deleteSiteFromBlacklist() {

}

// ==========================================
// Stats View related logic
// ==========================================

function renderStats(){return null};

//------------------------ Logic -------------------------------
// Update UI and check the the time
function runTimerLoop(targetEndTime: number) {
  if(timeCountDown) clearInterval(timeCountDown);

  timeCountDown = setInterval(async () => {
    const now = Date.now();
    const diff = targetEndTime - now;

    remainingSeconds = Math.ceil(diff / 1000);

    updateDisplayFromRemaining();

    if(remainingSeconds <= 0) {
      await timeCompleteHandler();
    }

    const elapsedSeconds = totalSeconds - remainingSeconds;
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);

    if(elapsedMinutes > minutesRewarded) {
      const newlyRewarded = elapsedMinutes - minutesRewarded;
      minutesRewarded = elapsedMinutes;

      const currentState = await StudyCatStorage.loadState();
      const newCoins = currentState.coins + newlyRewarded; 

      coins = newCoins;
      totalCoins.textContent = coins.toString();

      await StudyCatStorage.updateState({
        coins: newCoins,
        elapsedTime: (currentState.elapsedTime ?? 0)
      });
    }
  }, 1000);
}

// ----------------------BUTTON FUNCTION -----------------------------

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
      hideInputArea();
      
      // Update cat mood to happy when timer starts
      myCat.setMood(Mood.HAPPY);
      updateCatMoodDisplay();

      // Estimate the finish time
      const targetTime = Date.now() + (totalSeconds * 1000);

      await StudyCatStorage.updateState({ 
        isStudying: true, 
        currentMood: Mood.HAPPY,
        targetEndTime: targetTime
      });
      runTimerLoop(targetTime);

    }
}

/**
 * Pause Btn function
 */
async function pauseTimer(){
  if (timeCountDown) clearInterval(timeCountDown);

  clearInterval(timeCountDown);

  isRunning = false;
  toggleBtns();

  // Update cat mood to SLEEPY when timer is paused
  myCat.setMood(Mood.SLEEPY);
  updateCatMoodDisplay();

  // Pause study, update the StudyCatState
  await StudyCatStorage.updateState ({
    isStudying: false, 
    currentMood: Mood.SLEEPY,
    targetEndTime: undefined 
  });
}


/**
 *  Reset btn function
 */
async function resetTimer() {
  clearInterval(timeCountDown);

  isRunning = false;
  toggleBtns();
  showInputArea();

  // Reset UI
  timer_display.textContent = `25:00`
  input_min.value = "25";
  input_sec.value = "00";

  // Update cat mood to SLEEPY when timer is reset
  myCat.setMood(Mood.SLEEPY);
  updateCatMoodDisplay();

  await StudyCatStorage.updateState({
    isStudying: false, 
    currentMood: Mood.SLEEPY,
    targetEndTime: undefined
  })
}

// --------------------- IMPORTANT LOGIC ------------------------------

async function timeCompleteHandler() {
  if(timeCountDown) clearInterval(timeCountDown);

  isRunning = false;
  toggleBtns();

  remainingSeconds = 0;
  updateDisplayFromRemaining();

  const currentState = await StudyCatStorage.loadState();
  const newCoins = currentState.coins + 5;

  coins = newCoins;
  totalCoins.textContent = coins.toString();
  myCat.setMood(Mood.EXCITED);
  updateCatMoodDisplay();

  // Complete and reset status
  await StudyCatStorage.updateState({
    isStudying: false,
    currentMood: Mood.EXCITED,
    coins: newCoins,
    targetEndTime: undefined
  });
}

// --------------------- UI HELPER FUNCTIONS--------------------------
/*
* Get input time and minutes
*/
function getInputTime(inputTime : string): number {
  const time = parseInt(inputTime, 10) || 0;
  return time;
}

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
function hideInputArea() {
  const inputArea = document.getElementById("timeInput");
    if (inputArea) {
      inputArea.style.display = "none";
    }
}

function showInputArea() {
  const inputArea = document.getElementById("timeInput");
  if (inputArea) inputArea.style.display = "flex";
}


function  updateDisplayFromRemaining() {
  const safeSeconds = Math.max(0, remainingSeconds);
  let displayMinutes = Math.floor(safeSeconds / 60);
  let displaySeconds = safeSeconds % 60;
  timer_display.textContent = `${displayMinutes.toString().padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}`;
}

/*
* Update timerDisplay with Input time
*/
function UpdateDisplayFromInput(): void {
  const m = getInputTime(input_min.value);
  const s = getInputTime(input_sec.value);
  timer_display.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

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

// -------------------- EVENT LISTENERS ---------------------------
// nav
navHome.addEventListener('click', () => switchView('home'));
navStats.addEventListener('click', () => switchView('stats'));
navSettings.addEventListener('click', () => switchView('settings'));

// Settings add buton
btnAddSite.addEventListener('click', addSiteToBlacklist);
btnUpdateSite.addEventListener('click', updateSiteFromBlacklist);
btnDeleteSite.addEventListener('click', deleteSiteFromBlacklist);


// timer input area
input_min.addEventListener("input", UpdateDisplayFromInput);
input_sec.addEventListener("input", UpdateDisplayFromInput);

// Add EventListener to Start button, reset button
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);


chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
  if(message.type === "STUDYCAT_PENALTY") {
    console.log("Received penalty message from background:", message.url);
    (async ()=> {
      const state = await StudyCatStorage.loadState();
      coins = state.coins;
      totalCoins.textContent = coins.toString();

      myCat.setMood(state.currentMood);
      updateCatMoodDisplay();
    })();
  } 
  if (message.type === "STUDYCAT_RECOVER") {
    (async () => {
      const state = await StudyCatStorage.loadState();
      myCat.setMood(state.currentMood);
      updateCatMoodDisplay();
    })();
  }
})
