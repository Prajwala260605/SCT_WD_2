document.addEventListener("DOMContentLoaded", function () {
  let startTime = 0;
  let elapsedTime = 0;
  let timerInterval;
  let isRunning = false;

  const display = document.getElementById("display");
  const laps = document.getElementById("laps");

  function updateDisplay(time) {
    const hrs = Math.floor(time / 3600000);
    const mins = Math.floor((time % 3600000) / 60000);
    const secs = Math.floor((time % 60000) / 1000);
    display.textContent =
      `${hrs.toString().padStart(2, "0")}:` +
      `${mins.toString().padStart(2, "0")}:` +
      `${secs.toString().padStart(2, "0")}`;
  }

  window.startStop = function () {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 1000);
  };

  window.pause = function () {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
  };

  window.reset = function () {
    pause();
    elapsedTime = 0;
    updateDisplay(0);
    laps.innerHTML = "";
  };

  window.lap = function () {
    if (!isRunning) return;
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  };
});
