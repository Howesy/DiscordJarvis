const fs = require("fs");
const discord = require("discord.js");

const botDirectories = ["./events/", "./settings/", "./utility/", "./commands/user/", "./commands/owner/"];
const [eventsDir, settingsDir, utilityDir, userCommandsDir, ownerCommandsDir] = botDirectories;

const bot = new discord.Client();
bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.settings = require(`${settingsDir}settings.js`);
bot.privateSettings = require(`${settingsDir}privateSettings.js`);

bot.embeds = require(`${utilityDir}embedBuilder.js`);
bot.permissions = require(`${utilityDir}permissionCalculator.js`);
bot.utilities = require(`${utilityDir}generalUtility.js`);

const {token} = bot.privateSettings;
bot.login(token);

fs.readdir(eventsDir, function(error, events) {
    const initialTime = Date.now();
    console.log("[Discord Jarvis] Beginning loading and initialization of discord events!");
    events.forEach(function(event) {
        if (!event.endsWith(".js"))
            return;
        const eventModule = require(eventsDir + event);
        const [eventName] = event.split(".");
        console.log(`DiscordJarvis | Event Allocated => ${eventName}`);
        bot.on(eventName, (...constructs) => eventModule.run(bot, ...constructs));
    });
    console.log(`[Discord Jarvis] Took ${Date.now() - initialTime}ms to load all events.`);
});

console.log("[Discord Jarvis] Beginning loading and initialization of discord commands!");
ReadCommands(userCommandsDir);
ReadCommands(ownerCommandsDir);

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
            const commandFile = require(commandDirectory + command);
            const {name} = commandFile.info;
            bot.commands.set(name, commandFile);
            console.log(`DiscordJarvis | Command Allocated => ${name}`);
            const {aliases} = commandFile.configuration;
            aliases.forEach(alias => bot.aliases.set(alias, name));
        });
    });
}