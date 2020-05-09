const {MessageEmbed} = require("discord.js");

/**
 * Send an embed to the same channel as the passed message object.
 * @param {Object} message Message object retrieved from your command or event.
 * @param {Object} embedOptions Specific options for your embed.
 */

function basicEmbed(message, embedOptions) {
    const {colour, title, description, footer} = embedOptions;
    const {tag} = message.author;
    const constructedEmbed = new MessageEmbed()
    .setColor(colour)
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setTimestamp(new Date())
    .setAuthor(tag, message.author.avatarURL());
    message.channel.send(constructedEmbed);
}

/**
 * Send an embed to a specified channel denoted by ID.
 * @param {Object} message Message object retrieved from your command or event.
 * @param {Object} embedOptions Specific options for your embed.
 */

function channelEmbed(message, embedOptions) {
    const {colour, title, description, footer, channelID} = embedOptions;
    const {tag} = message.author;
    const constructedEmbed = new MessageEmbed()
    .setColor(colour)
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setTimestamp(new Date())
    .setAuthor(tag, message.author.avatarURL());
    message.guild.channels.cache.get(channelID).send(constructedEmbed);
}

/**
 * Send an embed to a specified user denoted by ID.
 * @param {Object} bot Your bot (Client) object
 * @param {Object} embedOptions Specific options for your embed.
 */

function userEmbed(bot, embedOptions) {
    const {colour, title, description, footer, userID} = embedOptions;
    const {tag} = bot.user;
    const constructedEmbed = new MessageEmbed()
    .setColor(colour)
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setTimestamp(new Date())
    .setAuthor(tag, bot.user.avatarURL());
    bot.users.cache.get(userID).send(constructedEmbed);
}

const embedBuilder = {
    basicEmbed: basicEmbed,
    channelEmbed: channelEmbed,
    userEmbed: userEmbed
};

module.exports = embedBuilder;