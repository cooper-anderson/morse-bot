#!/usr/local/bin/node

$ = require("jquery");
Discord = require("discord.js");
parseArgs = require("./parse-args");
settings = require("./settings.json");

bot = new Discord.Client();

bot.login(settings.token);
// bot.user.setStatus("idle");

error = false;
message = false;

tapMessage = function(string="- . ... -"/*". .–. .–. ––– .–. –––...   –– . ... ... .– ––. . ...   –– ..– ... –   –... .   ... . –. –   ..– ... .. –. ––.   –– ––– .–. ... .   –.–. ––– –.. ."*/.split(""), timeMultiplier=250) {
	lengths = {dot: 1, dash: 3, space: 3, gap: 1, general: timeMultiplier};
	time = 0;
	signals = {idle: "online", on: "idle", off: "dnd"};
	tap = function(signal) {
		setTimeout(function() { bot.user.setStatus(signals.on); }, time);
		setTimeout(function() { bot.user.setStatus(signals.off); }, time + signal * lengths.general);
		return (signal + lengths.gap) * lengths.general;
	}
	for (let char of string) {
		if (char == '.') {
			time += tap(lengths.dot);
		} else if (char == '-') {
			time += tap(lengths.dash);
		} else if (char == ' ') {
			time += lengths.space * lengths.general;
		}
	}
	setTimeout(function() { bot.user.setStatus(signals.idle) }, time);
}

bot.on("message", function(msg) {
	if (msg.channel.name == "morse") {
		let content = msg.content.replace(/<@![0-9]{18}>/g, "");
		if (content.match(/^ *`[-.·•–—_ ]*` *$/g) == null) {
			msg.channel.send("<@!" + message.author.id + "> `. .–. .–. ––– .–. –––...   –– . ... ... .– ––. . ...   –– ..– ... –   –... .   ... . –. –   ..– ... .. –. ––.   –– ––– .–. ... .   –.–. ––– –.. .`");
			msg.delete();
		}
	}
	if (msg.content.startsWith("<@406264254631772160>")) {
		tapMessage(msg.content.substr(22));
		msg.delete();
	}
});

