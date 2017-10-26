# Ordo

## Getting Started
1. In order for the twilio in call features to work ngrok needs to be running. The url that ngrok produces needs to then be updated within twilio's website:  
https://www.twilio.com/console/phone-numbers/incoming
2. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
3. Run the server: `npm run local`
4. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
