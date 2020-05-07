//A command to restart the bot instance, relies on having a system that will automatically re-run the bot process, such as the node module "pm2".

//Export asynchronous function "run" in order to be ran when called, (Asynchronous in this case, so we can perform actions in order.)
exports.run = async function (bot, msg) {
    //Deconstruct our "bot.embeds" module and retrieve our "basicEmbed" function so we can create embeds.
    const {basicEmbed} = bot.embeds;
    //Deconstruct the "bot.user" object and retrieve the username so we can place the name of the bot in our embed footers.
    const {username} = bot.user;

    //Construct an object called: "embedOptions" and store specifications for the construction of our embed.
    const embedOptions = {
        colour: 0x002395,
        title: "Beginning restart!",
        description: `Initiliazing ${username}'s restart sequence.`,
        footer: `${username} restart sequence: ${new Date().toUTCString()}`
    };

    //Await the completion of the basicEmbed function before processing any further code.
    await basicEmbed(msg, embedOptions);
    //Await the completion of the process exiting before processing any further code.
    await process.exit(0);
}

//Information on this object can be found in the "exampleCommand.js" file, in the user command directory.
exports.info = {
    name: "restart",
    description: "Restart the bot instance.",
    usage: "restart",
    category: "owner"
}

//Information on this object can be found in the "exampleCommand.js" file, in the user command directory.
exports.configuration = {
    activated: true,
    aliases: [],
    permissionLevel: 1
}