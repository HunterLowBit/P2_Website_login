// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID ="AC29b48ab76951c9e9ab05d6f5d7d8478b";
const authToken =process.env.TWILIO_AUTH_TOKEN = "2cb5c0b59a0c2a2d95fe121b5a668c7c";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+13159152539',
     to: '+5521974370384'
   })
  .then(message => console.log(message.sid));