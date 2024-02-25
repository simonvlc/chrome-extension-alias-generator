// SHOW THE OPTIONS PAGE ON INSTALLING THE APP
chrome.runtime.onInstalled.addListener(function(details) {
    // Check if the extension was installed (not updated)
    if (details.reason === "install") {
        // Redirect the user to the options page
        chrome.runtime.openOptionsPage();
    }

    // CREATING CONTEXT MENU
    chrome.contextMenus.create({
        id: "viewAliasHistory",
        title: "View Alias History",
        contexts: ["action"], // This makes it appear when clicking the extension icon
    });
});

// MONITOR FOR ONCLICK EVENTS ON THE EXTENSION ICON
chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content-scripts/content-scripts.js']
    });
});

// CONTEXT MENU ITEM ACTION
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "viewAliasHistory") {
        chrome.tabs.create({url: chrome.runtime.getURL('history/history.html')});
    }
});