// VARIABLES:
// Track total kilometers, steps, active timeframe, GPS watch ID, and previous coordinates
let totalKm = 0;
let totalSteps = 0;
let currentPeriod = "D";
let watchId = null;
let lastLat = null;
let lastLon = null;

// Track streak count and whether today's 5,000-step goal was already reached
let streakCount = 0;
let goalReachedToday = false;

// FUNCTION:
// Runs when the user clicks D, W, or M to switch the timeframe view.
function setTimeframe(period) {
  currentPeriod = period;

  // Get references to all three buttons
  const btnD = document.getElementById("btn-d");
  const btnW = document.getElementById("btn-w");
  const btnM = document.getElementById("btn-m");

  // Remove the active highlight from all buttons first
  btnD.classList.remove("active");
  btnW.classList.remove("active");
  btnM.classList.remove("active");

  // Highlight the clicked button
  if (period === "D") {
    btnD.classList.add("active");
  } else if (period === "W") {
    btnW.classList.add("active");
  } else if (period === "M") {
    btnM.classList.add("active");
  }

  // Refresh the displayed step count for the selected period
  updateDisplay();
}

// FUNCTION:
// Updates the Steps, Km, Streak, and top timeframe numbers on the screen
function updateDisplay() {
  document.getElementById("km-count").textContent = totalKm.toFixed(2);
  document.getElementById("steps-count").textContent = totalSteps;
  document.getElementById("streak-count").textContent = streakCount;

  const label = document.getElementById("timeframe-label");
  if (currentPeriod === "D") {
    label.textContent = "Today " + totalSteps;
  } else if (currentPeriod === "W") {
    label.textContent = "This Week " + totalSteps;
  } else if (currentPeriod === "M") {
    label.textContent = "This Month " + totalSteps;
  }
}

// FUNCTION:
// Adds distance (in km), estimates steps (1 km = 1,300 steps), and updates the screen
function addTestDistance(kmAdded) {
  totalKm += kmAdded;
  totalSteps = Math.round(totalKm * 1300);
  checkGoalAndSave();
  updateDisplay();
}

// FUNCTION:
// Starts or stops real browser GPS tracking
function toggleGPS() {
  const gpsBtn = document.getElementById("gps-btn");
  const statusText = document.getElementById("gps-status");

  // If GPS is already running, stop it
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    lastLat = null;
    lastLon = null;
    gpsBtn.textContent = "Start GPS Run";
    statusText.textContent = "Run paused";
    return;
  }

  // Check if the browser supports GPS
  if (!navigator.geolocation) {
    statusText.textContent = "GPS not supported on this device";
    return;
  }

  // Start watching GPS location
  gpsBtn.textContent = "Stop Run";
  statusText.textContent = "Tracking GPS location...";

  watchId = navigator.geolocation.watchPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      if (lastLat !== null && lastLon !== null) {
        const dist = calculateKm(lastLat, lastLon, lat, lon);
        if (dist > 0.005) { // Ignore tiny GPS drift under 5 meters
          addTestDistance(dist);
        }
      }
      lastLat = lat;
      lastLon = lon;
    },
    function () {
      statusText.textContent = "GPS permission denied or unavailable";
    },
    { enableHighAccuracy: true }
  );
}

// FUNCTION:
// Calculates distance in kilometers between two GPS coordinates (Haversine formula)
function calculateKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// FUNCTION:
// Checks if the 5,000-step daily goal is reached and saves progress to localStorage
function checkGoalAndSave() {
  if (totalSteps >= 5000 && !goalReachedToday) {
    streakCount += 1;
    goalReachedToday = true;
    document.getElementById("gps-status").textContent = "Daily goal reached! Streak +1!";
  }

  // Save values in the browser so they remain after refreshing
  localStorage.setItem("rt_totalKm", totalKm);
  localStorage.setItem("rt_totalSteps", totalSteps);
  localStorage.setItem("rt_streakCount", streakCount);
  localStorage.setItem("rt_goalReached", goalReachedToday);
}

// FUNCTION:
// Loads saved steps, kilometers, and streak when the webpage opens
function loadProgress() {
  const savedKm = localStorage.getItem("rt_totalKm");
  const savedSteps = localStorage.getItem("rt_totalSteps");
  const savedStreak = localStorage.getItem("rt_streakCount");
  const savedGoal = localStorage.getItem("rt_goalReached");

  if (savedKm !== null) {
    totalKm = parseFloat(savedKm);
  }
  if (savedSteps !== null) {
    totalSteps = parseInt(savedSteps);
  }
  if (savedStreak !== null) {
    streakCount = parseInt(savedStreak);
  }
  if (savedGoal === "true") {
    goalReachedToday = true;
  }

  updateDisplay();
}

// Run loadProgress automatically when the page loads
loadProgress();