const discord = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: [
        'boot', 'remove', 'ban'
    ],
    description: 'Kicks user.',
    args: true,
    argsInfo: [
        {
            name: 'User',
            summary: 'The user to kick.',
            type: discord.User,
            optional: false
        },
        {
            name: 'User2',
            summary: 'bblah',
            type: discord.User,
            optional: true
        },
        {
            name: 'User3',
            summary: 'bblahhhhh',
            type: discord.User,
            optional: true
        }
    ],
    execute(message, user){

    }
}