// content-scripts/content-scripts.js

// Function to extract the domain name without subdomains
function extractDomain(url) {
    const hostname = new URL(url).hostname;
    // Find & remove protocol (http, ftp, etc.) and get hostname
    const domainParts = hostname.split('.').slice(-2); // Assuming TLDs without subdomains
    return domainParts.join('.');
}

// Function to generate email alias
function generateEmailAlias(baseEmail, domain) {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('en-GB').replace(/\//g, '');
    const hourString = currentDate.toLocaleTimeString('en-GB', {hour12: false}).replace(/:/g, '').slice(0, 4);
    return `${baseEmail.split('@')[0]}+${domain}.${dateString}.${hourString}@${baseEmail.split('@')[1]}`;
}

// Main function to find email input and fill it with the alias
function fillEmailInput() {
    chrome.storage.sync.get('baseEmail', function(data) {
        if (!data.baseEmail) {
            alert("Base email is not set.");
            return;
        }

        const emailInputs = document.querySelectorAll('input[type="email"]');
        const domain = extractDomain(window.location.href);

        if (emailInputs.length > 0) {
            const alias = generateEmailAlias(data.baseEmail, domain);
            emailInputs.forEach(input => {
                input.value = alias;
            });
        } else {
            alert("No email input fields found.");
        }
    });
}

// Execute the main function when the script is injected
fillEmailInput();
