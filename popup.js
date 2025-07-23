document.getElementById("open-dashboard").onclick = () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("dashboard.html") });
};
