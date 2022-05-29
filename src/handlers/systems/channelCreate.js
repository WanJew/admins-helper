const { MessageEmbed } = require('discord.js');
exports.channelCreate = async (client, channel) =>{
    const entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first());
    let member = await channel.guild.members.cache.get(entry.executor.id);
    if (member.user.bot) return
    client.channels.cache.get('893012931724316686').send({
        embeds: [new MessageEmbed()
            .setTitle("✅ Создан канал")
            .setColor('#6DCF42')
            .addFields(
                { name: "Пользователь", value: `${member.user} (\`${member.user.id}\` / \`${member.user.tag}\`)`},
                { name: "Созданный канал", value:  `**${entry.target.name}** (\`${entry.id}\`)`}
            )
            .setTimestamp()
        ]
    })
}