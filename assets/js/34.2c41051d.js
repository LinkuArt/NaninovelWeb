(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{174:function(e,t,r){"use strict";r.r(t);var a=r(20),n=Object(a.a)({},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"text-printers"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#text-printers","aria-hidden":"true"}},[e._v("#")]),e._v(" Text Printers")]),e._v(" "),r("p",[e._v("Text printers are novel actors used to present self-revealing text messages to the user.")]),e._v(" "),r("p",[e._v("Printers' behavior can be configured using "),r("code",[e._v("Naninovel -> Configuration -> Printers")]),e._v(" context menu; for available options see "),r("router-link",{attrs:{to:"/guide/configuration.html#printers"}},[e._v("configuration guide")]),e._v(". The printers' resources manager can be accessed using "),r("code",[e._v("Naninovel -> Resources -> Printers")]),e._v(" context menu.")],1),e._v(" "),r("p",[e._v("In novel scripts, text printers are mostly controlled with "),r("router-link",{attrs:{to:"/api/#print"}},[r("code",[e._v("@print")])]),e._v(" and "),r("router-link",{attrs:{to:"/api/#printer"}},[r("code",[e._v("@printer")])]),e._v(" actions:")],1),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('; Will activate `Dialogue` printer\n@printer Dialogue\n\n; Will active `Fullscreen` printer\n@printer Fullscreen\n\n; Will print the infamous phrase using active printer\n@print text:"Lorem ipsum dolor sit amet."\n\n; The same as above, but using generic text statement\nLorem ipsum dolor sit amet.\n\n; The same as above, but associated with character "Felix"\nFelix: Lorem ipsum dolor sit amet.\n')])])]),r("h2",{attrs:{id:"dialogue-printer"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#dialogue-printer","aria-hidden":"true"}},[e._v("#")]),e._v(" Dialogue Printer")]),e._v(" "),r("p",[e._v("Dialogue printers present text inside windows with a flexible height. They initially take about a third of the screen size and will increase the height when the content requires more space. Dialogue printers also expose associated character name in a label above the text window.")]),e._v(" "),r("p",[r("img",{attrs:{src:"/guide/dialogue-printer.png",alt:"Dialogue Printer"}})]),e._v(" "),r("h2",{attrs:{id:"fullscreen-printer"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#fullscreen-printer","aria-hidden":"true"}},[e._v("#")]),e._v(" Fullscreen Printer")]),e._v(" "),r("p",[e._v("Fullscreen printers present text inside windows with a static size. They take most of the screen size and are indented for presenting large amounts of text.")]),e._v(" "),r("p",[r("img",{attrs:{src:"/guide/fullscreen-printer.png",alt:"Fullscreen Printer"}})]),e._v(" "),r("h2",{attrs:{id:"adding-custom-printers"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#adding-custom-printers","aria-hidden":"true"}},[e._v("#")]),e._v(" Adding Custom Printers")]),e._v(" "),r("p",[e._v("You can customize the built-in text printers in any way you wish or create new printers from scratch. For example, let's customize the built-in dialogue printer.")]),e._v(" "),r("p",[e._v("All the built-in printer prefabs and related components are stored inside "),r("code",[e._v("Naninovel/Prefabs/TextPrinters")]),e._v(" folder. While you can directly edit the "),r("code",[e._v("Dialogue")]),e._v(" prefab and immediately get the result, consider duplicating it and adding as a separate printer to avoid issues when updating the Naninovel package in the feature.")]),e._v(" "),r("p",[e._v("Duplicate (Ctrl/Cmd+D) the "),r("code",[e._v("Naninovel/Prefabs/TextPrinters/Dialogue.prefab")]),e._v(" prefab and move it outside of the Naninovel package, e.g. to a "),r("code",[e._v("Assets/Printers")]),e._v(" folder.")]),e._v(" "),r("p",[e._v("Edit the prefab: change font, textures, add animations, etc.")]),e._v(" "),r("p",[e._v("Expose the prefab to engine resources using the printer's manager GUI, which can be accessed with "),r("code",[e._v("Naninovel -> Resources -> Printers")]),e._v(" context menu. Add new record using the "),r("code",[e._v("+")]),e._v(" (plus) button, enter the printer actor name (can differ from the prefab name) and double click the record to open actor settings. Drag-drop printer prefab to the "),r("code",[e._v("Resource")]),e._v(" field.")]),e._v(" "),r("p",[e._v("Now you can use the new text printer by activating it via "),r("router-link",{attrs:{to:"/api/#printer"}},[r("code",[e._v("@printer")])]),e._v(" action and specifying the printer actor name you've set in the manager.")],1),e._v(" "),r("h2",{attrs:{id:"text-reveal-effect"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#text-reveal-effect","aria-hidden":"true"}},[e._v("#")]),e._v(" Text Reveal Effect")]),e._v(" "),r("p",[e._v('By default, a gradient fade effect is applied when printing out the text messages. If, however, you prefer the more conventional "typewriter" style, you can disable the fade effect by disabling '),r("code",[e._v("Slide Clip Rect")]),e._v(" and setting "),r("code",[e._v("Reveal Fade Width")]),e._v(" and "),r("code",[e._v("Reveal Fade Duration")]),e._v(" properties in "),r("code",[e._v("Novel Text")]),e._v(" component to zero. "),r("code",[e._v("Novel Text")]),e._v(" components are used in both default printers; eg, you can find it attached to "),r("code",[e._v("Fullscreen/Content/Printer/Text")]),e._v(" gameobject of the "),r("code",[e._v("Naninovel/Prefabs/TextPrinters/Fullscreen")]),e._v(" printer prefab.")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://i.gyazo.com/3434d39dcaf6b501d3f3640fda84bf80.png",alt:""}})]),e._v(" "),r("h2",{attrs:{id:"textmesh-pro"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#textmesh-pro","aria-hidden":"true"}},[e._v("#")]),e._v(" TextMesh Pro")]),e._v(" "),r("p",[e._v("Naninovel supports "),r("a",{attrs:{href:"https://assetstore.unity.com/packages/essentials/beta-projects/textmesh-pro-84126",target:"_blank",rel:"noopener noreferrer"}},[e._v("TextMesh Pro"),r("OutboundLink")],1),e._v(" via a standalone extension package, that contains a fullscreen and dialogue printers implemented with the TMPro UI text components.")]),e._v(" "),r("p",[e._v("First, download the latest version of the package using the link below: "),r("a",{attrs:{href:"https://github.com/Elringus/NaninovelTMPro/raw/master/NaninovelTMPro.unitypackage",target:"_blank",rel:"noopener noreferrer"}},[e._v("github.com/Elringus/NaninovelTMPro/raw/master/NaninovelTMPro.unitypackage"),r("OutboundLink")],1),e._v(".")]),e._v(" "),r("p",[e._v("Before importing the package, make sure you have TextMesh Pro installed in your Unity project. TextMesh Pro can be installed via package manager accessible via "),r("code",[e._v("Window -> Package Manager")]),e._v(" menu.")]),e._v(" "),r("p",[e._v("Import the package, open Naninovel printers configuration menu "),r("code",[e._v("Naninovel -> Configuration -> Printers")]),e._v(', click "Manage Printers" and then replace the built-in resources for the "Dialogue" and "Fullscreen" printers with the prefabs from the extension package; TMPro printer prefabs can be found inside '),r("code",[e._v("NaninovelTMPro/Prefabs")]),e._v(" folder.")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://i.gyazo.com/f9979fa459b5884b88d00bc606da6121.gif",alt:""}})]),e._v(" "),r("p",[e._v("When creating custom TextMesh Pro font assets, don't forget to apply "),r("code",[e._v("Naninovel/NovelFontTMPro")]),e._v(" shader, otherwise the text reveal effect won't work.")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://i.gyazo.com/c82a336dc01c6d95c8af034ad31eea8d.png",alt:""}})])])},[],!1,null,null,null);n.options.__file="text-printers.md";t.default=n.exports}}]);