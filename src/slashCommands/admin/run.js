

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    slashCommand: new SlashCommandBuilder()
    .setName('run')
    .setDescription('запуск кода')
    .addStringOption(option => option.setName('код').setDescription('код').setRequired(true))
}