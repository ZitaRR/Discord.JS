const fs = require('fs');

function User(name, id){
    this.name = name;
    this.id = id;
    this.rep = 0;
};

User.instances = [];

User.init = function(){
    fs.readFile('C:/Users/haegg/Desktop/Code/JavaScript/Discord.JS/users.json', (err, data) => {
        if(err)
            throw err;
        content = "";
        for(var i = 0; i < data.length; i++){
            content += String.fromCharCode(parseInt(data[i]));
        }
        if(content.length > 1)
            this.instances = JSON.parse(content);
    });
    console.log("User module ready.");
}

User.save = function(){
    result = "";
    fs.readFile('C:/Users/haegg/Desktop/Code/JavaScript/Discord.JS/users.json', (err, data) => {
        if(err)
            throw err;
        fs.writeFile('C:/Users/haegg/Desktop/Code/JavaScript/Discord.JS/users.json', JSON.stringify(this.instances), (err, data) => {
            if(err)
                throw err;
        });
    });
}

User.createUser = function(discordUser){
    let newUser = new User(discordUser.username, discordUser.id);
    this.instances.push(newUser);
    this.save();
    return newUser;
}

User.getOrCreateUser = function(discordUser){
    var user = this.instances.find(element => element.id === discordUser.id)
    if(user != undefined)
        return user;
    return this.createUser(discordUser);
}

User.prototype.info = function(){
    return `Name: ${this.name}, ID: ${this.id}, Index: ${User.instances.length}`;
}

module.exports = User;