chrome.runtime.onInstalled.addListener(function(details) {
    // Check if the extension was installed (not updated)
    if (details.reason === "install") {
        // Redirect the user to the options page
        chrome.runtime.openOptionsPage();
    }
});