const {embed} = require('../../struct/Base/Embeds')
exports.botMention = async (client, message) =>{
    let member = message.mentions.users.first()
    if (member.id == '940609279205994506'){
        embed({message, title: 'Winslow Illegals', emoji: '✅', content: `У нас все стабильно!**\n**⚒️ Задержка: ${Date.now() - message.createdTimestamp}ms. Задержка API: ${Math.round(client.ws.ping)}ms**\n**Разработчик: [William Waysmann](https://vk.com/id346256317)**\n\n**Статус бота: \`/status\``})
    }
}