
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

console.log(parseInt(input_min, 10) || 0);
console.log(parseInt(input_sec, 10) || 0) ;

// Update timerDisplay
function UpdateDisplayFromInput () {
  const m = parseInt(input_min.value, 10) || 0;
  const s = parseInt(input_sec.value, 10)|| 0;
  timer_display.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}
input_min.addEventListener("input", UpdateDisplayFromInput);
input_sec.addEventListener("input", UpdateDisplayFromInput);

