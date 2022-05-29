

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    slashCommand: new SlashCommandBuilder()
    .setName('rrole')
    .setDescription('снять все роли пользователю')
    .addUserOption(option => option.setName('пользователь').setDescription('пользователь, роли которого будут сняты').setRequired(true))
}