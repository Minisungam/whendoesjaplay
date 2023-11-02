<picture>
  <img src="https://cdn.nba.com/headshots/nba/latest/260x190/1629630.png" alt="The NBA headshot of Ja Morant">
</picture>

# When Does Ja Play?

An extremely simple Netlify app that counts down the amount of games left in Ja Morant's 25 game suspension.

## Current features:

Currently this app consists of 2 main entities.

1. The static webpage
2. A function (Lambda) fetched by the webpage that gives the amount of days left

## Things to Note

The app currently functions by reading a calendar file of the Memphis Grizzlies games and subtracts the amount of games that have passed from the total amount suspension games.

**THIS MAY NOT BE ACCURATE**

The NBA may change the schedule, in which case I'll do my best to update the calendar file promptly, and the NBA may change the suspension length or may not immediately release him after the amount of days are over.

## Local Install

1. `git clone https://github.com/Minisungam/whendoesjaplay.git`
2. `cd whendoesjaplay`
3. `npm install`
4. `netlify dev`

## Netlify Install

1. Clone or fork this repo
2. Sign up or login to [Netlify](https://www.netlify.com/)
3. Connect the repo to Netlify
4. Let it build and you're good to go!
