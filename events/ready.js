/**
 * Method for running exported module.
 * @param {object} bot This is our bot (Client) variable.
*/

exports.run = function(bot) {
    const {cache} = bot.guilds;
    console.log(`Hello sir, I have ${cache.size} guild(s) at my disposal and I'm ready at your command.`);
}