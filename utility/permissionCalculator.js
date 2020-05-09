function determinePermissionLevel(bot, message) {
    let permissionLevel = 0;
    const permissionMask = 0x2 | 0x8;
    if (message.member == null || message.member == undefined) 
        permissionLevel = 0;
    const {utilities} = bot;
    const {retrieveHighestRole} = utilities;
    const membersHighestRole = retrieveHighestRole(message.member);
    if (membersHighestRole.permissions & permissionMask)
        permissionLevel = 1;
    if (bot.settings.botOwners.includes(message.author.id))
        permissionLevel = 2;

    return permissionLevel;
}

function convertPermissionLevel(permissionLevel) {
    const conversionObject = {
        0 : "Basic User",
        1 : "Staff Member",
        2 : "Bot Owner"
    }

    return conversionObject[permissionLevel];
}

const permissionCalculator = {
    determinePermissionLevel: determinePermissionLevel,
    convertPermissionLevel: convertPermissionLevel
}

module.exports = permissionCalculator;