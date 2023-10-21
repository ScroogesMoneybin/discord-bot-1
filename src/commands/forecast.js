const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {fetchForecast} = require('../requests/forecast')

const data = new SlashCommandBuilder()
    .setName('forecast')
    .setDescription('Replies with weather forecast')
    .addStringOption(option => {
        return option.setName('location').setDescription('Location can be a city, zip/postal code, or latitude and longitude.').setRequired(true)
    })
    .addStringOption(option => {
        return option.setName('units').setDescription('Temperature can be Fahrenheit or Celsius.').setRequired(false)
        .addChoices(
            {name: 'Celsius', value: 'C'},
            {name: 'Fahrenheit', value: 'F'}
        )
    })


const execute = async interaction => {
    //we use deferReply and not rreply, because reply requires a reponse within 3 seconds or times out. deferReply gives 15 minutes for a reply before timing out
    await interaction.deferReply();

    const location = interaction.options.getString('location');
    const temperatureUnits = interaction.options.getString('units') || 'F';
    const isImperial = temperatureUnits ==='F';  /*returns boolean */

   try {
    const {weatherData, locationName} = await fetchForecast(location);
    //use embed feature from Discord to display the info in Discord 
    const embed = new EmbedBuilder()    
    .setColor(0x3f704d)
    .setTitle(`${locationName} weather forecast`)
    .setDescription(`Using the ${temperatureUnits} system`)
    .setTimestamp()
    .setFooter({
        text: 'From weatherapi.com'
    });

    for (const day of weatherData) {
        const tempMin = isImperial ? day.tempMinF : day.tempMinC;
        const tempMax = isImperial ? day.tempMaxF : day.tempMaxC;

        embed.addFields({
            name: day.date,
            value: `Low: ${tempMin}°, High: ${tempMax}°`
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