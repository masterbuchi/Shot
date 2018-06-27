var levelSelection = function (game) { };

var zurueckButton;
var zurueckButtonBackground;
var tutorialBackground;
var tutorialKnopf;
var levelEinsBackground;
var levelEinsKnopf;
var levelZweiBackground;
var levelZweiKnopf;
var levelDreiBackground;
var levelDreiKnopf;
var levelVierBackground;
var levelVierKnopf;
var levelFuenfBackground;
var levelFuenfKnopf;
var levelSechsBackground;
var levelSechsKnopf;
var levelSiebenBackground;
var levelSiebenKnopf;

var header;

levelSelection.prototype = {

    preload: function () {
        game.load.script("Tutorial", "levels/tutorial.js");
        game.load.script("LevelEins", "levels/level1.js");
        game.load.script("LevelZwei", "levels/level2.js");
        game.load.script("LevelDrei", "levels/level3.js");
        game.load.script("LevelVier", "levels/level4.js");
        game.load.script("LevelFuenf", "levels/level5.js");
        game.load.script("LevelSechs", "levels/level6.js");
        game.load.script("LevelSieben", "levels/level7.js");
    },

    create: function () {
        game.state.add("Tutorial", tutorial);
        game.state.add("LevelEins", levelEins);
        game.state.add("LevelZwei", levelZwei);
        game.state.add("LevelDrei", levelDrei);
        game.state.add("LevelVier", levelVier);
        game.state.add("LevelFuenf", levelFuenf);
        game.state.add("LevelSechs", levelSechs);
        game.state.add("LevelSieben", levelSieben);

        game.add.sprite(0, 0, "BildElement1");
        game.add.sprite(0, 0, "BildElement2");
        game.add.sprite(0, 0, "BildElement3");

        header = game.add.text(game.world.centerX, 100, "L E V E L S", { font: "100px Roboto Light", fill: "#000000", align: "center" });
        header.anchor.set(0.5);

        zurueckButtonBackground = game.add.sprite(12, 12, "rot1mini");
        zurueckButton = game.add.button(10, 10, "back", zurueck);

        tutorialKnopf = game.add.button(75, 295, "rot2", starteTutorial);
        tutorialBackground = game.add.sprite(80, 300, "rot1");

        levelEinsKnopf = game.add.button(305, 295, "rot2", starteLevelEins);
        levelEinsBackground = game.add.sprite(310, 300, "rot1");

        levelZweiKnopf = game.add.button(535, 295, "rot2", starteLevelZwei);
        levelZweiBackground = game.add.sprite(540, 300, "rot1");

        levelDreiKnopf = game.add.button(765, 295, "rot2", starteLevelDrei);
        levelDreiBackground = game.add.sprite(770, 300, "rot1");

        levelVierKnopf = game.add.button(75, 495, "rot2", starteLevelVier);
        levelVierBackground = game.add.sprite(80, 500, "rot1");

        levelFuenfKnopf = game.add.button(305, 495, "rot2", starteLevelFuenf);
        levelFuenfBackground = game.add.sprite(310, 500, "rot1");

        levelSechsKnopf = game.add.button(535, 495, "rot2", starteLevelSechs);
        levelSechsBackground = game.add.sprite(540, 500, "rot1");

        levelSiebenKnopf = game.add.button(765, 495, "rot2", starteLevelSieben);
        levelSiebenBackground = game.add.sprite(770, 500, "rot1");

        levels = game.add.group();
        levels.add(tutorialBackground);
        levels.add(tutorialKnopf);
        levels.add(levelEinsBackground);
        levels.add(levelEinsKnopf);
        levels.add(levelZweiBackground);
        levels.add(levelZweiKnopf);
        levels.add(levelDreiBackground);
        levels.add(levelDreiKnopf);
        levels.add(levelVierBackground);
        levels.add(levelVierKnopf);
        levels.add(levelFuenfBackground);
        levels.add(levelFuenfKnopf);
        levels.add(levelSechsBackground);
        levels.add(levelSechsKnopf);
        levels.add(levelSiebenBackground);
        levels.add(levelSiebenKnopf);

    },
    update: function () {

        function animation(a, b, yVonA, yZuA, yVonB, yZuB, englishText, germanText) {
            if (a.input.pointerOver()) {
        
                if(language == 0) {
                    header.text = englishText;
                } else {
                    header.text = germanText;
                }
        
                game.add.tween(b).to({
                    y: yZuB
                }, 100, Phaser.Easing.Linear.None, true);
                game.add.tween(a).to({
                    y: yZuA
                }, 100, Phaser.Easing.Linear.None, true);
            } else {
                game.add.tween(b).to({
                    y: yVonB
                }, 100, Phaser.Easing.Linear.None, true);
                game.add.tween(a).to({
                    y: yVonA
                }, 100, Phaser.Easing.Linear.None, true);
            }
        }

        header.text = "L E V E L S";
       
        animation(zurueckButton, zurueckButtonBackground, 12, 10, 10, 8, "B A C K", "Z U R Ü C K");

        animation(tutorialKnopf, tutorialBackground, 295, 275, 300, 280, "T U T O R I A L", "E I N L E I T U N G");
        animation(levelEinsKnopf, levelEinsBackground, 295, 275, 300, 280, "L E V E L 1", "L E V E L 1");
        animation(levelZweiKnopf, levelZweiBackground, 295, 275, 300, 280, "L E V E L 2", "L E V E L 2");
        animation(levelDreiKnopf, levelDreiBackground, 295, 275, 300, 280, "L E V E L 3", "L E V E L 3");
        animation(levelVierKnopf, levelVierBackground, 495, 475, 500, 480, "L E V E L 4", "L E V E L 4");
        animation(levelFuenfKnopf, levelFuenfBackground, 495, 475, 500, 480, "L E V E L 5","L E V E L 5");
        animation(levelSechsKnopf, levelSechsBackground, 495, 475, 500, 480, "L E V E L 6","L E V E L 6");
        animation(levelSiebenKnopf, levelSiebenBackground, 495, 475, 500, 480, "L E V E L 7","L E V E L 7");
    }
}

function starteTutorial() {
    game.state.start("Tutorial");
}

function starteLevelEins() {
    game.state.start("LevelEins");
}

function starteLevelZwei() {
    game.state.start("LevelZwei");
}

function starteLevelDrei() {
    game.state.start("LevelDrei");
}

function starteLevelVier() {
    game.state.start("LevelVier");
}

function starteLevelFuenf() {
    game.state.start("LevelFuenf");
}

function starteLevelSechs() {
    game.state.start("LevelSechs");
}

function starteLevelSieben() {
    game.state.start("LevelSieben");
}