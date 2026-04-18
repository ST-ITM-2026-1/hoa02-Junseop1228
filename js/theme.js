// ===== THEME SWITCHER =====

// Wait for HTML to fully parse before running
document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("theme-toggle");

    // Restore saved theme on page load
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        toggleBtn.textContent = "☀️ Light";
    }

    // Toggle theme on button click
    toggleBtn.addEventListener("click", () => {

        // Returns true if class was added, false if removed
        const isDark = document.body.classList.toggle("dark-theme");

        if (isDark) {
            localStorage.setItem("theme", "dark");
            toggleBtn.textContent = "☀️ Light";
        } else {
            localStorage.setItem("theme", "light");
            toggleBtn.textContent = "🌙 Dark";
        }
    });

});
