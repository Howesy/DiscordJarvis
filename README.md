# Discord Jarvis

Discord Jarvis was developed on the latest version of Discord.JS at the time: (V12)

Discord Jarvis is a easy deployable framework for a discord bot, taking advantage of modularly structured commands and events for organisation and cleanliness. Taking inspiration from the fictional artifical super-intelligence "Jarvis", this structure allows you to perform advanced functions while remaining simplistic for users to command.

All code contained within is fully commented so you can understand the inner workings of everything that is occuring.
Obviously I can't explain everything in-depth otherwise the files would be a million lines long each.
So you'll have to do some research to figure out specific stuff yourself, but there is documentation and knowledge everywhere.

This frameowrk also comes included with various utility functions and an embed constructor for easy on the fly embeds, making your bot the flashiest in the business.

# Dependencies

This repository is dependant on these node modules:

- Discord.js (v12)
https://www.npmjs.com/package/discord.js

- vm2 (v3.9.2)
https://www.npmjs.com/package/vm2#nodevm

## Installation

Installing this project is simple, all you need to do is download this project as ZIP and extract the file and folders to any directory you'd like.

Once you've extracted all the files to your chosen directory, follow this list of directives:

- Install the "discord.js" node module to the directory you've extracted DiscordJarvis to.
- Change "privateSettingsExample.js" and "settingsExample.js" to their respective names removing the "Example" keyword.
- Retrieve your Discord bot's token and place it inside the "privateSettings.js" file in the designated position.
- Retrieve the ID's of the bot owners you desire and place them inside your "settings.js" file in the designated position.
- Determine your specific bot prefix and place it inside your "settings.js" file in the designated position.

If you want an example of how to perform these actions, direct your attention to the (Installation Tutorial) section.

## Contributing

At the moment I have no intentions on allowing for direction contribution. But I more then welcome the fact of commiting issues to the repository to potentially suggest features and fix any current ones that are malfunctioning.

## License
I have designated the Discord Jarvis repository with the MIT license.

[MIT](https://choosealicense.com/licenses/mit/)