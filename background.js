// SHOW THE OPTIONS PAGE ON INSTALLING THE APP
chrome.runtime.onInstalled.addListener(function(details) {
    // Check if the extension was installed (not updated)
    if (details.reason === "install") {
        // Redirect the user to the options page
        chrome.runtime.openOptionsPage();
    }
});

// MONITOR FOR ONCLICK EVENTS ON THE EXTENSION ICON
chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content-scripts/content-scripts.js']
    });
});
