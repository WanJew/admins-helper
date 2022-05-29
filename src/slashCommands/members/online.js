

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    slashCommand: new SlashCommandBuilder()
    .setName('online')
    .setDescription('онлайн сервера Winslow')
}