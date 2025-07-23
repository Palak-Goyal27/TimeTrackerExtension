let activeTabUrl = null;
let activeTabId = null;
let startTime = null;

// Track time every 5 seconds
setInterval(async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs.length) return;

  const currentTab = tabs[0];

  if (!currentTab.url || currentTab.url.startsWith("chrome://")) return;

  const domain = new URL(currentTab.url).hostname;

  if (activeTabId !== currentTab.id) {
    // User switched to a different tab
    activeTabId = currentTab.id;
    activeTabUrl = currentTab.url;
    startTime = Date.now();
    return;
  }

  if (!startTime) {
    startTime = Date.now();
    return;
  }

  // Calculate time delta
  const now = Date.now();
  const delta = Math.floor((now - startTime) / 1000);

  if (delta >= 5) {
    let data = await chrome.storage.local.get("sites");
    data.sites = data.sites || {};
    data.sites[domain] = (data.sites[domain] || 0) + delta;

    await chrome.storage.local.set({ sites: data.sites });
    startTime = now;
  }
}, 5000);
