/**
 * Method for running exported module.
 * @param {object} bot This is our bot (Client) variable.
 * @param {object} rateLimit
*/

exports.run = function(bot, rateLimit) {
    const {timeout, limit, method, route, path} = rateLimit;
    const constructedMessage = [];
    constructedMessage.push(`You've triggered a rate limitation, timeout required: ${timeout}`);
    constructedMessage.push(`You can only use the method: ${method} ${limit} times, every ${timeout}`);
    constructedMessage.push(`This ratelimit occured from the path: ${path} and route: ${route}`);
    constructedMessage.forEach(rLimitInformation => console.log(rLimitInformation));
}