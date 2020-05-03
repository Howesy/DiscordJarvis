/*
When initializing an event, we call a method "run" with the parameters (bot, ...constructs).
Essentially, if we simplify this down. All we're doing is reading a function from a file and using it as our function for event.
Through each event file or "module", as I'll be calling them we pass bot and any other parameters we'll be using for the event.
Since this is the "ready" event and as specified by the discord.js documentation there are no other parameters, we can just pass bot
in this instance.
*/

/**
 * Method for running exported module.
 * @param {object} bot This is our bot (Client) variable.
 * @param {object} msg This is our message variable
 */

//Declaring a function "run", and exporting it.
exports.run = function(bot, msg) {
    //If the author of the message is a bot user, then return.
    if (msg.author.bot)
        return;

    //If the channel the message was sent in, isn't a guild text channel, then return.
    if (msg.channel.type != "text")
        return;

    //If the start of the message doesn't begin with the designated prefix, then return.
    if (!msg.content.startsWith(bot.settings.prefix))
        return;

    //Deconstruct the recieved message by splitting and retrieving the first element which would be the designated command.
    let [command] = msg.content.toLowerCase().split(" ");
    //Re-assign the value of command to itself while trimming the prefix so we can use it later to retrieve our command module.
    command = command.slice(bot.settings.prefix.length);
    //Declare our argument variable so we can allow the user to specify arguments in their discord messages.
    const args = msg.content.split(" ").slice(1);
    //Call our permission function specified in our utility module to determine what permission level the user is.
    const permission = bot.permission(msg);

    //Declare commandModule variable to be assigned our command module depending on which command the user specified
    //and whether or not the specified command exists.
    let commandModule;

    //If we have a command by the name that the user has specified, retrieve it and assign it to our "commandModule" variable.
    if (bot.commands.has(command))
        commandModule = bot.commands.get(command);
    //In another case, if we have an alias by the name that the user has specified, retrieve the command module associated with it
    //and assign it to our "commandModule" variable.
    else if (bot.aliases.has(command))
        commandModule = bot.commands.get(bot.aliases.get(command));

    //Reading from a configuration object specified within each of our commands, check if we want the command to be used.
    //If we specify a "false" value for this attribute, return and send a message to the channel the command was used in.
    if (!commandModule.configuration.activated)
        return msg.channel.send("You're unable to access this command as it has been disabled by the developer.");   

    //Reading from a configuration object specified withine ach of our commands, check if the user has an appropriate level
    //of permission in order to use the command and if they don't send a message to the channel the command was used in.
    if (permission < commandModule.configuration.permissionLevel)
        return msg.channel.send("You're unabel to access this command as your permission is too low.");

    //Call our run function on the specified command module to pass each of these specific objects for use in the command.
    commandModule.run(bot, msg, args, permission);
}