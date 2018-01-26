#!/usr/local/bin/node

$ = require("jquery");
Discord = require("discord.js");
parseArgs = require("./parse-args");
settings = require("./settings.json");

bot = new Discord.Client();

bot.login(settings.token);

bot.on("message", function(msg) {
	
});

