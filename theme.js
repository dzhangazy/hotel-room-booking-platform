// Toggle between dark and light mode
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("themeIcon");

  // Toggle dark mode class
  body.classList.toggle("dark-mode");

  // Update icon and save preference
  if (body.classList.contains("dark-mode")) {
    // Switch to sun icon (for light mode)
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
    localStorage.setItem("theme", "dark");
  } else {
    // Switch to moon icon (for dark mode)
    if (themeIcon) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
    localStorage.setItem("theme", "light");
  }
}

// Load saved theme on page load
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const themeIcon = document.getElementById("themeIcon");

  // Apply saved theme
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  } else {
    body.classList.remove("dark-mode");
    if (themeIcon) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }
}

// Initialize theme immediately (before DOM load to prevent flash)
(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
  }
})();

// Also load on DOM ready for icon
document.addEventListener("DOMContentLoaded", function () {
  loadSavedTheme();
});
