// FUNCTION:
// Runs when the user clicks D, W, or M to switch the timeframe view.
function setTimeframe(period) {
  // Get references to all three buttons and the label
  const btnD = document.getElementById("btn-d");
  const btnW = document.getElementById("btn-w");
  const btnM = document.getElementById("btn-m");
  const label = document.getElementById("timeframe-label");

  // Remove the active highlight from all buttons first
  btnD.classList.remove("active");
  btnW.classList.remove("active");
  btnM.classList.remove("active");

  // Highlight the clicked button and update the text label
  if (period === "D") {
    btnD.classList.add("active");
    label.textContent = "Today 0";
  } else if (period === "W") {
    btnW.classList.add("active");
    label.textContent = "This Week 0";
  } else if (period === "M") {
    btnM.classList.add("active");
    label.textContent = "This Month 0";
  }
}