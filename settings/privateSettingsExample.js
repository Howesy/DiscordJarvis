/*
This file in reality would be called "privateSettings.js" and you should under no circumstances show this to anyone.
Obviously that's a disclaimer but seriously, if you don't trust them completely 100%, keep this to yourself.
The reason I say this, is because this module will contain your Discord bot's token.
If someone gets hold of your token with malicious intentions they will have FULL control of the bot, so make sure you keep it safe.
*/

//Declare object "privateSettings" variable to hold all your SUPER IMPORTANT/SECRET information.
const privateSettings = {
    "token": "Insert your discord bot's token here!"
}

//Export privateSettings object so we can access it when requiring this module.
module.exports = privateSettings;