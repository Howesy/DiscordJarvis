exports.run = function(bot, msg, args) {
    let [specifiedCommand = null] = args;

    const {basicEmbed} = bot.embeds;
    const {username} = bot.user;

    if (specifiedCommand) {
        if (bot.commands.has(specifiedCommand)) {
            specifiedCommand = bot.commands.get(specifiedCommand);
            const {name, description, usage} = specifiedCommand.info;
            const {aliases, permissionLevel} = specifiedCommand.configuration;
            const {convertPermissionLevel} = bot.permissions;
            const {commandPrefix} = bot.settings;
            const commandAliases = aliases.join(", ") || "There are no aliases for this command.";
            const commandPermissionLevel = convertPermissionLevel(permissionLevel);

            const embedOptions = {
                colour: 0x002395,
                title: "I have retrieved information on that command:",
                description: `• Name: \`${name}\` 
                • Description: \`${description}\` 
                • Usage: \`${commandPrefix}${usage}\` 
                • Aliases: \`${commandAliases}\` 
                • Permission Level: \`${commandPermissionLevel}\``,
                footer: `${username} successfully retrieved your command!`
            }

            basicEmbed(msg, embedOptions);

        } else {
            const errorEmbed = {
                colour: 0x002395,
                title: "I was unable to retrieve that command:",
                description: `I was unable to retrieve a command by the name of: \`${specifiedCommand}\``,
                footer: `${username} failed to retrieve your command!`
            }
            
            basicEmbed(msg, errorEmbed);
        }

    } else {
        const commandCategories = ["user", "owner"];
        const [user, owner] = commandCategories;

        const {description} = command.info;
        const userCommands = `\`\`\`asciidoc\n${fetchCommands(bot, user).map(command => `${buildCommandName(bot, command)} :: ${description}`).join('\n')}\`\`\``;
        const developerCommands = `\`\`\`asciidoc\n${fetchCommands(bot, owner).map(command => `${buildCommandName(bot, command)} :: ${description}`).join('\n')}\`\`\``;

        const embedOptions = {
            colour: 0x002395,
            title: `Successfully retrieved ${username}'s commands:`,
            description: `Use >help \`command\` to get information about the command. \n\n**User Commands:**\n${userCommands} \n**Owner Commands:**${developerCommands}`,
            footer: `${username} successfully retrieved all your commands!`
        }

        basicEmbed(msg, embedOptions);
    }
}

exports.info = {
    name: "commands",
    description: "Retrieve all commands available.",
    usage: "commands <commandName | No specification>",
    category: "user"
}

exports.configuration = {
    activated: true,
    aliases: [],
    permissionLevel: 1
}

function fetchCommands(bot, specifiedCategory) {
    const {category} = commands.info;
    return bot.commands.filter(commands => category == specifiedCategory);
}

function buildCommandName(bot, command) {
    const {name} = command.info;
    const {commandPrefix} = bot.settings;
    const commandNames = Array.from(bot.commands.keys());
    const determinedLength = commandNames.reduce((accumulator, commandName) => Math.max(accumulator, commandName.length), 0);
    const calculatedWhiteSpace = calcEmbedSpace(determinedLength, name.length);
    return commandPrefix + name + calculatedWhiteSpace;
}

function calcEmbedSpace(calculatedLength, commandNameLength) {
    return " ".repeat(calculatedLength - commandNameLength);
}