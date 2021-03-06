//Declare our required libs.
const fs = require("fs");
const discord = require("discord.js");

//Declare our directories and deconstruct them into various variables for easy access.
const botDirectories = ["./events/", "./settings/", "./utility/", "./commands/user/", "./commands/owner/"];
const [eventsDir, settingsDir, utilityDir, userCommandsDir, ownerCommandsDir] = botDirectories;

//Declare our "bot" (Client) variable and assign it prototype properties so we can easily store and access various imporant collections.
const bot = new discord.Client();
//Assign Collections to our commands and alias property prototypes on the "bot" variable.
bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
//Assign our JSON settings file to a property prototype on the "bot" variable, so we can easily access our settings on the go.
bot.settings = require(`${settingsDir}settings.js`);
bot.privateSettings = require(`${settingsDir}privateSettings.js`);

//Assign our various utility modules to various prototype properties attached to our "bot" variable, for easy access.
bot.embeds = require(`${utilityDir}embedBuilder.js`);
bot.permissions = require(`${utilityDir}permissionCalculator.js`);
bot.utilities = require(`${utilityDir}generalUtility.js`);

//Deconstruct our private settings object and retrieve the token property because that's all we need.
const {token} = bot.privateSettings;
//Login into the discord bot using our token so we can bring our bot online to command it.
bot.login(token);

//Read the events directory, require the event file and initialize it with our bot variable to start listening to that event.
fs.readdir(eventsDir, function(error, events) {
    //Declare a variable to store the current time in milliseconds, so we can use it for performance statistics.
    const initialTime = Date.now();
    //Log to the console that we're beginning the loading and initialization of discord events.
    console.log("[Discord Jarvis] Beginning loading and initialization of discord events!");
    events.forEach(function(event) {
        //If the file doesn't have a ".js" extension at the end of it, ignore it.
        if (!event.endsWith(".js"))
            return;
        //Require the event module.
        const eventModule = require(eventsDir + event);
        //Destructure the split event name, and retrieve the first index which in this case would be the name.
        const [eventName] = event.split(".");
        //Log to console that the bot has loaded an event.
        console.log(`DiscordJarvis | Event Allocated => ${eventName}`);
        //Tell the bot to listen to the specific event while running all of our specific constructs.
        bot.on(eventName, (...constructs) => eventModule.run(bot, ...constructs));
    });
    //Log how long it took to load all our events for statistical purposes, and to look cool.
    console.log(`[Discord Jarvis] Took ${Date.now() - initialTime}ms to load all events.`);
});

//Call the "ReadCommands" function to read the various command directories that we have.
//We segregate commands dependant on category so we can view them easier later in our help command.
//Log to console that we're beginning the loading and initialization of discord commands.
console.log("[Discord Jarvis] Beginning loading and initialization of discord commands!");
ReadCommands(userCommandsDir);
ReadCommands(ownerCommandsDir);

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
    //Read command directory and loop through each file.
    fs.readdir(commandDirectory, function(error, commands) {
        if (error) throw new Error(error);
        commands.forEach(function(command) {
            //If the read file doesn't end with the ".js" extension, ignore it.
            if (!command.endsWith(".js")) 
                return;
            //Require the module.
            const commandFile = require(commandDirectory + command);
            //Retrieve the name from the modules info object by destructuring.
            const {name} = commandFile.info;
            //Set the module to the command name in the Collection.
            bot.commands.set(name, commandFile);
            //Log to console that a command has been allocated to the collection.
            console.log(`DiscordJarvis | Command Allocated => ${name}`);
            //Destructure the configuration object from the command module and retrieve the "aliases" variable.
            const {aliases} = commandFile.configuration;
            //Loop through all aliases and set the aliases, equal to the command name that their dedicated to.
            aliases.forEach(alias => bot.aliases.set(alias, name));
        });
    });
}