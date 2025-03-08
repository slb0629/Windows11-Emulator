const windowsButton = document.querySelector(".win");
const popup = document.querySelector(".pop");
const apps = document.querySelector(".apps")
const edgeApp = document.querySelector(".app-edge")
const edgepopup = document.getElementById("edge")
const footer = document.querySelector(".footer")
const footerSearch = document.querySelector(".footer-search");
const smallIconContainer = document.getElementById("small-icon");
const minimize = document.getElementById("down")
const close = document.getElementById("close")

// date
const currentTime = document.getElementById("time");
const currentDate = document.getElementById("actual-date")

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours();
const minutes = date.getMinutes();

const formattedTime = `${hour}:${minutes}`;
const formattedDate = `${month}/${day}/${year}`;

currentTime.textContent = formattedTime;
currentDate.textContent = formattedDate;


windowsButton.addEventListener("click", () => {
    if (popup.style.display === "none" || popup.style.display === "") {
        popup.style.display = "block"; // Show pop-up
    } else {
        popup.style.display = "none"; // Hide pop-up
    }
});

edgeApp.addEventListener("click", () =>{
    let edgeIcon = document.querySelector('.edge-footer-icon');
    
    edgeApp.style.backgroundColor = 'rgb(197, 210, 210)';
    edgeApp.style.opacity = '.9';

    if (edgepopup.style.display === "none" || edgepopup.style.display === ""){
        edgepopup.style.display = "block";
        edgeApp.style.backgroundColor = ""
    } else {
        edgepopup.style.display = "none"
    }

    if (!edgeIcon){
        edgeIcon = document.createElement("div");
        edgeIcon.classList.add("hover", "edge-footer-icon");
        edgeIcon.innerHTML = `<div class="edge-icon"></div>`;

        smallIconContainer.insertBefore(edgeIcon, smallIconContainer.firstChild || null);

        edgeIcon.addEventListener("click", () => {
            edgepopup.style.display = (edgepopup.style.display === "none" || edgepopup.style.display === "") ? "block" : "none";
        });
    }

})

minimize.addEventListener("click", ()=>{
    edgepopup.style.display = "none"
})
close.addEventListener("click", () =>{
    edgepopup.style.display = "none";
    smallIconContainer.style.display = "none";
})

// Select the tab container and create a button for adding new tabs
const tabsContainer = document.getElementById("tabs");
const addTabButton = document.createElement("div");
addTabButton.textContent = "+";
addTabButton.classList.add("add-tab");
tabsContainer.appendChild(addTabButton);

let tabCount = 0;

// Function to create a new tab
function createTab(url = "https://www.bing.com") {
    tabCount++;
    
    const tab = document.createElement("div");
    tab.classList.add("tab");
    tab.dataset.tabId = tabCount;

    // Creating a favicon element
    const favicon = document.createElement("img");
    favicon.src = "https://www.google.com/s2/favicons?sz=16&domain_url=" + url;
    favicon.style.width = "16px";
    favicon.style.height = "16px";
    favicon.style.marginRight = "8px";

    tab.appendChild(favicon);
    tab.innerHTML += `Tab ${tabCount} <span class="close-tab">×</span>`;

    tabsContainer.insertBefore(tab, addTabButton);
    setActiveTab(tab);

    // Add event listener for closing the tab
    tab.querySelector(".close-tab").addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent triggering tab activation
        tab.remove();
    });

    // Add event listener for activating tab
    tab.addEventListener("click", () => setActiveTab(tab));
}

// Function to set an active tab
function setActiveTab(tab) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
}

// Event listener for adding new tabs
addTabButton.addEventListener("click", () => createTab());

// Initial default tab
createTab();


const iframe = document.querySelector("#edge-body iframe");
const searchInput = document.getElementById("browser-search");

// Function to load a website in the iframe
function loadWebsite(url) {
    if (!url.startsWith("http")) {
        // If it's not a full URL, assume it's a search query
        url = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
    }
    iframe.src = url;
}

// Event listener for search input
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        loadWebsite(searchInput.value);
    }
});

// Make search input work like a browser address bar
iframe.addEventListener("load", () => {
    searchInput.value = iframe.contentWindow.location.href;
});
