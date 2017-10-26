// Need to tie this in with a post method and add it to the server or make it modular

const accountSid = 'AC82714f4088040acc97f9e7804e157cd4';
const authToken = '5e09260a26c7e7c22ad97f06240426ab';
const Twilio = require('twilio');
const client = new Twilio(accountSid, authToken);

client.calls.create({
    url: "https://dafb4127.ngrok.io/voice",
    to: "+16132659416",
    from: "+16137776522"
}, function(err, call) {
    process.stdout.write(call.sid);
});
