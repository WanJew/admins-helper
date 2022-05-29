let { slashCommand } = require('../handlers/systems')

module.exports = async (client, interaction) =>{
    await slashCommand(client, interaction)
}