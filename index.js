#!/usr/local/bin/node

$ = require("jquery");
Discord = require("discord.js");
parseArgs = require("./parse-args");
settings = require("./settings.json");

bot = new Discord.Client();

bot.login(settings.token);

message = false;

bot.on("message", function(msg) {
	if (msg.channel.name == "morse") {
		message = msg;
		let content = msg.content.replace(/<@![0-9]{18}>/g, "");
		if (content.match(/^ *`[-.·•–—_ ]*` *$/g) == null) {
			msg.channel.send("<@!" + message.author.id + "> `· ·–· ·–· ––– ·–· –––···   –– · ··· ··· ·– ––· · ···   –– ··– ··· –   –··· ·   ··· · –· –   ··– ··· ·· –· ––·   –– ––– ·–· ··· ·   –·–· ––– –·· ·`");
			msg.delete();
		}
	}
});

