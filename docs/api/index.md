﻿---
sidebar: auto
---

# API Reference

Novel script actions API reference. Use the side bar to quickly navigate between available actions. 

~~Strikethrough~~ indicates a nameless parameter, and **bold** stands for required parameter; other parameters should be considered optional. Check out the [novel scripts guide](/guide/novel-scripts.md) in case you have no idea what's this all about.

This API reference is valid for [Naninovel v1.3.1-beta](https://github.com/Elringus/NaninovelWeb/releases).

## arrange

#### Summary
Arranges specified characters by X-axis.  When no parameters provided, will execute an auto-arrange evenly distributing visible characters by X-axis.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">CharacterPositions</span> | LiteralMap&lt;Single&gt; | Character name to scene local X-axis position map.  Local scene position 0 relates to the left border and 1 to the right border of the screen; 0.5 is the center.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Evenly distribute all the visible characters
@arrange

; Place character with name `Jenna` 15%, `Felix` 50% and `Mia` 85% away
; from the left border of the screen.
@arrange Jenna.0.15,Felix.0.5,Mia.0.85
```

## back

#### Summary
Modifies a `Naninovel.IBackgroundActor`.

#### Remarks
Backgrounds are handled a bit differently from characters. Most of the time we'll only have  one background actor on scene, which will constantly transition to different appearances.  To free the user from always repeating one actor name in scripts, we allow to just  provide background name (appearance) and transition type as a nameless param and assume that  `main` actor should be affected. When this is not the case, the name of the actor can be explicitly  provided via the `Naninovel.Actions.ModifyActor`3.Name` parameter.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">AppearanceAndTransition</span> | Pair&lt;String, String&gt; | Appearance to set for the modified background and name of the transition effect to use.  When transition is not provided, a cross-fade effect will be used by default.  See [/guide/background-transition-effects.html](https://naninovel.com/guide/background-transition-effects.html) for the list of available transition effects.
params | Single[] | Parameters of the transition effect.
name | String | Name (ID) of the actor to modify.
appearance | String | Appearance to set for the modified actor.
pos | Single[] | Position (in scene local space) to set for the modified actor.  Scene space described as follows: x0y0 is at the bottom left and x1y1 is at the top right corner of the screen.
scale | Single[] | Scale to set for the modified actor.
position | Single[] | Position (in world space) to set for the modified actor.
isVisible | Boolean | Visibility status to set for the modified actor.
rotation | Single[] | Rotation to set for the modified actor.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Set `River` as the appearance of the main background
@back River

; Same as above, but also use a `RadialBlur` transition effect
@back River.RadialBlur

; Given an `ExplosionSound` SFX and an `ExplosionSprite` background, the following
; script sequence will simulate two explosions appearing far and close to the camera.
@sfx ExplosionSound volume:0.1
@back name:ExplosionSprite scale:0.3 pos:0.55,0.6 time:0 isVisible:false
@back name:ExplosionSprite
@fx ShakeBackground params:,1
@hide ExplosionSprite
@sfx ExplosionSound volume:1.5
@back name:ExplosionSprite pos:0.65 scale:1
@fx ShakeBackground params:,3
@hide ExplosionSprite
```

## bgm

#### Summary
Plays or modifies currently played BGM (background music) track with the provided name.

#### Remarks
Music tracks are looped by default.  When music track name (BgmPath) is not specified, will affect all the currently played tracks.  When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start),  but the specified parameters (volume and whether the track is looped) will be applied.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">BgmPath</span> | String | Path to the music track to play.
volume | Single | Volume of the music track.
loop | Boolean | Whether to play the track from beginning when it finishes.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Fades-in a music track with the name `Sanctuary` over default fade duration and plays it in a loop
@bgm Sanctuary

; Same as above, but fade-in duration is 10 seconds and plays only once
@bgm Sanctuary time:10 loop:false

; Changes volume of all the played music tracks to 50% over 2.5 seconds and makes them play in a loop
@bgm volume:0.5 loop:true time:2.5
```

## br

#### Summary
Adds a line break to the text in active printer.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">Count</span> | Int32 | Number of line breaks to add.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Second sentence will be printed on a new line
Lorem ipsum dolor sit amet.[br] Consectetur adipiscing elit.

; Second sentence will be printer two lines under the first one
Lorem ipsum dolor sit amet.[br 2] Consectetur adipiscing elit.
```

## camera

#### Summary
Modifies the main camera, changing offset, zoom level and rotation over time.  Check [this video](https://youtu.be/zy28jaMss8w) for a quick demonstration of the action effect.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
offset | Vector2 | Local camera position offset in units by X and Y axis.
rotation | Single | Local camera rotation by Z-axis in angle degrees (0.0 to 360.0 or -180.0 to 180.0).
zoom | Single | Relatize camera zoom (orthographic size scale), in 0.0 to 1.0 range.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Offset over X-axis (pan) the camera by -3 units and offset over Y-axis by 1.5 units
@camera offset:-3,1.5

; Zoom-in the camera by 50%.
@camera zoom:0.5

; Rotate the camera by 10 degrees clock-wise
@camera rotation:10

; All the above simultaneously animated over 5 seconds
@camera offset:-3,1.5 zoom:0.5 rotation:10 time:5

; Instantly reset camera to the default state
@camera offset:0,0 zoom:0 rotation:0 time:0
```

## char

#### Summary
Modifies a `Naninovel.ICharacterActor`.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">NameAndAppearance</span> | Pair&lt;String, String&gt; | Name of the actor to modify and the appearance to set.  When appearance is not provided, will use either a `Default` (is exists) or a random one.
look | String | Look direction of the actor; possible options: left, right, center.
name | String | Name (ID) of the actor to modify.
appearance | String | Appearance to set for the modified actor.
pos | Single[] | Position (in scene local space) to set for the modified actor.  Scene space described as follows: x0y0 is at the bottom left and x1y1 is at the top right corner of the screen.
scale | Single[] | Scale to set for the modified actor.
position | Single[] | Position (in world space) to set for the modified actor.
isVisible | Boolean | Visibility status to set for the modified actor.
rotation | Single[] | Rotation to set for the modified actor.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Shows character with name `Sora` with a default appearance.
@char Sora

; Same as above, but sets appearance to `Happy`.
@char Sora.Happy

; Same as above, but also positions the character 45% away from the left border
; of the screen and 10% away from the bottom border; also makes him look to the left.
@char Sora.Happy look:left pos:0.45,0.1
```

## choice

#### Summary
Adds a choice option to an active (or default) `Naninovel.IChoiceHandlerActor`.

#### Remarks
When no goto parameter is specified, will continue script execution from the next script line.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">ChoiceSummary</span> | String | Text to show for the choice.
handler | String | Name of the choice handler to add choice for.
goto | Pair&lt;String, String&gt; | Path to go when the choice is selected by user.  See `@goto` action for the path format.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Print the text, then immediately show choices and stop script execution.
Continue executing this script or load another?[skipInput]
@choice "Continue" goto:.Continue
@choice "Load another from start" goto:AnotherScript
@choice "Load another from label" goto:AnotherScript.LabelName
@stop
```

## despawn

#### Summary
Destroys object spawned with `@spawn` action.

#### Remarks
If prefab has a `UnityEngine.MonoBehaviour` component attached the root object, and the component implements  a `Naninovel.Actions.DestroySpawned.IParameterized` interface, will pass the specified `params` values before destroying the object;  if the component implements `Naninovel.Actions.DestroySpawned.IAwaitable` interface, action execution will wait for  the async completion task returned by the implementation before destroying the object.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | String | Path to the prefab resource to destroy. Path is relative to a "./Resources" folder, eg  given a "Assets/Resources/FX/Explosion.prefab" asset, use the following path to spawn it: "FX/Explosion".  A "@spawn" action with the same path is expected to be executed before.
params | String[] | Parameters to set before destoying the prefab.  Requires the prefab to have a `Naninovel.Actions.DestroySpawned.IParameterized` component attached the root object.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Given a "@spawn Rainbow" action was executed before
@despawn Rainbow
```

## fx

#### Summary
Spawns a special effect prefab stored in `./Resources/Naninovel/FX` resources folder.  See [/guide/special-effects.html](https://naninovel.com/guide/special-effects.html) for the list of available built-in special effects.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | String | Path to the prefab resource to spawn. Path is relative to a "./Resources" folder, eg  given a "Assets/Resources/FX/Explosion.prefab" asset, use the following path to spawn it: "FX/Explosion".
params | String[] | Parameters to set when spawning the prefab.  Requires the prefab to have a `Naninovel.Actions.Spawn.IParameterized` component attached the root object.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Shakes an active text printer
@fx ShakePrinter

; Applies a glitch effect to the camera
@fx GlitchCamera
```

## gosub

#### Summary
Jumps the novel script playback to the provided path and saves the path to the global state;  @return actions use this info to redirect to action after the last invoked gosub action.  Useful for invoking a repeating set of actions multiple times.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | Pair&lt;String, String&gt; | Path to jump into in the following format: `ScriptName.LabelName`.  When label name is ommited, will play provided script from the start.  When script name is ommited, will attempt to find a label in the currently played script.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Jumps the playback to the label `VictoryScene` in the currently played script,
; executes the actions and jumps back to the action after the `gosub`.
@gosub .VictoryScene
...
@stop

# VictoryScene
@back Victory
@sfx Fireworks
@bgm Fanfares
You are victorious!
@return
```

## goto

#### Summary
Jumps the novel script playback to the provided path.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | Pair&lt;String, String&gt; | Path to jump into in the following format: `ScriptName.LabelName`.  When label name is ommited, will play provided script from the start.  When script name is ommited, will attempt to find a label in the currently played script.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Loads and starts playing a novel script with the name `Script001` from the start.
@goto Script001

; Save as above, but start playing from the label `AfterStorm`.
@goto Script001.AfterStorm

; Jumps the playback to the label `Epilogue` in the currently played script.
@goto .Epilogue
```

## hide

#### Summary
Hides (removes from scene) an actor with provided name.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">ActorName</span> | String | Name of the actor to hide.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@hide ActorName
```

## hideAll

#### Summary
Hides (removes) all the actors (eg characters, backgrounds, text printers, choice handlers, etc) on scene.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@hideAll
```

## hideChars

#### Summary
Hides (removes) all the visible characters on scene.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@hideChars
```

## hideText

#### Summary
Hides an active printer.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@hideText
```

## i

#### Summary
Holds script execution until user activates a `continue` input.  Shortcut for `@wait input`.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; User will have to activate a `continue` input after the first sentence
; for the printer to contiue printing out the following text.
Lorem ipsum dolor sit amet.[i] Consectetur adipiscing elit.
```

## if

#### Summary
Will execute `Naninovel.Actions.Goto` and/or `Naninovel.Actions.SetCustomVariable` actions when the provided expression is true.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Expression</span> | String | Conditional expression.  Supported operators: == (equal), != (not equal), &gt; (greater), &gt;= (greater or equal), &lt; (less), &lt;= (less or equal), &amp;&amp; (and), &#124;&#124; (or).  Supported math functions: https://docs.microsoft.com/en-us/dotnet/api/system.math?view=netframework-4.7.2#methods  Additionally, `Random(int min, int max)` function is supported, returning a random integer between specified min and max values.  It's possible to use existing variable names as rhs (right hand side operand); to distinguish a plain text value from a variable name, wrap the value in single quotes (').  It's possible to group the expressions with round parentheses.
goto | Pair&lt;String, String&gt; | Path to go when expression is true; see `@goto` action for the path format.
set | String | Set expression to execute when the conditional expression is true; see `@set` action for syntax reference.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Given a `score` variable is set (eg, via `@set` action) to an integer value:

; Play a `fanfare` SFX for `score` times.
@set counter=1
# FanfareLoop
@sfx Fanfare
@if counter<score set:counter+1 goto:.FanfareLoop

; Set variable `mood` to `Great` if `score` is equal to or greater than 5,
; to `Fine` if 4 or greater, and to `Average` in the other cases.
@if "score >= 5" set:mood='Great'
@if "score >= 4 && score < 5" set:mood='Fine'
@if "score < 4" set:mood='Average'

; You can also use `if` parameter on other actions to conditionally execute them:

; If `level` value is a number and is greater than 9000, add the choice
@choice "It's over 9000!" if:"level > 9000"

; If `dead` variable is equal to `False`, execute the print action
@print text:"I'm still alive." if:dead==`False`

; If `glitch` equals `True` or random function in 1 to 10 range returns 5 or more, execute `@fx` action
@fx GlitchCamera if:"glitch == 'True' || Random(1, 10) >= 5"

; If `score` value is in 7 to 13 range or `lucky` variable equals `True`, load `LuckyEnd` script
@goto LuckyEnd if:"(score >= 7 && score <= 13) || lucky == 'True'"

; You can also use conditionals in the inlined actions
Lorem sit amet. [style bold if:score>=10]Consectetur elit.[style default]
```

## input

#### Summary
Shows an input field UI where user can enter an arbitrary text.  Upon submit the entered text will be assigned to the specified custom variable.  Check out this [video guide](https://youtu.be/F9meuMzvGJw) on usage example.

#### Remarks
The state of the UI is not serialized when saving the game, so make sure to prevent  player from saving the game when the UI is visible (eg, with `@hideText` action).

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">VariableName</span> | String | Name of a custom variable to which the entered text will be assigned.
summary | String | An optional summary text to show along with input field.
play | Boolean | Whether to automatically resume script playback when user submits the input form.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Allow user to enter an arbitrary text and assign it to `name` custom state variable
@input name summary:"Choose your name."
; Stop action is required to halt script execution until user submits the input
@stop

; You can then inject the assigned `name` variable in novel scripts
Archibald: Greetings, {name}!
{name}: Yo!

; ...or use it inside set and conditional expressions
@set score+1 if:name=='Felix'
```

## movie

#### Summary
Playes a movie with the provided name (path).

#### Remarks
Will fade-out the screen before playing the movie and fade back in after the play.  Playback can be canceled by activating a `cancel` input (`Esc` key by default).

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">MovieName</span> | String | Name of the movie resource to play.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Given an "Opening" video clip is added to the movie resources, plays it
@movie Opening
```

## print

#### Summary
Resets the active printer, prints text message and waits for user input.

#### Remarks
This action is used under the hood when processing generic text lines.  Will cancel the printing (reveal the text at once) on `Naninovel.InputManager.Continue` and `Naninovel.InputManager.Skip`.  Will attempt to play corresponding voice clip (when `Naninovel.AudioManager.AutoVoicingEnabled` is enabled).  Will add printed message to the `Naninovel.UI.IBacklogUI` (when available).

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Text</span> | String | Text of the message to print.
printer | String | Name of the printer to use.
actor | String | Name (ID) of the actor to whom the message belongs.
reset | Boolean | Whether to reset text of the printer before executing the printing task.
waitInput | Boolean | Whether to wait for user input after finishing the printing task.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@print "Lorem ipsum dolor sit amet."
```

## printer

#### Summary
Sets printer with the provided name active and de-activates all the others.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">PrinterName</span> | String | Name of the printer to activate.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Will activate `Dialogue` printer
@printer Dialogue

; Will active `Fullscreen` printer
@printer Fullscreen
```

## resetText

#### Summary
Clears printed text of active printer.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@resetText
```

## return

#### Summary
Attempts to jump the novel script playback to the action after the last used @gosub.  See @gosub action summary for more info.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

## save

#### Summary
Automatically save the game to a quick save slot.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@save
```

## set

#### Summary
Assigns a value to a custom variable.

#### Remarks
Variable name should be alphanumeric (latin characters only) and can contais usnerscores, eg: `name`, `Char1Score`, `my_score`.  Variable names are case-insensitive, eg: `myscore` is equal to `MyScore`.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Expression</span> | String | Set expression. Supported operators: =,+,-,*. All operators except assignment requires both operands to be numbers.  You can use existing variable names as rhs (right hand side operand); to distinguish a plain text value from a variable name, wrap the value in single quotes (').
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Assign `foo` variable a `bar` string value
@set foo="bar"

; Assign `foo` variable a 1 number value
@set foo=1

; If `foo` is a number, add 0.5 to its value
@set foo+0.5

; If `foo` is a number, subtract 25 from its value
@set varName-25

; If `foo` is a number, multiply its value by 2
@set foo*2

; Assign `foo` variable value of the `bar` variable, which is `Hello World!`.
; Notice, that `bar` variable should actually exist, otherwise `bar` plain text value will be assigned instead.
@set bar="Hello World!"
@set foo=bar

; It's possible to inject variables to novel script action parameters
@set scale=0
# EnlargeLoop
@char Misaki.Default scale:{scale}
@set scale+0.1
@goto .EnlargeLoop if:scale<1

; ..and generic text lines
@set name="Dr. Stein"
@set drink="Dr. Pepper"
{name}: My favourite drink is {drink}!
```

## sfx

#### Summary
Plays or modifies currently played SFX (sound effect) track with the provided name.

#### Remarks
Sound effect tracks are not looped by default.  When sfx track name (SfxPath) is not specified, will affect all the currently played tracks.  When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start),  but the specified parameters (volume and whether the track is looped) will be applied.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">SfxPath</span> | String | Path to the sound effect asset to play.
volume | Single | Volume of the sound effect.
loop | Boolean | Whether to play the sound effect in a loop.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Plays an SFX with the name `Explosion` once
@sfx Explosion

; Plays an SFX with the name `Rain` in a loop
@sfx Rain loop:true

; Changes volume of all the played SFX tracks to 75% over 2.5 seconds and disables looping for all of them
@sfx volume:0.75 loop:false time:2.5
```

## showText

#### Summary
Shows an active or default text printer.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@showText
```

## skipInput

#### Summary
Next call to `Naninovel.NovelScriptPlayer.EnableWaitingForInput` will be ignored.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; User won't have to activate a `continue` input in order to progress to the `@sfx` action.
And the rain starts.[skipInput]
@sfx Rain
```

## spawn

#### Summary
Spawns a prefab stored in project resources.

#### Remarks
If prefab has a `UnityEngine.MonoBehaviour` component attached the root object, and the component implements  a `Naninovel.Actions.Spawn.IParameterized` interface, will pass the specified `params` values after the spawn;  if the component implements `Naninovel.Actions.Spawn.IAwaitable` interface, action execution will wait for  the async completion task returned by the implementation.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | String | Path to the prefab resource to spawn. Path is relative to a "./Resources" folder, eg  given a "Assets/Resources/FX/Explosion.prefab" asset, use the following path to spawn it: "FX/Explosion".
params | String[] | Parameters to set when spawning the prefab.  Requires the prefab to have a `Naninovel.Actions.Spawn.IParameterized` component attached the root object.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Given there is a prefab stored in `Assets/Resources/Rain.prefab`, spawn it
@spawn Rain
```

## stop

#### Summary
Stops the novel script execution.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@stop
```

## stopBgm

#### Summary
Stops playing a BGM (background music) track with the provided name.

#### Remarks
When music track name (BgmPath) is not specified, will stop all the currently played tracks.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">BgmPath</span> | String | Path to the music track to stop.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Fades-out the `Promenade` music track over 10 seconds and stops the playback
@stopBgm Promenade time:10

; Stops all the currently played music tracks
@stopBgm
```

## stopFx

#### Summary
Stops the effect of an FX started with `@fx` action by destroying the spawned object of the corresponding FX prefab.  See [/guide/special-effects.html](https://naninovel.com/guide/special-effects.html) for the list of available built-in special effects.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | String | Path to the prefab resource to destroy. Path is relative to a "./Resources" folder, eg  given a "Assets/Resources/FX/Explosion.prefab" asset, use the following path to spawn it: "FX/Explosion".  A "@spawn" action with the same path is expected to be executed before.
params | String[] | Parameters to set before destoying the prefab.  Requires the prefab to have a `Naninovel.Actions.DestroySpawned.IParameterized` component attached the root object.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Given a "Rain" FX was started with "@fx" action
@stopfx Rain
```

## stopSfx

#### Summary
Stops playing an SFX (sound effect) track with the provided name.

#### Remarks
When sound effect track name (SfxPath) is not specified, will stop all the currently played tracks.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">SfxPath</span> | String | Path to the sound effect to stop.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Stop playing an SFX with the name `Rain`, fading-out for 15 seconds.
@stopSfx Rain fadeTime:15

; Stops all the currently played sound effect tracks
@stopSfx
```

## stopVoice

#### Summary
Stops playback of the currently played voice clip.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

## style

#### Summary
Applies text style to the active printer.

#### Remarks
You can still use rich text formatting tags directly, but they will be printed  alongside normal text, which is not desirable in most cases.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">TextStyles</span> | String[] | Text formatting styles to apply.  Possible options: color hex code (eg, #ffaa00), bold, italic, px text size (eg 45).
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; Print first sentence in bold red text with 45px size,
; then reset the style and print second sentence using default style.
@style #ff0000,bold,45
Lorem ipsum dolor sit amet.
@style default
Consectetur adipiscing elit.

; Print first sentence normally, but second one in bold and italic;
; then reset the style to the default.
Lorem ipsum sit amet. [style bold,italic]Consectetur adipiscing elit.[style default]
```

## title

#### Summary
Loads default engine state and shows `Naninovel.UI.ITitleUI`.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
@title
```

## voice

#### Summary
Plays a voice clip at the provided path.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">VoicePath</span> | String | Path to the voice clip to play.
volume | Single | Volume of the playback.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

## wait

#### Summary
Holds script execution until the specified wait condition.

#### Parameters

<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">WaitMode</span> | String | Wait condition:  input (string) - user press continue or skip input key;  number (int or float)  - timer (seconds).
wait | Boolean | Holds script execution until the specified wait condition.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.  See `@if` action for the expression syntax reference.

</div>

#### Example
```
; `ThunderSound` SFX will play 0.5 seconds after the shake background effect finishes.
@fx ShakeBackground
@wait 0.5
@sfx ThunderSound
```

