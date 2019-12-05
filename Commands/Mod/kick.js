module.exports = 
{
    name: 'kick',
    aliases: [
        'boot', 'remove', 'ban'
    ],
    description: 'Kicks user.',
    args: false,
    execute(message, args)
    {
        var userjs =  require('C:/Users/haegg/Desktop/Code/JavaScript/Discord.JS/user.js');
        var users = userjs.users;
        message.channel.send('#: ' + users.length);
    }
}