var preload = function (game) { };

preload.prototype = {
    preload: function () {
        game.load.image("background", "assets/backgrounds/mainbackground.png");
        game.load.image("whiteBackground", "assets/backgrounds/whiteBackground.png");

        game.load.script("Intro", "menu/intro.js");
        game.load.script("MainMenu", "menu/mainMenu.js");
        game.load.script("LevelSelection","menu/levelSelection.js");
        game.load.script("GameOptions", "menu/gameOptions.js");
        game.load.script("Credits", "menu/credits.js");

        game.load.image("BildElement1" , "assets/menu/Bild1.png");
        game.load.image("BildElement2" , "assets/menu/Bild2.png");
        game.load.image("BildElement3" , "assets/menu/Bild3.png");
    },
    create: function () {
        game.state.add("Intro", intro);
        game.state.add("MainMenu", mainMenu);
        game.state.add("LevelSelection", levelSelection);
        game.state.add("GameOptions", gameOptions);
        game.state.add("Credits", credits);

        game.state.start("Intro");
    }
}