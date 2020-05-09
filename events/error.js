/**
 * Method for running exported module.
 * @param {object} bot This is our bot (Client) variable.
 * @param {Error} error
*/

exports.run = function(bot, error) {
    const {name, message, lineNumber, fileName, stack} = error;
    const constructedMessage = [];
    constructedMessage.push(`Discord Jarvis encountered an error in ${fileName} at line ${lineNumber}\n`);
    constructedMessage.push(`Error Name: ${name} | Error Message: ${message} \n`);
    constructedMessage.push(`Full stack trace of error: \n${stack}`);
    constructedMessage.forEach(errorConstructs => console.log(errorConstructs));
}