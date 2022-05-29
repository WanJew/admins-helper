const { MessageEmbed } = require("discord.js");
let {
    onlineUpdate,
} = require('../handlers/systems')
module.exports = async(client) => {
    
    setTimeout(() => {
        client.user.setActivity(`своего хозяна :)`, { type: 'LISTENING', });
    }, 2000);
    client.user.setStatus('idle')
    client.checkSlashCommand()
    console.log(`[☑️ | Client]: ${client.user.tag} успешно авторизован!`)
    // onlineUpdate(client)
}