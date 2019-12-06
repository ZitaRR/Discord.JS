const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();
client.commands = new discord.Collection();
const {prefix, token} = require('./config.json');
const users = require('./user.js');
const embeds = require('./embed.js');

var dirsRecursive = function(dir, filelist)
{
    files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file)
    {
        if(fs.statSync(dir + '/' + file).isDirectory())
            filelist = dirsRecursive(dir + '/' + file , filelist);
        else if(file.endsWith('.js'))
            filelist.push(dir + '/' + file)
    });
    return filelist;
}

const commands = dirsRecursive('./Commands', [])

for(const file of commands)
{
    const command = require(file);
    client.commands.set(command.name, command);
    command.aliases.forEach(alias => 
        {
            client.commands.set(alias, command);
        });
}

client.on('ready', () => 
{
    users.init();
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => 
{
    users.getOrCreateUser(message.author).rep++;
    users.save();

    if(!message.content.startsWith(prefix) || message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const name = args.shift().toLowerCase();

    if(!client.commands.has(name))
        return;
    
    const command = client.commands.get(name);
    console.log(command.argsInfo.filter(element => element.optional === true).length);
    if(command.args && !args.length)
        return message.channel.send('', embeds.errorEmbed('Missing Arguments', 'You must provide arguments for this command!', command.argsInfo));
    
    try
    {
        command.execute(message, args);
    }
    catch(error)
    {
        console.error(error);
        message.reply('an error occured during execution.');
    }
});

client.login(token);