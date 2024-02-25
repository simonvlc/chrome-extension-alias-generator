document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('emailForm').addEventListener('submit', saveOptions);

function loadOptions() {
    // Load the currently saved base email from Chrome's storage and set it in the input field
    chrome.storage.sync.get('baseEmail', function(data) {
        document.getElementById('baseEmail').value = data.baseEmail || '';
    });
}

function saveOptions(e) {
    e.preventDefault();
    const baseEmail = document.getElementById('baseEmail').value;
    if (baseEmail) {
        // Save the base email to Chrome's storage
        chrome.storage.sync.set({baseEmail: baseEmail}, function() {
            // Notify the user that the email was saved
            alert('Base email address saved.');
        });
    } else {
        alert('Please enter a valid email address.');
    }
}
