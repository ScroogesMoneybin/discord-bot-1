const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {fetchForecast} = require('../requests/forecast')

const data = new SlashCommandBuilder()
    .setName('astro')
    .setDescription('Replies with astronomical info')
    .addStringOption(option => {
        return option.setName('location').setDescription('Location can be a city, zip/postal code, or latitude and longitude.').setRequired(true)
    })
    


const execute = async interaction => {
    //we use deferReply and not rreply, because reply requires a reponse within 3 seconds or times out. deferReply gives 15 minutes for a reply before timing out
    await interaction.deferReply();

    const location = interaction.options.getString('location');

   try {
    const {weatherData, locationName} = await fetchForecast(location);
    //use embed feature from Discord to display the info in Discord 
    const embed = new EmbedBuilder()    
    .setColor(0x3f704d)
    .setTitle(`${locationName} astronomical forecast`)
    .setTimestamp()
    .setFooter({
        text: 'From weatherapi.com'
    });

    for (const day of weatherData) {

        embed.addFields({
            name: day.date,
            value: `Sunrise: ${day.sunriseTime}\nSunset: ${day.sunsetTime}\nMoonrise: ${day.moonriseTime}\nMoonset: ${day.moonsetTime}`
        })
    }

    //we deferred reply at start of funtion and now edit that reply with an array of the embeds
    await interaction.editReply({
        embeds: [embed]
    })
   } catch (err) {
    await interaction.editReply(err)
   }
}

module.exports = {
    data,
    execute
}