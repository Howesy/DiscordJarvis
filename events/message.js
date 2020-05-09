/**
 * Method for running exported module.
 * @param {object} bot This is our bot (Client) variable.
 * @param {object} msg This is our message variable
 */

exports.run = function(bot, msg) {
    if (msg.author.bot)
        return;

    if (msg.channel.type != "text")
        return;
    
    const {commandPrefix} = bot.settings;

    if (!msg.content.startsWith(commandPrefix))
        return;

    let [command] = msg.content.toLowerCase().split(" ");
    command = command.slice(commandPrefix.length);
    const args = msg.content.split(" ").slice(1);
    const {permissions} = bot;
    const {determinePermissionLevel} = permissions;
    const permission = determinePermissionLevel(bot, msg);

    let commandModule;

    if (bot.commands.has(command))
        commandModule = bot.commands.get(command);
    else if (bot.aliases.has(command))
        commandModule = bot.commands.get(bot.aliases.get(command));

    const {activated, permissionLevel} = commandModule.configuration;

    if (!activated)
        return msg.channel.send("You're unable to access this command as it has been disabled by the developer.");   

    if (permission < permissionLevel)
        return msg.channel.send("You're unabel to access this command as your permission is too low.");

    commandModule.run(bot, msg, args, permission);
}