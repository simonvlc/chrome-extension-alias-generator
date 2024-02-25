document.addEventListener('DOMContentLoaded', function() {
    const historyElement = document.getElementById('aliasHistory');

    chrome.storage.sync.get('emailAliases', function(data) {
        if (data.emailAliases && data.emailAliases.length > 0) {
            const groupedByDate = data.emailAliases.reduce((acc, alias) => {
                const date = new Date(alias.date).toLocaleDateString();
                if (!acc[date]) acc[date] = [];
                acc[date].push(alias);
                return acc;
            }, {});

            Object.keys(groupedByDate).forEach(date => {
                const dateElement = document.createElement('h2');
                dateElement.textContent = date;
                historyElement.appendChild(dateElement);

                groupedByDate[date].forEach(alias => {
                    const aliasElement = document.createElement('div'); // Use a div to contain both the email and the copy button
                    aliasElement.className = 'email-entry';

                    const emailText = document.createElement('span');
                    emailText.textContent = alias.alias;
                    aliasElement.appendChild(emailText);

                    const copyButton = document.createElement('button');
                    copyButton.textContent = 'Copy'; // Or use an icon here
                    copyButton.onclick = function() {
                        navigator.clipboard.writeText(alias.alias).then(() => {
                            const originalText = copyButton.textContent; // Save the original button text
                            copyButton.textContent = 'Copied!'; // Change the button text to "Copied!"
                            copyButton.disabled = true; // Optional: disable the button to prevent multiple clicks
                    
                            setTimeout(() => {
                                copyButton.textContent = originalText; // Revert to the original text after 2 seconds
                                copyButton.disabled = false; // Re-enable the button
                            }, 2000); // Time in milliseconds (2000ms = 2s)
                        }, (err) => {
                            console.error('Error copying email address to clipboard', err);
                        });
                    };
                    aliasElement.appendChild(copyButton);

                    historyElement.appendChild(aliasElement);
                });
            });
        } else {
            historyElement.textContent = 'No aliases have been generated yet.';
        }
    });
});
