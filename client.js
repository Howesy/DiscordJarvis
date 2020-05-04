//Declare our required libs.
const fs = require("fs");
const discord = require("discord.js");

//Declare our directories and deconstruct them into various variables for easy access.
const botDirectories = ["./events/", "./settings/", "./commands/user/", "./commands/developer/"];
const [eventsDir, settingsDir, userCommandsDir, developerCommandsDir] = botDirectories;

//Declare our "bot" (Client) variable and assign it prototype properties so we can easily store and access various imporant collections.
const bot = new discord.Client();
//Assign Collections to our commands and alias property prototypes on the "bot" variable.
bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
//Assign our JSON settings file to a property prototype on the "bot" variable, so we can easily access our settings on the go.
bot.settings = require(`${settingsDir}settings.js`);
bot.privateSettings = require(`${settingsDir}privateSettings.js`);

//Deconstruct our private settings object and retrieve the token property because that's all we need.
const {token} = bot.privateSettings;
//Login into the discord bot using our token so we can bring our bot online to command it.
bot.login(token);

//Read the events directory, require the event file and initialize it with our bot variable to start listening to that event.
fs.readdir(eventsDir, function(error, events) {
    events.forEach(function(event) {
        if (!event.endsWith(".js"))
            return;
        const eventModule = require(`${eventsDirectory}${event}`);
        const [eventName] = event.split(".");
        console.log(`DiscordJarvis | Event Allocated => ${eventName}`);
        bot.on(eventName, (...constructs) => eventModule.run(bot, ...constructs));
    });
});

//Call the "ReadCommands" function to read the various command directories that we have.
//We segregate commands dependant on category so we can view them easier later in our help command.
ReadCommands(userCommandsDir);
ReadCommands(developerCommandsDir);

/*
Decleration of our "ReadCommands" function, like when we read our events, this function stores the command names and required files
into a collection for easy access so we can check for and run them at the users request later on.
We also assign aliases to command names so people can use aliases for easier access to their designated commands.
*/

/**
 * Read command files within a specified directory and assign them to the bot.commands prototype property.
 * @param {string} commandDirectory
 * @returns {void} void
 */

function ReadCommands(commandDirectory) {
    fs.readdir(commandDirectory, function(error, commands) {
        if (error) throw new Error(error);
        commands.forEach(function(command) {
            if (!command.endsWith(".js")) 
                return;
            const commandFile = require(`${commandDirectory}${command}`);
            const commandName = commandFile.info.name;
            bot.commands.set(commandName, commandFile);
            console.log(`DiscordJarvis | Command Allocated => ${commandName}`);
            commandFile.configuration.aliases.forEach(alias => bot.aliases.set(alias, commandName));
        });
    });
}