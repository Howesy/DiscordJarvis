# Discord Jarvis

Discord Jarvis was developed on the latest version of Discord.JS at the time: (V12)

Download Latest Release: [Download](https://github.com/Howesy/DiscordJarvis/releases)

Discord Jarvis is a easy deployable framework for a discord bot, taking advantage of modularly structured commands and events for organisation and cleanliness. Taking inspiration from the fictional artifical super-intelligence "Jarvis", this structure allows you to perform advanced functions while remaining simplistic for users to command.

All code contained within is fully commented so you can understand the inner workings of everything that is occuring.
Obviously I can't explain everything in-depth otherwise the files would be a million lines long each.
So you'll have to do some research to figure out specific stuff yourself, but there is documentation and knowledge everywhere.

NOTE: I will be making a seperate branch where all code is left undocumented if that's what you desire.

This framework also comes included with various utility functions and an embed constructor for easy on the fly embeds, making your bot the flashiest in the business.

Discord Jarvis is essentially my magnum opus of Discord bot framework.

# Dependencies

This repository is dependant on these node modules:

- Discord.js (v12)
https://www.npmjs.com/package/discord.js

## Installation

Installing this project is simple, all you need to do is download this project as ZIP and extract the file and folders to any directory you'd like.

Once you've extracted all the files to your chosen directory, follow this list of directives:

- Install the "discord.js" node module to the directory you've extracted DiscordJarvis to.
- Change "privateSettingsExample.js" and "settingsExample.js" to their respective names removing the "Example" keyword.
- Retrieve your Discord bot's token and place it inside the "privateSettings.js" file in the designated position.
- Retrieve the ID's of the bot owners you desire and place them inside your "settings.js" file in the designated position.
- Determine your specific bot prefix and place it inside your "settings.js" file in the designated position.
- Then simply run your bot by opening a terminal/console in the directory and run `node client.js`

## Extra Information

As you can see there is a significant lack of commands included in the repository. This is because I leave the command making to you developers. I've given you the engine to drive the amibition, you've just got to give it the throttle to get it going. However, I will more than likely be leaving example commands in this repository in another branch or perhaps directly integrated into this "master" branch.

## Future Plans

- Potentially implement an eval command that executes in it's own sandboxed environment to protect from malicious intentions.
- Add a plethora of various commands to the repository to inspire and give developers the boost they may need for their bots.

## Commands Example

<a href="https://imgbb.com/"><img src="https://i.ibb.co/PDtNPQK/Discord-e-ZHt5-G2-G7-R.png" alt="Discord-e-ZHt5-G2-G7-R" border="0" /><a>

<a href="https://imgbb.com/"><img src="https://i.ibb.co/ygPgm59/Discord-t9h333bh-SU.png" alt="Discord-t9h333bh-SU" border="0" /></a>

## Contributing

At the moment I have no intentions on allowing for direction contribution. But I more then welcome the fact of commiting issues to the repository to potentially suggest features and fix any current ones that are malfunctioning.

## License
I have designated the Discord Jarvis repository with the MIT license.

[MIT](https://choosealicense.com/licenses/mit/)