let { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    slashCommand: new SlashCommandBuilder()
    .setName('notif')
    .setDescription('уведомление пользователю в ЛС')
    .addUserOption(option => option.setRequired(true).setName('пользователь').setDescription('пользователь, которому будет отправлено сообщение'))
    .addStringOption(option => option.setName('комментарий').setDescription('сообщение').setRequired(true))
}