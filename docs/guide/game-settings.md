# Game Settings
 
Game settings can be changed at any time using settings menu.

<video class="video" loop autoplay><source src="https://i.gyazo.com/7adb3b7c38d9479e31998fbc81860322.mp4"></video>

Changing locale requires game to be restarted in order for the changes to take effect. Other changes will take effect immediately. 

Settings are serialized to a `Settings.json` file stored over game directory. File name can be configured using `Naninovel -> Configuration -> State` context menu; for available options see [configuration guide](/guide/configuration.md#state).

![State Configuration](/guide/state-config.png)

In WebGL settings are serialized using cross-browser [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API).

Menu UIs can be customized or completely replaced using [UI Customization](/guide/ui-customization.md) feature.


