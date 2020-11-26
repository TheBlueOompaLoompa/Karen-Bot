// deno-lint-ignore-file
import { botID, Embed, EmbedField, getMember, Message, sendMessage } from "https://deno.land/x/discordeno@9.4.0/mod.ts";
import parser from './argparse.ts';

interface discordCmd {
    command : string;
    executor : any;
    exists : boolean;
}

interface helpItem {
    command : string;
    arguments: string[];
    description: string;
}

let cmds: discordCmd[] = [];

function findCommand( token : string, command : string) {
    let output : discordCmd = { command: '', executor: (msg : Message, args : string[]) => {}, exists: false };
    cmds.forEach(cmd => {
        if(cmd.command == command.split(' ')[0].replace(token, '')) output = cmd;
    });

    return output;
}

export default {
    registerCommand: (command : string, executor : any) => {
        cmds.push({ command, executor, exists: true });
    },
    registerCommands: (commandArray: discordCmd[] ) => {
        commandArray.forEach(cmd => cmds.push(cmd));
    },
    generateHelp: ( token : string, botName: string, help : helpItem[] ) => {
        let fields : EmbedField[] = [];
        
        help.forEach(item => {
            let args = "";

            item.arguments.forEach(arg => {
                args += ` <${arg}>`;
            });

            fields.push({ name: token + item.command, value : `Usage: ${token}${item.command} ${args} | ${item.description}` })
        });

        cmds.push({ command: "help", executor: (msg: Message, args: string[]) => {

            const helpEmbed = {
                title: `${botName} | Help`,
                fields
            };

            sendMessage(msg.channelID, { embed: JSON.parse(JSON.stringify(helpEmbed)) });         
        }, exists: true });
    },
    isCommand: ( token : string, message : Message ) => {
        const hasToken = message.content.charAt(0) === token;

        let hasCommand = false;
        
        if(findCommand(token, message.content).exists) hasCommand = true;

        return hasToken && hasCommand;
    },
    executeCommand: ( token : string, message : Message ) => {
        const args = parser.parseArguments(message.content);

        findCommand(token, message.content).executor(message, args);
    }
}