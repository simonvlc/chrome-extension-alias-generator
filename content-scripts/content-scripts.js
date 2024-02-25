// content-scripts/content-scripts.js

// Function to extract the domain name from the current URL, excluding subdomains
function extractDomain(url) {
    const hostname = new URL(url).hostname;
    // Split the hostname by dots, remove the last two parts (TLD and domain), and rejoin.
    const domainParts = hostname.split('.').slice(-2);
    return domainParts.join('.');
}

// Function to generate the email alias
function generateEmailAlias(baseEmail, domain) {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('en-GB').replace(/\//g, '');
    const hourString = currentDate.toLocaleTimeString('en-GB', {hour12: false}).replace(/:/g, '').slice(0, 4);
    return `${baseEmail.split('@')[0]}+${domain}.${dateString}.${hourString}@${baseEmail.split('@')[1]}`;
}

// Function to save the generated alias to Chrome's storage
function saveAliasHistory(alias) {
    chrome.storage.sync.get({emailAliases: []}, function(data) {
        const updatedAliases = [alias, ...data.emailAliases].slice(0, 1000); // Keep only the latest 1000 entries
        chrome.storage.sync.set({emailAliases: updatedAliases});
    });
}

// Main function to find email input fields and fill them with the generated alias
function fillEmailInput() {
    chrome.storage.sync.get('baseEmail', function(data) {
        if (!data.baseEmail || data.baseEmail === "") {
            alert("Base email is not set. Please configure it in the extension options.");
            return;
        }

        const emailInputs = document.querySelectorAll('input[type="email"]');
        if (emailInputs.length === 0) {
            alert("No email input fields found.");
            return;
        }

        const domain = extractDomain(window.location.href);
        const alias = generateEmailAlias(data.baseEmail, domain);

        emailInputs.forEach(input => input.value = alias); // Fill each email input field with the generated alias

        // Save the generated alias for history tracking
        saveAliasHistory({alias: alias, date: new Date().toISOString()});
    });
}

// Execute the main function when the script is injected
fillEmailInput();
