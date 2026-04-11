console.clear();

// selector
const clock = document.getElementById("clock");

// Define the target date (April 21, 2026 at 00:00:00)
const targetDate = new Date("2026-04-21T00:00:00").getTime();

// define previous second to ensure that we only modify once per second
let prevSecond = -1;

function updateClock() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Stop the animation if the countdown is finished
  if (distance < 0) {
    clock.style.setProperty("--days-text", '"00"');
    clock.style.setProperty("--hours-text", '"00"');
    clock.style.setProperty("--minutes-text", '"00"');
    clock.style.setProperty("--seconds-text", '"00"');
    return;
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // prevent unnecessary DOM updates
  if (seconds === prevSecond) return;
  prevSecond = seconds;

  // numeric values for animation
  clock.style.setProperty("--days", days);
  clock.style.setProperty("--hours", hours);
  clock.style.setProperty("--minutes", minutes);
  clock.style.setProperty("--seconds", seconds);

  // text values for display (padded with leading zeros)
  clock.style.setProperty("--days-text", `"${String(days).padStart(2, "0")}"`);
  clock.style.setProperty(
    "--hours-text",
    `"${String(hours).padStart(2, "0")}"`,
  );
  clock.style.setProperty(
    "--minutes-text",
    `"${String(minutes).padStart(2, "0")}"`,
  );
  clock.style.setProperty(
    "--seconds-text",
    `"${String(seconds).padStart(2, "0")}"`,
  );
}

// animation loop
function animate() {
  updateClock();
  requestAnimationFrame(animate);
}

// initialize
animate();
