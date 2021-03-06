# UI Customization

UI customization feature allows to add a custom UI and modify or completely replace any of the built-in UI elements, like title menu, settings menu, printer backlog, etc.

Be aware though, that text printers and choice handlers are implemented via actors interface and are customized in a different way; see the corresponding documentation ([text printers](/guide/text-printers.md), [choice handlers](/guide/choices.md)) for more info.

If you wish to modify an existing built-in UI prefab, you can find them at `Naninovel/Prefabs/DefaultUI` folder. Duplicate the prefab (Ctrl/Cmd+D) and move it out of the "Naninovel" folder. 

When creating a new prefab from scratch, don't forget to attach a component that implements interface of the UI you're going to override. This component should be attached to the root object of the prefab.

All the UI interfaces are stored under `Naninovel.UI` namespace:

Interface | Corresponding UI
--- | ---
IBacklogUI | Printer backlog.
ILoadingUI | Panel shown when the game is loading.
IMovieUI | UI used to host movies.
ISaveLoadUI | Panel used for saving and loading game.
ISettingsUI | Panel used for changing game settings.
ITitleUI | Title (main) menu of the game.
IExternalScriptsUI | External scripts browser UI (community modding feature).
IVariableInputUI | Input form for assigning an arbitrary text to a custom state variable (used by [`@input`](/api/#input) action).

When adding a new type of UI, create a new interface inherited from `Naninovel.UI.IManagedUI` and implement it with a component attached to the root of the UI's prefab. Check `Naninovel/Runtime/UI` folder for reference implementations.

When the prefab is ready, just drop it to the `Custom UI` list in the UI configuration manager accessible with `Naninovel -> Configuration -> UI` context menu.

![UI Customization](/guide/custom-ui.png)

When the engine is initializing it'll spawn all the prefabs added to the `Custom UI` list. In case spawned prefab has a component attached to the root object that implements one of the built-in UI interfaces, built-in prefab with default implementation won't be spawned.
