const fs = require('fs');
const ical = require('node-ical');

const suspensionFile = 'index.html';
const icsFile = 'grizzlies.ics'; // Path to your local .ICS file

// Update the suspension countdown
function updateSuspensionCountdown() {
    fs.readFile(icsFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading .ICS file:', err);
        } else {
            // Parse the .ICS data
            const parsedData = ical.parseICS(data);

            // Implement your logic to calculate the remaining games based on events
            const gamesLeft = calculateRemainingGames(parsedData);
            if (gamesLeft < 0) { gamesLeft = 0; }

            // Update the HTML file with the new suspension countdown
            updateSuspensionHTML(gamesLeft);

            console.log(`Updated suspension countdown: ${gamesLeft} games left.`);
        }
    });
}

// Calculate the remaining games until suspension is over (your custom logic)
function calculateRemainingGames(parsedData) {
    // Implement your custom logic to determine the number of games left in the suspension
    // For example, you can count the upcoming games in the parsed data.
    const today = new Date();
    const playedGames = Object.values(parsedData).filter(event => event.start <= today).length;

    // Subtract the number of upcoming games from the total suspension games
    const totalSuspensionGames = 25; // Adjust to the actual suspension length
    return totalSuspensionGames - playedGames;
}

// Update the suspension countdown in the HTML file
function updateSuspensionHTML(gamesLeft) {
    fs.readFile(suspensionFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading suspension HTML file:', err);
        } else {
            const updatedHTML = data.replace(/<span id="gamesLeft">(\d+)<\/span>/, `<span id="gamesLeft">${gamesLeft}</span>`);

            fs.writeFile(suspensionFile, updatedHTML, 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing updated suspension HTML file:', writeErr);
                }
            });
        }
    });
}

// Call the function to update the suspension countdown
updateSuspensionCountdown();