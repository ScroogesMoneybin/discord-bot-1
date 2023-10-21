require('dotenv').config()
const {
    Client,
    GatewayIntentBits,
    Events,
    Collection
} = require('discord.js');
const { clientReadyHandler } = require('./events/ClientReady');

const {InteractionCreateHandler} = require('./events/interactionCreate.js')

const pingCommand = require('./commands/ping.js')
const forecastCommand = require('./commands/forecast')
const astroCommand = require('./commands/astro')

//need new instance of the Client class
const client = new Client({
    intents: [
        //websockets API connected as Gateway API
        GatewayIntentBits.Guilds
    ]
})

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forecastCommand.data.name, forecastCommand);
client.commands.set(astroCommand.data.name, astroCommand);


//Client is an event emitter so it responds to events client.once() is event happens once, client.on() if event happens multiple times
//since everything happening in discord servers is an event like reactions and everything else, we use client.on().
//listening to ready event with callback function:
//only trigger clientReady once
client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, InteractionCreateHandler);

client.login(process.env.DISCORD_TOKEN);
