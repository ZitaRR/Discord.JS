module.exports = 
{
    name: 'ping',
    aliases: [],
    description: 'Ping!',
    args: false,
    execute(message, args)
    {
        message.channel.send('Pong!');
    }
};