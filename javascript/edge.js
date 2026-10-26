// edge.js
// (smallIconContainer is declared in desktop.js, so desktop.js must load first)
const edgeApp = document.querySelector(".app-edge");
const edgepopup = document.getElementById("edge");
const minimizeBtn = document.getElementById("down");
const closeBtn = document.getElementById("close");
const tabsContainer = document.getElementById("tabs");
const iframe = document.querySelector("#edge-body iframe");
const searchInput = document.getElementById("browser-search");

const DEFAULT_URL = "https://www.google.com/search?igu=1";

// ---------- open / minimize / close ----------
function toggleEdge() {
    const isHidden = edgepopup.style.display === "none" || edgepopup.style.display === "";
    edgepopup.style.display = isHidden ? "block" : "none";
}

edgeApp.addEventListener("click", () => {
    toggleEdge();

    if (!document.querySelector(".edge-footer-icon")) {
        const edgeIcon = document.createElement("div");
        edgeIcon.classList.add("hover", "edge-footer-icon");
        edgeIcon.innerHTML = `<div class="edge-icon"></div>`;
        edgeIcon.addEventListener("click", toggleEdge);
        smallIconContainer.prepend(edgeIcon);
    }
});

minimizeBtn.addEventListener("click", () => {
    edgepopup.style.display = "none";
});

closeBtn.addEventListener("click", () => {
    edgepopup.style.display = "none";
    document.querySelector(".edge-footer-icon")?.remove();
});

// ---------- tabs ----------
const addTabButton = document.createElement("div");
addTabButton.textContent = "+";
addTabButton.classList.add("add-tab");
tabsContainer.appendChild(addTabButton);

let tabCount = 0;

function createTab(url = DEFAULT_URL) {
    tabCount++;

    const tab = document.createElement("div");
    tab.classList.add("tab");
    tab.dataset.tabId = tabCount;
    tab.dataset.url = url;
    tab.innerHTML = `
        <img src="https://www.google.com/s2/favicons?sz=16&domain_url=${encodeURIComponent(url)}"
             width="16" height="16" style="margin-right:8px">
        Tab ${tabCount}
        <span class="close-tab">×</span>`;

    tabsContainer.insertBefore(tab, addTabButton);
    setActiveTab(tab);

    tab.querySelector(".close-tab").addEventListener("click", (event) => {
        event.stopPropagation();
        const wasActive = tab.classList.contains("active");
        tab.remove();
        if (wasActive) {
            const remaining = document.querySelectorAll(".tab");
            if (remaining.length) setActiveTab(remaining[remaining.length - 1]);
        }
    });

    tab.addEventListener("click", () => setActiveTab(tab));
}

function setActiveTab(tab) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    iframe.src = tab.dataset.url;
    searchInput.value = tab.dataset.url;
}

addTabButton.addEventListener("click", () => createTab());

// ---------- address bar ----------
function loadWebsite(url) {
    url = url.trim();
    if (!url) return;

    if (!/^https?:\/\//.test(url)) {
        url = url.includes(".") && !url.includes(" ")
            ? "https://" + url
            : "https://www.google.com/search?igu=1&q=" + encodeURIComponent(url);
    }

    iframe.src = url;
    searchInput.value = url;

    const activeTab = document.querySelector(".tab.active");
    if (activeTab) activeTab.dataset.url = url;
}

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loadWebsite(searchInput.value);
});

// ---------- start ----------
createTab(); // initial tab (runs last, after iframe and searchInput exist)