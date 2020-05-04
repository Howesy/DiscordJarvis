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
*/

//Declaring a function "run", and exporting it.
exports.run = function(bot) {
    //We're deconstructing the bot object and reading the guilds property only as we don't need the entire object.
    const {cache} = bot.guilds;
    //Console logging how many guilds the bot is located in, and that the bot is ready to be commanded.
    console.log(`Hello sir, I have ${cache.size} guild(s) at my disposal and I'm ready at your command.`);
}