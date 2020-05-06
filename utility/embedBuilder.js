//Deconstruct and retrieve the "MessageEmbed" class from the discord.js module so we can create a module for easy creation of embeds.
const {MessageEmbed} = require("discord.js");

//I'll add comments for one of the functions as they all follow the same construction. They are just sent to different areas.

/**
 * Send an embed to the same channel as the passed message object.
 * @param {Object} message Message object retrieved from your command or event.
 * @param {Object} embedOptions Specific options for your embed.
 */

//Declare a function called: "basicEmbed" used for sending embeds to the channel retrieved from the passed message object.
function basicEmbed(message, embedOptions) {
    //Deconstruct our user specified embedOptions object for our embed properties such as colour and title.
    const {colour, title, description, footer} = embedOptions;
    //Deconstruct our message author and retrieve their tag and avatarURL to be used in the author of the embed.
    const {tag, avatarURL} = message.author;
    //Construct a new "MessageEmbed" class.
    const constructedEmbed = new MessageEmbed()
    //Set colour of the embed to our user specified embed colour.
    .setColor(colour)
    //Set title of the embed to our user specified embed title.
    .setTitle(title)
    //Set description of the embed to our user specified embed description.
    .setDescription(description)
    //Set footer of the embed to our user specified embed footer.
    .setFooter(footer)
    //Set timestamp of the embed to a initialize date class and it'll automatically retrieve properties to display the current date and time.
    .setTimestamp(new Date())
    //Set author of the embed to our previously deconstructed properties retrieved from our "message.author" object. (<User>)
    .setAuthor(tag, avatarURL);
    //Send embed to the channel of the passed message.
    message.channel.send(constructedEmbed);
}

/**
 * Send an embed to a specified channel denoted by ID.
 * @param {Object} message Message object retrieved from your command or event.
 * @param {Object} embedOptions Specific options for your embed.
 */

//Declare a function called: "channelEmbed" used for sending embeds to specific channels specified by a channel ID.
function channelEmbed(message, embedOptions) {
    const {colour, title, description, footer, channelID} = embedOptions;
    const {tag, avatarURL} = message.author;
    const constructedEmbed = new MessageEmbed()
    .setColor(colour)
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setTimestamp(new Date())
    .setAuthor(tag, avatarURL);
    //Fetch specified channel within the guild and send the embed to that specified channel.
    message.guild.channels.cache.get(channelID).send(constructedEmbed);
}

/**
 * Send an embed to a specified user denoted by ID.
 * @param {Object} bot Your bot (Client) object
 * @param {Object} embedOptions Specific options for your embed.
 */

//Declare a function called: "userEmbed" used for sending embeds to specific users specified by a user ID.
function userEmbed(bot, embedOptions) {
    const {colour, title, description, footer, userID} = embedOptions;
    const {tag, avatarURL} = bot.user;
    const constructedEmbed = new MessageEmbed()
    .setColor(colour)
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setTimestamp(new Date())
    .setAuthor(tag, avatarURL);
    //Fetch specifeid user from the bots cached users and send the embed to that specified user.
    bot.users.cache.get(userID).send(constructedEmbed);
}

//Declare an object called: "embedBuilder", so it can be exported and called upon when we want to build an embed.
const embedBuilder = {
    basicEmbed: basicEmbed,
    channelEmbed: channelEmbed,
    userEmbed: userEmbed
};

//Export the embed builder object, so we can require this file and build embeds on the fly.
module.exports = embedBuilder;