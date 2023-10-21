const InteractionCreateHandler = async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);

        console.log(`${interaction.user.username} used command ${interaction.commandName}`)
    } catch (error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: "There was an  error executing this command!",
            ephemeral: true
            //ephemeral flag marks message to only be sent to one user, not whole group
        });            
        } else {
            await interaction.reply({
                content: "There was an  error executing this command!",
                ephemeral: true
            })
        }
    }
    
}

module.exports = {
    InteractionCreateHandler,
}