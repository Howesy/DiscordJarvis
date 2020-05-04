/*
When initializing an event, we call a method "run" with the parameters (bot, ...constructs).
Essentially, if we simplify this down. All we're doing is reading a function from a file and using it as our function for event.
Through each event file or "module", as I'll be calling them we pass bot and any other parameters we'll be using for the event.
*/

/**
 * Method for running exported module.
 * @param {object} bot This is our bot (Client) variable.
 * @param {Error} error
*/

//Declaring a function "run", and exporting it.
exports.run = function(bot, error) {
    //Deconstructing the passed error object and retrieving the properties that we desire instead of calling them individually like: "error.message"
    const {name, message, lineNumber, fileName, stack} = error;
    //Declare an array to store various pieces of information, and allow for deconstruction if we so desire.
    const constructedMessage = [];
    //Add which will file the error has occured in and at which line into our "constructedMessage" array.
    constructedMessage.push(`Discord Jarvis encountered an error in ${fileName} at line ${lineNumber}\n`);
    //Add the name of the error, and the message from the error into our "constructedMessage" array.
    constructedMessage.push(`Error Name: ${name} | Error Message: ${message} \n`);
    //Add the full stack trace of the error into our "constructedMessage" array.
    constructedMessage.push(`Full stack trace of error: \n${stack}`);
    //Loop through each element of the "constructedMessage" array and log each individual element.
    constructedMessage.forEach(errorConstructs => console.log(errorConstructs));
}