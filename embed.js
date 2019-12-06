const discord = require('discord.js');
const {color, error_color} = require('./config.json');

function Embed(){}
function date(){
    return new Date();
}

Embed.errorEmbed = function(error, message, args){
    desc = "";
    args.forEach(element => {
        desc += `${element.name}: ${element.summary} ` + (element.optional ? '(Optional)\n':'\n');
    });
    return new discord.RichEmbed({
        author: {name: `${error}`},
        description: `\`\`\`${message}\`\`\`\n${desc}`,
        color: error_color,
        timestamp: date()
    });
}

module.exports = Embed;