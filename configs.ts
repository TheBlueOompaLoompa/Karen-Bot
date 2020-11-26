function getToken() {
    const token = Deno.env.get("KAREN_BOT_TOKEN")?.toString();
    if(token === undefined) {
        return "";
    }
    return token;
}

export default {
    // Your bot token goes here
    token: getToken(),
    // The default prefix for your bot. Don't worry guilds can change this later.
    prefix: "!",
};