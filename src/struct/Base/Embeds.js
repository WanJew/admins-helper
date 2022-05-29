const { MessageEmbed } = require("discord.js");
let red = "#FA4848"
let miroshhhhhaGENUIS = 'by w.waysmann'
const Moderator = require('../../models/moderator.js')

exports.embed = ({ message, color = '#eb9d38', emoji = '🌙', title = 'Уведомление', content = '', time = ''}) => {
    if (!time){
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle(`${emoji} ${title}`)
                .setDescription(`**${content}**`)
                .setColor(color) 
                .setTimestamp() 
                .setFooter(miroshhhhhaGENUIS, message.client.user.displayAvatarURL())
            ]
        })        
    } else {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle(`${emoji} ${title}`)
                .setDescription(`**${content}**`)
                .setColor(color) 
                .setTimestamp() 
                .setFooter(miroshhhhhaGENUIS, message.client.user.displayAvatarURL())
            ]
        }).then((msg) => { setTimeout(() => msg.delete(), time); });
    }
}

exports.error = ({ message, color = red, emoji = '❌', content, time = 30000, title = 'Ошибка в написании команды' }) => {
    message.channel.send({ embeds: [new MessageEmbed()
        .setColor(color) 
        .setTimestamp() 
        .setTitle(`${emoji} ${title}`) 
        .setDescription(`**${content}**`) 
        .setFooter(miroshhhhhaGENUIS, message.client.user.displayAvatarURL())
    ] }).then((msg) => { setTimeout(() => msg.delete(), time); });
}

exports.errorCmd = ({ message, color = red, emoji = '❌', content, time = 30000, title = 'Ошибка в написании команды', cmd = '', args1 = '', args2 = '', args3 = '', args1_text = '', args2_text = '', args3_text = '' }) => {
    message.reply({ embeds: [new MessageEmbed()
        .setColor(color) 
        .setTitle(`${emoji} ${title}`) 
        .setDescription(`**Используйте:**\n\`/${cmd} [${args1}] ${args2?`[${args2}]`:''} ${args3?`[${args3}]`:''}\`\n\n**Аргументы:**\n\`${args1}\` **:** ${args1_text}${args2?`\n\`${args2}\` **:** ${args2_text}`:''}${args3?`\n\`${args3}\` **:** ${args3_text}`:''}`) 
        .setFooter(miroshhhhhaGENUIS, message.client.user.displayAvatarURL())
    ] }).then((msg) => { setTimeout(() => msg.delete(), time); });
}


exports.moderSnat = async (client, message, moderator) =>{      
    let moder = await Moderator.findOne({ userId: moderator.id });
    if (!moderator || !moder) return
    let norma = 3
    client.channels.cache.get('893012931724316682').send({
        embeds: [new MessageEmbed()
            .setTitle(`❌ Снятие модератора ${moder.nickname}`)
            .setColor(red)
            .setDescription('\`Сводка по наказаниям: [всего] [за неделю]\`')
            .setThumbnail(moderator.displayAvatarURL())
            .setTimestamp()
            .addFields(
                { name: 'Должность модератора:', value: `\`${moder.level == '1'?'Модератор чата':moder.level == '2'?'Поддержка Discord':moder.level == '3'?'Куратор модерации':moder.level == '4'?'Зам. Главного Модератора':moder.level == 5?'Главный Модератор':moder.level == 6?'Руководство DISCORD':'Не найдено ❌'} [${moder.level}]\``, inline: true},
                { name: 'Количество иммунитетов:', value: `\`${moder.imunki}\``, inline: true },
                { name: 'Количество выговоров:', value: `\`${moder.warns} из 3\``, inline: true },
                { name: 'Множитель баллов:', value: `\`x${moder.ball_x2 == true?'2':'1'}\``, inline: true },
                { name: 'Оценки в тикетах:', value: `\`👍 ${moder.ticket_good} | 👎 ${moder.ticket_bad}\``, inline: true },
                { name: 'Еженедельная норма:', value: `\`${moder.week_ball < norma?'❌ Не выполнена':'✅ Выполнена'} [${Number(moder.week_ball).toFixed(2)}]\``, inline: true },
                { name: 'Неактив модератора:', value: `\`${moder.isNonActive == false?'❌ Отсутствует':`✅ Присутствует`}\``, inline: true },
            )
            .setFooter(miroshhhhhaGENUIS)
        ]
    })
}

exports.historyDB = async (moder, args) =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let hh = today.getHours()
    let min = today.getMinutes()

    today = `${dd}.${mm}.${yyyy} | ${hh}:${min}`;
    moder.history.push(`[${today}] ${args}`)
}