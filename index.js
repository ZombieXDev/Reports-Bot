const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('Server is Started');
});

const Discord = require('discord.js');
const client = new Discord.Client();
const setting = require('./setting.json')
client.on("ready", () => {
  console.log(`[ - Bot is Online - ]`);
  console.log(`Name Bot : ${client.user.username}`);
  console.log(`Guilds : ${client.guilds.cache.size}`);
  console.log(`Users : ${client.users.cache.size}`);
  console.log(`Channels : ${client.channels.cache.size}`);
  client.user.setActivity(`${prefix}report in dm me`, {
    type: "PLAYING"
  });
});
const prefix = setting.prefix;
const rch = setting.reportch;
client.on('message', message => {
  if (message.channel.type == "dm") {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + "report")) {
      const args = message.content.split(" ")
      const des = args.slice(1).join(" ")
      const ch = client.channels.cache.get(rch)

const embed = new Discord.MessageEmbed()
.setTitle("New Report !")
.setColor("BLUE")
.setThumbnail(message.author.avatarURL())
.setDescription(`
**Message :**
\`\`\`
${des}
\`\`\`
`)
.addField("Username", message.author.username, false)
.addField("ID", message.author.id, false )
.setTimestamp() 
ch.send(embed)
message.author.send("**Your Report Has been sended ✅**")
    }
  }
});



client.login(process.env.token).catch(e => {
return console.log("Invalid Token")    
})
