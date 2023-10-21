const {SlashCommandBuilder} = require('discord.js');

//data constant
const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

    //interaction object as parameter of execute function
const execute = async (interaction) => await interaction.reply('Pong');

//we have to register each command like "ping" with discord

module.exports = {
    data,
    execute
}
