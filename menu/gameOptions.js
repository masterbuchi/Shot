var gameOptions = function (game) { };

var header;
var musikAn;
var musikAus;
var musikEinViertel;
var musikZweiViertel;
var musikDreiViertel;

var deutsch;
var deutschBackground;

var german;
var germanBackground;

var english;
var englishBackground;

var musikAnBackground;
var musikAusBackground;
var musikEinViertelBackground;
var musikZweiViertelBackground;
var musikDreiViertelBackground;


gameOptions.prototype = {
    preload: function () {
        game.load.image("test", "assets/sprites/rot2audio.png");
    },
    create: function () {
        // Hintergrund
        game.add.sprite(0, 0, "BildElement1");
        game.add.sprite(0, 0, "BildElement2");
        game.add.sprite(0, 0, "BildElement3");

        header = game.add.text(game.world.centerX, 100, "L E V E L S", { font: "100px Roboto Light", fill: "#000000", align: "center" });
        header.anchor.set(0.5);

        zurueckButtonBackground = game.add.sprite(12, 12, "rot1mini");
        zurueckButton = game.add.button(10, 10, "back", zurueck);

        musikAn = game.add.button(game.world.centerX + 200, game.world.centerY, "rot1audio", musikAnMachen);
        musikAn.anchor.set(0.5);
        musikAnBackground = game.add.sprite(game.world.centerX + 195, game.world.centerY - 5 , "rot2audio");
        musikAnBackground.anchor.set(0.5);

        musikAus = game.add.button(game.world.centerX - 200, game.world.centerY, "rot1audio", musikAusMachen);
        musikAus.anchor.set(0.5);
        musikAusBackground = game.add.sprite(game.world.centerX - 205, game.world.centerY - 5, "rot2audio");
        musikAusBackground.anchor.set(0.5);

        musikEinViertel = game.add.button(game.world.centerX - 100, game.world.centerY, "rot1audio", musikViertelVolume);
        musikEinViertel.anchor.set(0.5);
        musikEinViertelBackground = game.add.sprite(game.world.centerX - 105, game.world.centerY - 5, "rot2audio");
        musikEinViertelBackground.anchor.set(0.5);

        musikZweiViertel = game.add.button(game.world.centerX, game.world.centerY, "rot1audio", musikZweiViertelVolume);
        musikZweiViertel.anchor.set(0.5);
        musikZweiViertelBackground = game.add.sprite(game.world.centerX - 5, game.world.centerY - 5, "rot2audio");
        musikZweiViertelBackground.anchor.set(0.5);

        musikDreiViertel = game.add.button(game.world.centerX + 100, game.world.centerY, "rot1audio", musikDreiViertelVolume);
        musikDreiViertel.anchor.set(0.5);
        musikDreiViertelBackground = game.add.sprite(game.world.centerX + 95, game.world.centerY - 5, "rot2audio");
        musikDreiViertelBackground.anchor.set(0.5);

        german = game.add.button(game.world.centerX + 50, game.world.centerY + 160, "rot1audio", stelleSpracheAufDeutsch);
        german.anchor.set(0.5);
        germanBackground = game.add.sprite(game.world.centerX + 45, game.world.centerY + 155, "rot2audio");
        germanBackground.anchor.set(0.5);

        english = game.add.button(game.world.centerX - 50, game.world.centerY + 160, "rot1audio", stelleSpracheAufEnglisch);
        english.anchor.set(0.5);
        englishBackground = game.add.sprite(game.world.centerX - 55, game.world.centerY + 155 , "rot2audio");
        englishBackground.anchor.set(0.5);

    },
    update: function () {

        if (music.volume == 0.25) {
            musikEinViertelBackground.alpha = 1;
            musikZweiViertelBackground.alpha = 0;
            musikDreiViertelBackground.alpha = 0;
            musikAnBackground.alpha = 0;
            musikAusBackground.alpha = 0;

        } else if (music.volume == 0.5) {
            musikEinViertelBackground.alpha = 0;
            musikZweiViertelBackground.alpha = 1;
            musikDreiViertelBackground.alpha = 0;
            musikAnBackground.alpha = 0;
            musikAusBackground.alpha = 0;
    
        } else if (music.volume == 0.75) {
            musikEinViertelBackground.alpha = 0;
            musikZweiViertelBackground.alpha = 0;
            musikDreiViertelBackground.alpha = 1;
            musikAnBackground.alpha = 0;
            musikAusBackground.alpha = 0;
    
        } else if (music.volume == 1) {
            musikEinViertelBackground.alpha = 0;
            musikZweiViertelBackground.alpha = 0;
            musikDreiViertelBackground.alpha = 0;
            musikAnBackground.alpha = 1;
            musikAusBackground.alpha = 0;
    
        } else if (music.volume == 0) {
            musikEinViertelBackground.alpha = 0;
            musikZweiViertelBackground.alpha = 0;
            musikDreiViertelBackground.alpha = 0;
            musikAnBackground.alpha = 0;
            musikAusBackground.alpha = 1;
        }

        if (language == 0) {
            englishBackground.alpha = 1;
            germanBackground.alpha = 0;
        } else {
            englishBackground.alpha = 0;
            germanBackground.alpha = 1;
        }

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

        if (language == 0) {
            header.text = "O P T I O N S";
        } else {
            header.text = "O P T I O N E N";
        }


        animation(zurueckButton, zurueckButtonBackground, 12, 10, 10, 8, "B A C K", "Z U R Ü C K");

        animation(musikAn, musikAnBackground, game.world.centerY, game.world.centerY - 5, game.world.centerY - 5, game.world.centerY - 10, "M U S I C   1 0 0 %", "M U S I K   1 0 0 %");
        animation(musikAus, musikAusBackground, game.world.centerY, game.world.centerY - 5, game.world.centerY - 5, game.world.centerY - 10, "M U S I C   O F F", "M U S I K   A U S");

        animation(musikEinViertel, musikEinViertelBackground, game.world.centerY, game.world.centerY - 5, game.world.centerY - 5, game.world.centerY - 10, "M U S I C   2 5 %", "M U S I K   2 5 %");
        animation(musikZweiViertel, musikZweiViertelBackground, game.world.centerY, game.world.centerY - 5, game.world.centerY - 5, game.world.centerY - 10, "M U S I C   5 0 %", "M U S I K   5 0 %");
        animation(musikDreiViertel, musikDreiViertelBackground, game.world.centerY, game.world.centerY - 5, game.world.centerY - 5, game.world.centerY - 10, "M U S I C   7 5 %", "M U S I K   7 5 %");

        animation(german, germanBackground, game.world.centerY + 160, game.world.centerY + 155, game.world.centerY + 155, game.world.centerY + 150, "G E R M A N", "D E U T S C H");
        animation(english, englishBackground, game.world.centerY + 160, game.world.centerY + 155, game.world.centerY + 155, game.world.centerY + 150, "E N G L I S H", "E N G L I S C H");

    }
}

function stelleSpracheAufDeutsch() {
    language = 1;

    englishBackground.alpha = 0;
    germanBackground.alpha = 1;
}

function stelleSpracheAufEnglisch() {

    language = 0;

    englishBackground.alpha = 1;
    germanBackground.alpha = 0;
}

function musikViertelVolume() {
    music.volume = 0.25;

    akSound.volume = 0.25;
    pistolenSound.volume = 0.25;
    raketenwerferSound.volume = 0.25;
    raketenExplosionSound.volume = 0.25;
    shotgunSound.volume = 0.25;
    deathSound.volume = 0.25;
    pistolenReloadSound.volume = 0.25;
    shotgunReloadSound.volume = 0.25;
    akReloadSound.volume = 0.25;
    raketenwerferReloadSound.volume = 0.25;
}

function musikZweiViertelVolume() {
    music.volume = 0.5;

    akSound.volume = 0.5;
    pistolenSound.volume = 0.5;
    raketenwerferSound.volume = 0.5;
    raketenExplosionSound.volume = 0.5;
    shotgunSound.volume = 0.5;
    deathSound.volume = 0.5;
    pistolenReloadSound.volume = 0.5;
    shotgunReloadSound.volume = 0.5;
    akReloadSound.volume = 0.5;
    raketenwerferReloadSound.volume = 0.5;    

}

function musikDreiViertelVolume() {
    music.volume = 0.75;

    akSound.volume = 0.75;
    pistolenSound.volume = 0.75;
    raketenwerferSound.volume = 0.75;
    raketenExplosionSound.volume = 0.75;
    shotgunSound.volume = 0.75;
    deathSound.volume = 0.75;
    pistolenReloadSound.volume = 0.75;
    shotgunReloadSound.volume = 0.75;
    akReloadSound.volume = 0.75;
    raketenwerferReloadSound.volume = 0.75;

}

function musikAnMachen() {
    music.volume = 1;

    akSound.volume = 1;
    pistolenSound.volume = 1;
    raketenwerferSound.volume = 1;
    raketenExplosionSound.volume = 1;
    shotgunSound.volume = 1;
    deathSound.volume = 1;
    pistolenReloadSound.volume = 1;
    shotgunReloadSound.volume = 1;
    akReloadSound.volume = 1;
    raketenwerferReloadSound.volume = 1;

}

function musikAusMachen() {
    music.volume = 0;

    akSound.volume = 0;
    pistolenSound.volume = 0;
    raketenwerferSound.volume = 0;
    raketenExplosionSound.volume = 0;
    shotgunSound.volume = 0;
    deathSound.volume = 0;
    pistolenReloadSound.volume = 0;
    shotgunReloadSound.volume = 0;
    akReloadSound.volume = 0;
    raketenwerferReloadSound.volume = 0;

}