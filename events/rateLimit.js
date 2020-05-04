/*
When initializing an event, we call a method "run" with the parameters (bot, ...constructs).
Essentially, if we simplify this down. All we're doing is reading a function from a file and using it as our function for event.
Through each event file or "module", as I'll be calling them we pass bot and any other parameters we'll be using for the event.
*/

/**
 * Method for running exported module.
 * @param {object} bot This is our bot (Client) variable.
 * @param {object} rateLimit
*/

//Declaring a function "run", and exporting it.
exports.run = function(bot, rateLimit) {
    //Deconstructing the passed rateLimit object and retrieving the properties that we desire instead of calling them individually like: "rateLimit.limit"
    const {timeout, limit, method, route, path} = rateLimit;
    //Declaring an array to store various pieces of information, and to allow for deconstruction if we desire.
    const constructedMessage = [];
    //Add the information that a rate limit has occured and the time required for the rate limit to resolve.
    constructedMessage.push(`You've triggered a rate limitation, timeout required: ${timeout}`);
    //Add the method used that caused the rate limit, and the amount of times you can call this method every specific amount of time.
    constructedMessage.push(`You can only use the method: ${method} ${limit} times, every ${timeout}`);
    //Add what path and route you called to cause the rate limit.
    constructedMessage.push(`This ratelimit occured from the path: ${path} and route: ${route}`);
    //Loop through each element of the "constructedMessage" array and log each individual element.
    constructedMessage.forEach(rLimitInformation => console.log(rLimitInformation));
}