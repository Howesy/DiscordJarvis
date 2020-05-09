exports.run = async function (bot, msg) {
    const {basicEmbed} = bot.embeds;
    const {username} = bot.user;

    const embedOptions = {
        colour: 0x002395,
        title: "Beginning restart!",
        description: `Initiliazing ${username}'s restart sequence.`,
        footer: `${username} restart sequence: ${new Date().toUTCString()}`
    };

    await basicEmbed(msg, embedOptions);
    await process.exit(0);
}

exports.info = {
    name: "restart",
    description: "Restart the bot instance.",
    usage: "restart",
    category: "owner"
}

exports.configuration = {
    activated: true,
    aliases: [],
    permissionLevel: 2
}