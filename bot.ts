import StartBot, { cache, Intents, Message } from "https://deno.land/x/discordeno@9.4.0/mod.ts";
import config from './configs.ts';

export default {
    // deno-lint-ignore no-explicit-any
    init: (commands : any) => {
        StartBot({
            token: config.token,
            intents: [Intents.GUILD_MESSAGES, Intents.GUILDS, Intents.GUILD_BANS, Intents.DIRECT_MESSAGES],
            eventHandlers: {
                ready: () => {
                    console.log('Successfully connected to gateway');
                },
        
                messageCreate: (message: Message) => {
                    if(commands.isCommand(config.prefix, message)) {
                        commands.executeCommand(config.prefix, message);
                    }
                },
            },
        });
    },
    permCheck: (msg : Message, perm : string) => {
        let hasPerm = false;

        msg.member?.roles.forEach(role => {
            if(cache.guilds.get(msg.guildID)?.roles.get(role)?.permissions.includes(perm))
                hasPerm = true;
        });

        return hasPerm;
    },
}
