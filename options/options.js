document.addEventListener('DOMContentLoaded', function() {
    // Load existing base email if present
    chrome.storage.sync.get('baseEmail', function(data) {
        document.getElementById('baseEmail').value = data.baseEmail || '';
    });
});

document.getElementById('saveEmail').addEventListener('click', function() {
    const baseEmail = document.getElementById('baseEmail').value;
    // Basic validation
    if (baseEmail && baseEmail.includes('@')) {
        chrome.storage.sync.set({'baseEmail': baseEmail}, function() {
            alert('Base email address saved.');
        });
    } else {
        alert('Please enter a valid email address.');
    }
});
