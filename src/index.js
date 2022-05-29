const { bot } = require('./struct/Client');
const client = new bot();

client.login();
client.eventsHandler();
client.mongoConnect();