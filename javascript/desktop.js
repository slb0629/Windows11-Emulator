// desktop.js
const windowsButton = document.querySelector(".win");
const popup = document.querySelector(".pop");
const smallIconContainer = document.getElementById("small-icon");
const currentTime = document.getElementById("time");
const currentDate = document.getElementById("actual-date");

function updateClock() {
    const now = new Date();
    currentTime.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    currentDate.textContent = now.toLocaleDateString();
}
updateClock();
setInterval(updateClock, 1000);

windowsButton.addEventListener("click", () => {
    const isHidden = popup.style.display === "none" || popup.style.display === "";
    popup.style.display = isHidden ? "block" : "none";
});

document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !windowsButton.contains(e.target)) {
        popup.style.display = "none";
    }
});