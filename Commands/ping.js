const discord = require('discord.js');
const {prefix, token} = require('../config.json');

module.exports = {
    name: 'ping',
    aliases: [
        '', '!'
    ],
    description: 'Ping!',
    args: false,
    execute(message, args)
    {
        let embed = new discord.RichEmbed({
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            description: 'Pong!',
            fields: [
                {
                    name: `Alias, ${this.name}`,
                    value: `Usage: ${prefix}${this.name}`
                },
                {
                    name: `Alias, ${this.aliases[0]}`,
                    value: `Usage: ${prefix}${this.aliases[0]}`
                },
                {
                    name: `Alias, ${this.aliases[1]}`,
                    value: `Usage: ${prefix}${this.aliases[1]}`
                }
            ],
            timestamp: new Date(),
            color: 16711422,
        });
        message.channel.send('', embed);
    }
};