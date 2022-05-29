'use strict';

const { Client, Intents, Collection } = require('discord.js');
const mongoose = require('mongoose');
const config = require('../config.js');
const fs = require('fs');
const ascii = require("ascii-table");

let test = true

class bot extends Client {
    constructor() {
        super({ intents: [new Intents(32767)] });

        this.commands = new Collection()
        this.aliases = new Collection()
    }

    async login() {
        this.config = config;

        super.login(config.token)
    }

    async eventsHandler() {
        fs.readdirSync('./src/events/').filter(name => name.endsWith('.js')).forEach(file => {
            var event = require(`../events/${file}`);
            var eventName = file.split('.js')[0];
            this.on(eventName, event.bind(null, this));
        
            console.log(`[☑️ | Events]: ${eventName} успешно загружен!`)
        });
    }

    async loadSlashCommand(slashCommand){
        let command = this.application.commands.cache.find(cmd => cmd.name == slashCommand.name)
        console.log(this.application.commands.fetch())
        if (command){
            await command.delete()
        }
        await this.application.commands.create(slashCommand, '772869388147490846')
    }


    async checkSlashCommand() {
        await this.application.commands.fetch()
        let table = new ascii("Загрузка slash");
        table.setHeading('Категория', "Команда", "Статус загрузки");
    
        fs.readdirSync("./src/slashCommands/").forEach(async dir => {
            const commands = fs.readdirSync(`./src/slashCommands/${dir}/`).filter(file => file.endsWith(".js"));
            for (let file of commands) { 
                let pull = require(`../slashCommands/${dir}/${file}`);
                this.commands.set(pull.slashCommand, pull);
                if (pull.slashCommand){
                    this.loadSlashCommand(pull.slashCommand)
                    table.addRow(dir, file, 'Загружена');
                } else {
                    table.addRow(dir, file, 'Ошибка, файл не был загружен.');
                }
            }
        })
        console.log(table.toString())
    }

    async mongoConnect() {
        this.config = config;

        mongoose.connect(config.mongoUrl, { 
            useUnifiedTopology: true,
            useNewUrlParser: true,
          });
          mongoose.connection.on('connected', () => {
              console.log(`[☑️ | DataBase]: База Mongo успешно подключена!`)
          })
    }
}

module.exports = { bot }