/*const requestCfg = require('../../utils/index').requestConfig;

exports.getInfo = async(client, message) => {
    const config = requestCfg[message.guild.id];
    if(!config) return;

    for (var i in config.tags) {
        var roleid = config.rolesByTags[tags[i].toUpperCase()]
        var role = message.guild.roles.cache.find(r => r.id == roleid);
    }
}*/