//Declare a function "determinePermissionLevel" to calculate based on a variety of factors what the users permission level should be.
//This is used to determine what commands specific users have access to, obviously it is entirely your choice what users can do at what level.
function determinePermissionLevel(bot, message) {
    //Declare placeholder reassignable variable: "permissionLevel"
    let permissionLevel = 0;
    //Declare a variable "permissionMask" that is comprised of the bit equivelant of the permissions "KICK_MEMBERS" & "ADMINISTRATOR"
    //We'll use these permissions to determine whether or not a user is a staff member.
    const permissionMask = 0x2 | 0x8;
    //There are cases where the "member" property of a message can be null. "<Message>.member?", so in that case assign them a permission level of 0.
    if (msg.member == null || msg.member == undefined) 
        permissionLevel = 0;
    //These users will have access to the more simpler harmless commands.
    //In simple terms, if our members highestRole contains the permissions "KICK_MEMBERS" or "ADMINISTRATOR" assign them a permission level of 1.
    //These users will have access to the higher permission requirement commands such as "ban, kick" and whatever else you determine staff suitable.
    if (message.member.highestRole.permissions & permissionMask)
        permissionLevel = 1;
    //If our owner array declared in our settings module contains the message author's id, then assign them a permission level of 2.
    //These users will have access to the more dangerous and lucrative commands for the bot.
    if (bot.settings.owners.includes(message.author.id))
        permissionLevel = 2;

    //Return the determined permission level.
    return permissionLevel;
}

//Declare a function "convertPermissionLevel" to convert a determined permission level into a more readable format.
//So instead of reading a "1", we can read "Staff Member" instead. Which in my opinion at least, is much cleaner.
function convertPermissionLevel(permissionLevel) {
    //Declare a object, "conversionObject" to pass a number through to retrieve it's companion property.
    const conversionObject = {
        0 : "Basic User",
        1 : "Staff Member",
        2 : "Bot Owner"
    }

    //Return the converted permission level.
    return conversionObject[permissionLevel];
}

//Declare an object called: "permissionCalculator", so it can be exported and called upon when we want to determine a users permission level.
//However, in this case we're going to be using this module in our message event to determine a users permission level on the fly.
//So, instead of determining all users permission levels and caching them and update them dependant on various predetermined events.
//We determine their permission level whenever a command is called.
const permissionCalculator = {
    determinePermissionLevel: determinePermissionLevel,
    convertPermissionLevel: convertPermissionLevel
}

//Export the permissionCalculator object, so we can calculate users permission levels.
module.exports = permissionCalculator;