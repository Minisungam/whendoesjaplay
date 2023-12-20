const fs = require('fs').promises;
const ical = require('node-ical');

const icsFile = './grizzlies.ics';

const handler = async (event) => {
  try {
    const daysLeft = await updateSuspensionCountdown();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: daysLeft }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };

// Update the suspension countdown
async function updateSuspensionCountdown() {
  try {
    const data = await fs.readFile(icsFile, 'utf8');
    // Parse the .ICS data
    const parsedData = ical.parseICS(data);

    let gamesLeft = calculateRemainingGames(parsedData);
    if (gamesLeft < 0) {
      gamesLeft = 0;
    }

    console.log(`Updated suspension countdown: ${gamesLeft} games left.`);
    return gamesLeft;
  } catch (err) {
    console.error('Error reading .ICS file:', err);
    throw err; // Rethrow the error to be caught in the calling function
  }
}

// Calculate the remaining games until suspension is over
function calculateRemainingGames(parsedData) {
  const today = new Date();
  const playedGames = Object.values(parsedData).filter((event) => event.start <= today).length;

  // Subtract the number of played games from the total suspension games
  const totalSuspensionGames = 23;
  return totalSuspensionGames - playedGames;
}
