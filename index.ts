import bot from './bot.ts';
import commands from './commands.ts';
import config from './configs.ts';
import { sendMessage, Message, ban, getGuild, sendDirectMessage, unban, createInvite, getMember } from "https://deno.land/x/discordeno@9.4.0/mod.ts";

interface helpItem {
    command : string;
    arguments: string[];
    description: string;
}

const help : helpItem[] = [
	{ command: "help", arguments: [], description: "Shows this help menu" },

	{ command: "ban", arguments: ["User Mention"], description: "Bans the mentioned user" },
	{ command: "unban", arguments: ["User Mention"], description: "Unbans the mentioned user" },

	{ command: "lenny", arguments: [], description: "Displays ( ͡° ͜ʖ ͡°" },
	{ command: "shrug", arguments: [], description: "Displays ¯\\_(ツ)_/¯" },
	{ command: "partyart", arguments: [], description: "Displays ♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪" },
	{ command: "crayola", arguments: [], description: "Displays ((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅a̲̅( ̲̅((>" },
	{ command: "awyeah", arguments: [], description: "Displays ─=≡Σ((( つ◕ل͜◕)つ" },
	{ command: "friku", arguments: [], description: "Displays ┌ಠ_ಠ)┌∩┐ ᶠ***:hearts:ᵧₒᵤ" },

	{ command: "roll", arguments: ["Max Number"], description: "Shows a random number from 1 to the maximum number"},
];

/* 
	Management
*/

commands.registerCommand("ban", (msg: Message, args: string[]) => {

	if(!bot.permCheck(msg, "BAN_MEMBERS"))
		return false;

	const userId = args[0].replace('<', '').replace('>', '').replace('@', '').replace('!', '');

	getGuild(msg.guildID).then(guild => {
		sendDirectMessage(userId, `You were banned from the "${guild.name}" discord server for the reason: \n ${args[1]}`).then(val => {
			ban(msg.guildID, userId, { reason: args[1] }).catch();
		}).catch();
	}).catch();
});

commands.registerCommand("unban", (msg: Message, args: string[]) => {

	if(!bot.permCheck(msg, "BAN_MEMBERS"))
		return false;

	const userId = args[0].replace('<', '').replace('>', '').replace('@', '').replace('!', '');

	getGuild(msg.guildID).then(guild => {
		unban(msg.guildID, userId).then(() => {
			// deno-lint-ignore no-explicit-any
			createInvite(msg.channelID, { max_uses: 1, unique: true, temporary: false, max_age: 86400 }).then((value: any) => {
				sendDirectMessage(msg.author.id, 
					`Send "You were unbanned from the "${guild.name}" discord server. \n Here's the link to rejoin https://discord.gg/${value["code"]}" to <@${userId}>`)
					.catch();
			}).catch();
		}).catch();
	}).catch();
});

/*
	Entertainment
*/

commands.registerCommand("simon", (msg : Message, args : string[]) => {
	sendMessage(msg.channelID, args[0]);
});

/*
	Utility
*/

const utilityCommands = [
	{ command: 'roll', executor: (msg: Message, args: string[]) => 
		sendMessage(msg.channelID, `<@${msg.author.id}> rolled a ${Math.round(Math.random() * (parseInt(args[0], 10) - 1)) + 1}`), exists: true
	},
]

commands.registerCommands(utilityCommands);

/*
	ASCII Art
*/

const artCommands = [
	{ command: 'lenny', executor: (msg: Message, args: string[]) => sendMessage(msg.channelID, '( ͡° ͜ʖ ͡°)'), exists: true },
	{ command: 'shrug', executor: (msg: Message, args: string[]) => sendMessage(msg.channelID, '¯\\_(ツ)_/¯'), exists: true },
	{ command: 'partyart', executor: (msg: Message, args: string[]) => sendMessage(msg.channelID, '♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪¯'), exists: true },
	{ command: 'crayola', executor: (msg: Message, args: string[]) => sendMessage(msg.channelID, '((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅a̲̅( ̲̅((>'), exists: true},
	{ command: 'awyeah', executor: (msg: Message, args: string[]) => sendMessage(msg.channelID, '─=≡Σ((( つ◕ل͜◕)つ'), exists: true},
	{ command: 'friku', executor: (msg: Message, args: string[]) => sendMessage(msg.channelID, '┌ಠ_ಠ)┌∩┐ ᶠᶸᶜᵏ:hearts:ᵧₒᵤ'), exists: true},
];

commands.registerCommands(artCommands);

// Generate Help					   \/ This one is important

commands.generateHelp(config.prefix, "Karen", help);

bot.init(commands);