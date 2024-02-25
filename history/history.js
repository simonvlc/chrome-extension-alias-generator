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
                    const aliasElement = document.createElement('p');
                    aliasElement.textContent = alias.alias;
                    historyElement.appendChild(aliasElement);
                });
            });
        } else {
            historyElement.textContent = 'No aliases have been generated yet.';
        }
    });
});
