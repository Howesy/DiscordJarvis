//A command to display information about a specific command, or display all commands.

//Export function "run" in order to be ran when called.
exports.run = function(bot, msg, args) {
    //Deconstruct first parameter of our "args" variable and assign it a default value of null.
    //We do this to give the user an option to specify a command to retrieve information on.
    //If they don't specify a command, we'll display all our available commands.
    let [specifiedCommand = null] = args;

    //Deconstruct our "bot.embeds" module and retrieve our "basicEmbed" function so we can create embeds.
    const {basicEmbed} = bot.embeds;
    //Deconstruct the "bot.user" object and retrieve the username so we can place the name of the bot in our embed footers.
    const {username} = bot.user;

    //Check if the user has specified a command.
    if (specifiedCommand) {
        //Check if our bot currently has the specified command name.
        if (bot.commands.has(specifiedCommand)) {
            //If we have the command, fetch it's module and reassign the "specifiedCommand" variable with our module.
            specifiedCommand = bot.commands.get(specifiedCommand);
            //Deconstruct our commands "info" object to retrieve specific information about the command.
            const {name, description, usage} = specifiedCommand.info;
            //Deconstruct our commands "configuration" object to retrieve specific configuration information about the command.
            const {aliases, permissionLevel} = specifiedCommand.configuration;
            //Deconstruct our "bot.permissions" module to retrieve our "convertPermissionLevel" function, to make the permission level readable for the user.
            const {convertPermissionLevel} = bot.permissions;
            //Deconstruct our "bot.settings" module to retrieve our "commandPrefix" variable to be used in the information embed of the command.
            const {commandPrefix} = bot.settings;
            //Join together all aliases specified in the command, or if there aren't any, specify a string instead.
            const commandAliases = aliases.join(", ") || "There are no aliases for this command.";
            //Convert the permission level given by the configuration object into a more readable format.
            const commandPermissionLevel = convertPermissionLevel(permissionLevel);

            //Construct an object called: "embedOptions" and store specifications for the construction of our embed.
            const embedOptions = {
                colour: 0x002395,
                title: "I have retrieved information on that command:",
                description: `• Name: \`${name}\` 
                \n• Description: \`${description}\` 
                \n• Usage: \`${commandPrefix}${usage}\` 
                \n• Aliases: \`${commandAliases}\` 
                \n• Permission Level: \`${commandPermissionLevel}\``,
                footer: `${username} successfully retrieved your command!`
            }

            //Send an embed to the channel the command was used in, using our specified embed options.
            basicEmbed(msg, embedOptions);

        } else {
            //Construct an object called: "errorEmbed" and store specifications for the construction of error embed.
            const errorEmbed = {
                colour: 0x002395,
                title: "I was unable to retrieve that command:",
                description: `I was unable to retrieve a command by the name of: \`${specifiedCommand}\``,
                footer: `${username} failed to retrieve your command!`
            }
            
            //Send an embed to the channel the command was used in, using our specified embed options.
            basicEmbed(msg, errorEmbed);
        }

    } else {
        //Declare array and destructure for easier command display management and understanding.
        const commandCategories = ["user", "owner"];
        const [user, owner] = commandCategories;

        //Map out all user commands fetched by using the "fetchCommands" function and store them in a variable "userCommands" for display in our embed later.
        const userCommands = `\`\`\`asciidoc\n${fetchCommands(bot, user).map(command => `${buildCommandName(bot, command)} :: ${command.info.description}`).join('\n')}\`\`\``;
        //Map out all developer commands fetched by using the "fetchCommands" function and store them in a variable "developerCommands" for display in our embed later.
        const developerCommands = `\`\`\`asciidoc\n${fetchCommands(bot, owner).map(command => `${buildCommandName(bot, command)} :: ${command.info.description}`).join('\n')}\`\`\``;

        //Construct an object called: "embedOptions", and store specifications for the construction of our embed.
        const embedOptions = {
            colour: 0x002395,
            title: `Successfully retrieved ${username}'s commands:`,
            description: `Use >help \`command\` to get information about the command. \n\n**User Commands:**\n${userCommands} \n**Owner Commands:**${developerCommands}`,
            footer: `${username} successfully retrieved all your commands!`
        }

        //Send an embed to the channel the command was used in, using our specified embed options.
        basicEmbed(msg, embedOptions);
    }
}

//Information on this object can be found in the "exampleCommand.js" file, in the user command directory.
exports.info = {
    name: "commands",
    description: "Retrieve all commands available.",
    usage: "commands <commandName | No specification>",
    category: "user"
}

//Information on this object can be found in the "exampleCommand.js" file, in the user command directory.
exports.configuration = {
    activated: true,
    aliases: [],
    permissionLevel: 1
}

//Filter all our "bot.commands" by a specific category and return the <Collection> of commands.
function fetchCommands(bot, category) {
    return bot.commands.filter(commands => commands.info.category == category);
}

//Declare function "buildCommandName" to perform actions in order to gurantee the structural integrity of our embed when processing various commands.
function buildCommandName(bot, command) {
    //Deconstruct our "name" and "commandPrefix" variables from our "command.info" and "bot.settings" objects.
    const {name} = command.info;
    const {commandPrefix} = bot.settings;
    //Build array from the keys of bot.commands, essentially we retrieve each name of our commands and store them in an array.
    const commandNames = Array.from(bot.commands.keys());
    //Take all commands names and find the largest string length and store it in our "determinedLength" variable.
    const determinedLength = commandNames.reduce((accumulator, commandName) => Math.max(accumulator, commandName.length), 0);
    //Calculate the required amount of whitespace in our embed by calling our "calcEmbedSpace" function and apssing it our determined length.
    const calculatedWhiteSpace = calcEmbedSpace(determinedLength, name.length);
    //Return our prefix, commandName, and calculated whitespace together.
    return commandPrefix + name + calculatedWhiteSpace;
}

//Declare function "calcEmbedSpace" to calculate how much whitespace is needed depending on the calculated length and command name length.
function calcEmbedSpace(calculatedLength, commandNameLength) {
    //Return whitespace depending on the length of our longest command name subtracted by the length of the given command name.
    return " ".repeat(calculatedLength - commandNameLength);
}