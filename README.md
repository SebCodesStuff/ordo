## Getting Started
1. In order for the twilio in call features to work ngrok needs to be running. The url that ngrok produces needs to then be updated within twilio's website:  
https://www.twilio.com/console/phone-numbers/incoming
2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
3. Update the .env file with your correct local information
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
7. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
8. Run the server: `npm run local`
9. Visit `http://localhost:8080/`

## Login information
1. To login as a customer use:
  email:      haha@gmail.com
  password:   000000
2. To login as a restaurant use:
  email:      RedLobster.com
  password:   000001

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
