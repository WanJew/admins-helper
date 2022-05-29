

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    slashCommand: new SlashCommandBuilder()
    .setName('check')
    .setDescription('проверка пользователя')
    .addStringOption(option => option.setName('никнейм').setDescription('никнейм проверяемого').setRequired(true))
}