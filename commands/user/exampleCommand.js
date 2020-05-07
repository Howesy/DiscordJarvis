//Exporting run function so we can execute this command when it's called.
//Passing (bot, msg, args) so we can use them in this specific command.
//Depending on what you want to use, you don't have to pass every construct, but you'll always be using (bot, msg)
exports.run = function(bot, msg, args) {
    //Put anything you'd like to run in here!
    //msg.channel.send("Hey there! You used the exampleCommand command!");
}

//Export info object so we can read these at a later time with our "commands" command, in order to better understand the command.
exports.info = {
    name: "exampleCommand",
    description: "This is an amazing command!",
    usage: "exampleCommand RandomArgument 1259",
    category: "user"
}

//Export configuration object so we can alter various prospects of the command such as what permission level is required to use
//the command in our message event.
exports.configuration = {
    activated: true,
    aliases: [],
    permissionLevel: 1 //"Might change to string specified permission level in future."
}