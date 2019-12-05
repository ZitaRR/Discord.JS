const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();
client.commands = new discord.Collection();
const {prefix, token} = require('./config.json');
const users = require('C:/Users/haegg/Desktop/Code/JavaScript/Discord.JS/user.js');

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
    if(command.args && !args.length)
        return message.reply(`you must provide arguments for this command!`);
    
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