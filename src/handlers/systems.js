let { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const axios = require('axios');
const { use } = require('express/lib/application');


class Systems{
    buttons = async (client, interaction) =>{
        if (interaction.isButton()){
            if (interaction.customId == 'backRole'){
                
            }
        }
    }
    slashCommand = async (client, interaction) =>{
        let { commandName } = interaction
        if (commandName == 'members'){
            interaction.reply('Загрузка...')
            let frac = interaction.options.getString('фракция');
            let orgs = [
                { fraction: 'Los-Santos Police Department', id: 'LSPD', uId: '1' },
                { fraction: 'San-Fierro Police Department', id: 'SFPD', uId: '4' },
                { fraction: 'Las-Venturas Police Department', id: 'LVPD', uId: '23' },
                { fraction: 'Red-Country Sheriff\'s Department', id: 'RCSD', uId: '2' },
                { fraction: 'F.B.I', id: 'FBI', uId: '2' },
                { fraction: 'Los-Santos Medical Center', id: 'LSMC', uId: '5' },
                { fraction: 'San-Fierro Medical Center', id: 'SFMC', uId: '8' },
                { fraction: 'Las-Venturas Medical Center', id: 'LVMC', uId: '22' },
                { fraction: 'Тюрьма строгого режима LV', id: 'TCR', uId: '7' },
                { fraction: 'Армия LS', id: 'LSA', uId: '20' },
                { fraction: 'Армия SF', id: 'SFA', uId: '27' },
                { fraction: 'TV Студия LS', id: 'TVLS', uId: '10' },
                { fraction: 'TV Студия LV', id: 'TVLV', uId: '24' },
                { fraction: 'TV Студия SF', id: 'TVSF', uId: '26' },
                { fraction: 'Правительство LS', id: 'GOV', uId: '6' },
                { fraction: 'Автошкола SF', id: 'GCL', uId: '9' },
                { fraction: 'Центральный Банк', id: 'FRS', uId: '21' },
                { fraction: 'Страховая Компания', id: 'STK', uId: '29' },
                { fraction: 'Grove', id: 'Grove', uId: '11' },
                { fraction: 'Vagos', id: 'Vagos', uId: '12' },
                { fraction: 'Ballas', id: 'Ballas', uId: '13' },
                { fraction: 'Aztec', id: 'Aztec', uId: '14' },
                { fraction: 'Rifa', id: 'Rifa', uId: '15' },
                { fraction: 'Russian Mafia', id: 'RM', uId: '16' },
                { fraction: 'Yakuza', id: 'Yakuza', uId: '17' },
                { fraction: 'La Cosa Nostra', id: 'LCN', uId: '18' },
                { fraction: 'Warlock MC', id: 'Warlock', uId: '19' },
                { fraction: 'Night Wolves', id: 'NW', uId: '25' },
            ]
            let fractionId = 0;
            for (let i = 0; i < orgs.length; i++){
                if (frac == orgs[i].id){
                    fractionId = orgs[i].uId 
                }
            }
            let uri = `https://api.vprikol.tech/online?code=XdyzKDeIR0Wtmvx4qmQLT8FpCsfUgnHB&fraction_id=${fractionId}&server=14`
            let url = encodeURI(uri)
            await axios.get(url).then(async response =>{
                let data = response.data
                let deputies = []
                let leader = []
                for (let i = 0; i < data.players.length; i++){
                    if (data.players[i].rank == '9' || data.players[i].rank == '10'){
                        deputies.push({
                            rank: data.players[i].rank,
                            rankLabel: data.players[i].rankLabel,
                            nick: data.players[i].name, 
                            id: data.players[i].id,
                            isOnline: data.players[i].isOnline,
                        })
                    }
                }
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Система информации о организации`,
                    iconURL: client.user.displayAvatarURL(),
                    // url: `http://ulog.union-u.net/nickname.php?iddb=${deputies.find(m => m.rank == '10').id}&server=22`,
                })
                .setThumbnail(interaction.member.displayAvatarURL())
                .addFields(
                    { name: 'Название организации:', value: `\`${data.fractionLabel}\``, inline: true },
                    { name: 'Лидер организации:', value: `\`${data.leaderNick}\``, inline: true },
                    { name: 'Информация об организации:', value: `\`🟡 Всего членов фракции: ${data.totalPlayers}\n🟢 Онлайн фракции: ${data.totalOnline}\``},
                )
                .setColor('ORANGE')
                deputies.map(m => embed.addFields({ name: `${m.nick}`, value: `\`Ранг: ${m.rankLabel==null?'Не найден.':m.rankLabel} [${m.rank}]\nID: ${m.id==null?'Не найден.':`${m.id}`}\n${m.isOnline?'🟢 В сети':'🔴 Не в сети'}\``, inline: true }))
                interaction.editReply({
                    content: ' ',
                    embeds: [embed]
                })
            })
            .catch(async e =>{
                await interaction.reply({embeds: [new MessageEmbed().setTitle('Ошибка!').setColor('RED').setDescription(`\`\`\`${e}\`\`\``)]})
            })
        }
        if (commandName == 'check'){
            if (commandName == 'check'){
                function numberWithCommas(x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                let nickname = interaction.options.getString('никнейм');
                interaction.reply({
                    ephemeral: true,
                    embeds: [new MessageEmbed()
                        .setAuthor({
                            name: `Поиск пользователей в базе данных Arizona RP`,
                            iconURL: client.user.displayAvatarURL(),
                        })
                        .setDescription(`**⌛ Идет поиск в БД по нику ${nickname}**`)
                        .setColor('ORANGE')
                    ]
                })
                let uri = `https://api.vprikol.tech/find?token=XdyzKDeIR0Wtmvx4qmQLT8FpCsfUgnHB&server=14&nick=${nickname}`
                let url = encodeURI(uri)
                let nick = nickname.replace('_', ' ')
                await axios.get(url).then(async response =>{
                    let data = response.data
                    if (data == 'Internal Server Erorr'){
                        let embed = new MessageEmbed()
                        .setAuthor({
                            name: `Поиск пользователей в базе данных Arizona RP`,
                            iconURL: client.user.displayAvatarURL(),
                        })
                        .setColor('RED')
                        embed.setDescription(`**❌ Проблема на стороне API. Проверьте пользователя самостоятельно через сайт.**\n\`\`\`${error}\`\`\``)
                        return interaction.reply({
                            embeds: [embed]
                        })
                    }
                    let user = interaction.member.guild.members.cache.find(user => user.displayName.toLowerCase().includes(nickname.toLowerCase()) || user.displayName.toLowerCase().includes(nick.toLowerCase()))
                    await interaction.channel.send({
                        content: ' ',
                        embeds: [new MessageEmbed()
                            .setAuthor({
                                name: `Поиск пользователей в базе данных Arizona RP`,
                                iconURL: client.user.displayAvatarURL(),
                            })
                            .setDescription(`**「✅」: Модератор: ${interaction.member}\n「❓」: Предположительный DISCORD: ${user?user:'Не найден.'}\n\n「🌹」: Ник-нейм: \`${nickname}\`\n「✉️」: Статус: \`${data.isOnline?'🟢 В сети':'🔴 Не в сети'}\`\n「✨」: Уровень аккаунта: \`${data.lvl}\`\n「💵」: Наличных денег: \`$${numberWithCommas(data.cash)}\`\n「🏦」: Денег в банке: \`$${numberWithCommas(data.bank)}\`\n「💸」: Депозит: \`$${numberWithCommas(data.deposit)}\`\n「⚒️」: Работа: \`${data.work}\`\n「⛏️」: Организация: \`${data.org==null?'Отсутствует':`${data.org} [${data.rank}]`}\`\n「💎」: Статус VIP: \`${data.vip==null?'Отсутствует':`${data.vip}`}\`**`)
                            .setColor('GREEN')
                        ]
                    })
                    return
                }).catch(error => {
                    let embed = new MessageEmbed()
                    .setAuthor({
                        name: `Поиск пользователей в базе данных Arizona RP`,
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .setColor('RED')
                    if (error == 'Error: Request failed with status code 404'){
                        embed.setDescription(`**❌ Пользователь ${nickname} не был найден в базе данных.**`)
                    } else {
                        embed.setDescription(`**❌ Проблема на стороне API. Проверьте пользователя самостоятельно через сайт.**\n\`\`\`${error}\`\`\``)
                    }
                    console.log(error)
                    interaction.channel.send({
                        embeds: [embed]
                    })
                })
            }
        }
        if (commandName == 'notif'){
            let msg = interaction.options.getString('комментарий');
            let user = interaction.options.getUser('пользователь');
            let embed = new MessageEmbed()
            .setAuthor({
                name: `Личное уведомление от администратора ${interaction.member.displayName}`,
                iconURL: client.user.displayAvatarURL(),
            })
            .setColor('ORANGE')
            .addFields(
                { name: '> Администратор', value: `${interaction.member}`, inline: true },
                { name: '> Пользователь', value: `${user}`, inline: true },
                { name: '> Сообщение', value: `\`\`\`${msg}\`\`\`` },
            )
            user.send({
                embeds: [embed]
            }).catch(e => interaction.channel.send(`Ошибка отправки сообщения.\n\`\`\`${e}\`\`\``))
            interaction.reply({content: 'Отправлено!', ephemeral: true, embeds: [embed]}).catch(e => interaction.channel.send(`Ошибка отправки сообщения.\n\`\`\`${e}\`\`\``))
        }
        if (commandName == 'rrole'){
            let user = interaction.options.getUser('пользователь');
            let member = interaction.member.guild.members.cache.get(user.id)
            let length = member._roles.length
            let roles = []
            for (let i = 0; i < member._roles.length; i++){
                roles.push(member._roles[i])
                member.roles.remove(member._roles[i])
            }
            interaction.reply({
                content: `Пользователю ${user} было снято \`${length} ролей.\``,
                // components: [new MessageActionRow()
                //     .addComponents(
                //         [new MessageButton()
                //             .setCustomId('backRole')
                //             .setLabel('Вернуть роли')
                //             .setStyle('SUCCESS')
                //         ]
                //     )
                // ]
            })
        }
        if (commandName == 'run'){
            if (interaction.member.id == '511116975456387092'){
                let code = interaction.options.getString('код');
                try {
                    eval(code)
                } catch (error) {
                    console.log(error)
                }
            } else return interaction.reply({content: 'Не-а.', ephemeral: true})
        }
        if (commandName == 'online'){
            const guild = await client.guilds.cache.get('772869388147490846')
            const fetch = require("node-fetch");
            const fetchedData = await fetch("https://arizona-ping.react.group/desktop/ping/Arizona/ping.json").then((res) => res.json());
            const serverinfo = fetchedData.query.find(x => x.number == '14')

            await interaction.reply({ embeds: [new MessageEmbed()
                .setAuthor({
                    name: `Информация о сервере Arizona RP Winslow`,
                    iconURL: client.user.displayAvatarURL(),
                  })
                .setColor('GREEN')
                .setThumbnail(guild.iconURL())
                .setTimestamp()
                .setFooter('Последнее обновление')
                .setDescription(`**Общий онлайн: \`${serverinfo.online}/1000\`\nIP: ${serverinfo.ip}:${serverinfo.port}**`)
            ] });
        }
    }
}

module.exports = new Systems()