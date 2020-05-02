//Declare object "botSettings" variable to hold all our specific bot settings.
const botSettings = {
    //Any discord user ID's placed within this array will have FULL access to all of your bots commands, choose wisely.
    //And by discord ID, I mean the long ID, not the user's discriminator (#2421)
    "botOwners": ["Insert your ID here.", "And another powerful user here!"],
    "commandPrefix": "Insert your Discord bot's command prefix here!"
};

//Export privateSettings object so we can access it when requiring this module.
exports = botSettings;