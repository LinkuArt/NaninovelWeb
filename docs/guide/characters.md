# Characters 

Characters are novel actors used to represent scene entities that are placed on top of the [backgrounds](/guide/backgrounds.md). 

A character actor is defined with a name, appearance, visibility, transform (position, rotation, scale) and look direction. It can change appearance, visibility, transform and look direction over time.

Characters' behavior can be configured using `Naninovel -> Configuration -> Characters` context menu; for available options see [configuration guide](/guide/configuration.md#characters). The characters' resources manager can be accessed using `Naninovel -> Resources -> Characters` context menu.

![Add Character](/guide/add-character.png)

In novel scripts, characters are mostly controlled with [`@char`](/api/#char) action:

```
; Shows character with name `Sora` with a default appearance.
@char Sora

; Same as above, but sets appearance to `Happy`.
@char Sora.Happy

; Same as above, but also positions the character 45% away from the left border
; of the screen and 10% away from the bottom border; also makes him look to the left.
@char Sora.Happy look:left pos:0.45,0.1
```

## Display Name

In the character configuration you can set a `Display Name` for specific characters. When set, display name will be shown in the printer name label UI, instead of the character's ID. This allows using compound character names, that contains spaces and special characters (which is not allowed for IDs).

For localization, use "CharacterNames" [managed text](/guide/managed-text) document, which is automatically created when running generate managed text resources task. Be aware, that "CharacterNames" document will override `Display Name` value when defined for the default locale.

## Character Color

When `Use Character Color` is enabled in the character configuration, printer text messages and name labels will be tinted in the specified colors when the corresponding character ID is specified in a [`@print`](/api/#print) action or generic text line.

The following video demonstrates how to use display names and character colors.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/u5B5s-X2Bw0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Sprite Characters 

Sprite implementation of the character actors is the most common and simple one; it uses a set of [sprite](https://docs.unity3d.com/Manual/Sprites) assets to represent appearances of the character. The source of the sprites could be `.png` or `.jpg` image files. 

Sprite character appearance assets can be either managed by editor GUI or placed in a `Resources/Characters/CharacterName` folder, `CharacterName` being the name of the character, for an automatic exposure. 

## Diced Sprite Characters

Implemented via an open source (MIT license) third-party package [SpriteDicing](https://github.com/Elringus/SpriteDicing) used to optimize build size and texture memory by reusing source sprite textures of the characters. 

![Sprite Dicing](https://i.gyazo.com/af08d141e7a08b6a8e2ef60c07332bbf.png)

In order to be able to choose this implementation you have to install [NaninovelSpriteDicing extension package](https://github.com/Elringus/NaninovelSpriteDicing/raw/master/NaninovelSpriteDicing.unitypackage). The extension package contains character implementation scripts and has [SpriteDicing](https://github.com/Elringus/SpriteDicing) bundled inside "ThirdParty" folder.

`DicedSpriteAtlas` assets containing character appearances are used as the resources for the diced sprite characters. Each appearance is mapped by name to the diced sprites contained in the atlas.

Note, that diced characters implementation currently doesn't support animated appearance changes (they're changed instantly).

The following video guide covers creating and configuring diced sprite atlas, adding new diced character based on the created atlas and controlling the character from a novel script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/6PdOAOsnhio" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Animated Characters
	
Animated characters is the most flexible characters actor implementation. It's based on a prefab with an [animator](https://docs.unity3d.com/ScriptReference/Animator) component attached to the root object. Appearance changes are routed to the animator component as [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) commands appearance being the trigger name. You're free to implement the behavior of the underlying object. For example, you can use a 3D rigged character model and route the appearance changes to the corresponding rig animations. 

Animated characters can only be managed by editor GUI.

## Live2D Characters

Live2D character implementation uses assets created with [Live2D Cubism](https://www.live2d.com) 2D modeling and animation software. 

In order to be able to use this implementation you have to first install [Live2D Cubism SDK for Unity](https://live2d.github.io/#unity). Consult official Live2D docs for the installation and usage instructions.

Then install [NaninovelLive2D extension package](https://github.com/Elringus/NaninovelLive2D/raw/master/NaninovelLive2D.unitypackage).

Live2D model prefab used as the resource for the implementation should have a `Naninovel.Live2DController` component attached to the root object. Appearance changes are routed to the animator component as [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) commands appearance being the trigger name. Eg, if you have a "Kaori" Live2D character prefab and want to invoke a trigger with name "Surprise", use the following action:

```
@char Kaori.Surprise
```

Note, that the above action will only attempt to invoke a [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) with "Surprise" argument on the animator controller attached to the prefab; you have to compose underlying animator state machine yourself.

Look direction can optionally be controlled via Live2D's `CubismLookController` (can be disabled via `Control Look` field of the `Naninovel.Live2DController` component).

Be aware, that `Naninovel.Live2DController` expects a "Drawables" gameobject inside the Live2D model prefab (created automatically when importing Live2D models to Unity); the controller will scale this gameobject at runtime in correspondence with "scale" parameter of the `@char` actions. Hence, any local scale values set in the editor will be ignored. To set an initial scale for the Live2D prefabs, please use scale of the parent gameobject as [shown in the video guide](https://youtu.be/rw_Z69z0pAg?t=353).

When Live2D extension is installed a "Live2D" item will appear in the Naninovel configuration menu providing following options:

![](https://i.gyazo.com/435a4824f0ce0dd8c9c3f29d457bab24.png)

Render layer specifies the layer to apply for the Live2D prefabs and culling mask to use for the cameras that will render the prefabs. Render camera field allows to use a custom setup for the render camera (the default render camera is stored inside the packages "Prefabs" folder). Camera offset allows to offset the render camera from the rendered prefab; you can use this parameters to uniformly position all the Live2D prefabs relative to the camera.

The following video guide covers exporting a Live2D character from Cubism Editor, configuring the prefab, creating a simple animator state machine and controlling the character from a novel script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/rw_Z69z0pAg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

