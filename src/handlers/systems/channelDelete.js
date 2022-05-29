const { MessageEmbed } = require('discord.js');

exports.channelDelete = async (client, channel) =>{
    const entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first());
    let member = await channel.guild.members.cache.get(entry.executor.id);
    if (member.user.bot) return
    client.channels.cache.get('893012931724316686').send({
        embeds: [new MessageEmbed()
            .setTitle("❌ Удален канал")
            .setColor('#FA4848')
            .addFields(
                { name: "Пользователь", value: `${member.user} (\`${member.user.id}\` / \`${member.user.tag}\`)`},
                { name: "Удаленный канал", value:  `**${entry.target.name}** (\`${entry.id}\`)`}
            )
            .setTimestamp()
        ]
    })
}