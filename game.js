// PRELOAD DATEI

var game;
var music;
var text;
var ladeAnimation;

var kasten1;
var kasten2;
var kasten3;

var a1;
var a2;
var a3;
var b1;
var b2;
var b3;

window.onload = function () {
    game = new Phaser.Game(1000, 700);

    game.state.add("Boot", boot);
    game.state.start("Boot");

    //Globale Variablen


    // ----- Sound 
    var lowPassFilter;
    var pistolenSound;
    var shotgunSound;
    var raketenwerferSound;
    var akSound;
    var deathSound;
    var pistolSound;

    // ------ Spielelemente

    var Plattformen;

    // Menuinformationen
    var hauptnachricht;
    var ausgeruesteterWaffenText;
    var munitionsText;
    // Steuerungsvariablen
    var spaceKey;
    var wKey;
    var aKey;
    var sKey;
    var dKey;


    var player;

    //Waffengruppe
    var Waffen;

    //Gegnergruppen
    var GegnerGruppe;

    //Animationsvariablen
    var richtung;
    let gegner;

    var background;
    let weltbreite;
    let welthöhe;

}

var boot = function (game) {};

boot.prototype = {
    preload: function () {



        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#FFFFFF";

        // Backgrounds
        game.load.image("background", "assets/backgrounds/mainbackground.png");
        game.load.image("whiteBackground", "assets/backgrounds/whiteBackground.png");
        game.load.image('levelOneBackground', 'assets/backgrounds/levelOneBackground.png');
        game.load.image('levelTwoBackground', 'assets/backgrounds/levelTwoBackground.png');
        game.load.image('levelThreeBackground', 'assets/backgrounds/levelThreeBackground.png');

        // Sounds
        game.load.audio('akSound', 'audio/sounds/ak47.mp3');
        game.load.audio('pistolenSound', 'audio/sounds/pistole.mp3');
        game.load.audio('raketenwerferSound', 'audio/sounds/raketenwerfer.mp3');
        game.load.audio('shotgunSound', 'audio/sounds/shotgun.mp3');
        game.load.audio('deathSound', 'audio/sounds/death.mp3');
        game.load.audio('raketenExplosionSound', 'audio/sounds/raketenExplosion.mp3');

        // Skripts
        // States
        game.load.script("Intro", "menu/intro.js");
        game.load.script("MainMenu", "menu/mainMenu.js");
        game.load.script("LevelSelection", "menu/levelSelection.js");
        game.load.script("GameOptions", "menu/gameOptions.js");
        game.load.script("Credits", "menu/credits.js");

        // IntrohintergrundElemente
        game.load.image("BildElement1", "assets/menu/Bild1.png");
        game.load.image("BildElement2", "assets/menu/Bild2.png");
        game.load.image("BildElement3", "assets/menu/Bild3.png");

        // ---------------------------------

        // Plattform
        game.load.image('platform', 'assets/platform.png');

        //Level 2
        game.load.image('platform1', 'assets/platform1.png');
        game.load.image('platform2', 'assets/platform2.png');
        game.load.image('platform3', 'assets/platform3.png');
        game.load.image('platform4', 'assets/platform4.png');
        game.load.image('platform5', 'assets/platform5.png');
        game.load.image('platform6', 'assets/platform6.png');
        game.load.image('platform7', 'assets/platform7.png');
        game.load.image('platform8', 'assets/platform8.png');
        game.load.image('platform9', 'assets/platform9.png');
        game.load.image('platform10', 'assets/platform10.png');
        game.load.image('platform11', 'assets/platform11.png');
        game.load.image('stalaknat', 'assets/stalaknat.png');
        game.load.image('brocken1', 'assets/brocken1.png');
        game.load.image('brocken2', 'assets/brocken2.png');
        game.load.image('brocken3', 'assets/brocken3.png');
        game.load.image('brocken4', 'assets/brocken4.png');
        game.load.image('stalaktiten', 'assets/stalaktiten.png');
        game.load.image('groundlevel2', 'assets/level2/ground.png');

        //Level 3
        game.load.image('felsen', 'assets/felsen.png');
        game.load.image('felsen1', 'assets/felsen1.png');
        game.load.image('felsen2', 'assets/felsen2.png');
        game.load.image('felsen3', 'assets/felsen3.png');
        game.load.image('2platform1', 'assets/2platform1.png');
        game.load.image('2platform2', 'assets/2platform2.png');
        game.load.image('2platform3', 'assets/2platform3.png');
        game.load.image('2platform6', 'assets/2platform6.png');
        game.load.image('2platform7', 'assets/2platform7.png');
        game.load.image('2brocken', 'assets/2brocken.png');

        // Boden
        game.load.image('ground', 'assets/ground.png');

        game.load.spritesheet('player', 'assets/player_sprite.png', 212.6, 243);
        game.load.spritesheet('player_oa', 'assets/player_sprite_oa.png', 212.6, 243);
        game.load.spritesheet('schwacherGegner', 'assets/gegner_schwach_sprite.png', 212.6, 243);
        game.load.spritesheet('starkerGegner', 'assets/gegner_stark_sprite.png', 212.6, 243);

        // Waffen

        // Pistole
        game.load.image('pistole', 'assets/pistole.png');
        game.load.image('pistolenSchuss', 'assets/Muni_pt.png');

        // Shotgun
        game.load.image('shotgun', 'assets/shotgun.png');
        game.load.image('shotgunSchuss', 'assets/Muni_sg.png');

        // AK
        game.load.image('ak', 'assets/ak47.png');
        game.load.image('akSchuss', 'assets/Muni_ak.png');

        // Raketenwerfer
        game.load.image('raketenwerfer', 'assets/raketenwerfer.png');
        game.load.image('rakete', 'assets/Muni_rw.png');
        game.load.spritesheet('explosion', 'assets/raketenexplosion.png', 590.6, 590.6);


        // Arme

        // Gegner

        // Pistole gehend
        game.load.image('arme_gegner_pistole_rechts', 'assets/gegner_pt rechts.png');
        game.load.image('arme_gegner_pistole_links', 'assets/gegner_pt links.png');
        // Pistole stehend
        game.load.image('arme_gegner_pistole_zielend_rechts', 'assets/gegner_pt stehend rechts.png');
        game.load.image('arme_gegner_pistole_zielend_links', 'assets/gegner_pt stehend links.png');

        // Shotgun gehend/stehend 
        game.load.image('arme_gegner_shotgun_rechts', 'assets/gegner_sg rechts.png');
        game.load.image('arme_gegner_shotgun_links', 'assets/gegner_sg links.png');
        // AK Gehend
        game.load.image('arme_gegner_ak_rechts', 'assets/gegner_ak rechts.png');
        game.load.image('arme_gegner_ak_links', 'assets/gegner_ak links.png');
        // AK Kniend
        game.load.image('arme_gegner_ak_zielend_rechts', 'assets/gegner_ak kniend rechts.png');
        game.load.image('arme_gegner_ak_zielend_links', 'assets/gegner_ak kniend links.png');
        // Raketenwerfer 
        game.load.image('arme_gegner_rw_rechts', 'assets/gegner_rw rechts.png');
        game.load.image('arme_gegner_rw_links', 'assets/gegner_rw links.png');
        // Raketenwerfer kniend
        game.load.image('arme_gegner_rw_kniend_rechts', 'assets/gegner_rw kniend rechts.png');
        game.load.image('arme_gegner_rw_kniend_links', 'assets/gegner_rw kniend links.png');
        // Raketenwerfer liegend
        game.load.image('arme_gegner_rw_liegend_rechts', 'assets/gegner_rw liegend rechts.png');
        game.load.image('arme_gegner_rw_liegend_links', 'assets/gegner_rw liegend links.png');

        // Pistole
        game.load.image('arme_pistole_rechts', 'assets/player_pt_rechts.png');
        game.load.image('arme_pistole_links', 'assets/player_pt_links.png');

        // Shotgun
        game.load.image('arme_shotgun_rechts', 'assets/player_sg_rechts.png');
        game.load.image('arme_shotgun_links', 'assets/player_sg_links.png');

        // AK
        game.load.image('arme_ak_rechts', 'assets/player_ak_rechts.png');
        game.load.image('arme_ak_links', 'assets/player_ak_links.png');

        // Raketenwerfer
        game.load.image('arme_raketenwerfer_rechts', 'assets/player_rw_rechts.png');
        game.load.image('arme_raketenwerfer_links', 'assets/player_rw_links.png');

        // Logo
        game.load.image("Logo", "assets/intro/shot.png");

        // UI - Design Elemente
        game.load.image("rot1", "assets/sprites/rot1.png");
        game.load.image("rot2", "assets/sprites/rot2.png");
        game.load.image("rot1klein", "assets/sprites/rot1klein.png");
        game.load.image("rot2klein", "assets/sprites/rot2klein.png");
        game.load.image("rot1audio", "assets/sprites/rot1audio.png");
        game.load.image("rot2audio", "assets/sprites/rot2audio.png");
        game.load.image("rot1mini", "assets/sprites/rot1mini.png");
        game.load.image("rot2mini", "assets/sprites/rot2mini.png");

    },
    create: function () {

        kasten1 = game.add.sprite(370, 450, "rot1audio");
        kasten1.anchor.set(0.5);
        kasten1background = game.add.sprite(365, 445, "rot2audio");
        kasten1background.anchor.set(0.5);

        kasten2 = game.add.sprite(game.world.centerX, 450, "rot1audio");
        kasten2.anchor.set(0.5);
        kasten2background = game.add.sprite(game.world.centerX - 5, 445, "rot2audio");
        kasten2background.anchor.set(0.5);

        kasten3 = game.add.sprite(630, 450, "rot1audio");
        kasten3.anchor.set(0.5);
        kasten3background = game.add.sprite(625, 445, "rot2audio");
        kasten3background.anchor.set(0.5);

        game.time.events.add(Phaser.Timer.SECOND * 0, ersteAnimationsFunktion, this);
        game.time.events.add(Phaser.Timer.SECOND * 0.33, zweiteAnimationsFunktion, this);
        game.time.events.add(Phaser.Timer.SECOND * 0.66, dritteAnimationsFunktion, this);

        text = game.add.text(game.world.centerX, game.world.centerY, "L O A D I N G", {
            font: "50px Roboto Light",
            fill: "#000000",
            align: "center"
        });
        text.anchor.set(0.5);

        music = new Pizzicato.Sound({
            source: 'file',
            options: {
                path: 'audio/music/endOfLine.mp3',
                loop: true
            }
        }, function () {
            music.play();
        });

        // Skript als State hinzufügen
        game.state.add("Intro", intro);
        game.state.add("MainMenu", mainMenu);
        game.state.add("LevelSelection", levelSelection);
        game.state.add("GameOptions", gameOptions);
        game.state.add("Credits", credits);

    },
    update: function () {
        if (music.playing) {

            // Wenn die Musik fertig geladen ist soll der nächste Zustand gestartet werden

            game.state.start("Intro");
        }
    }
}

function ersteAnimationsFunktion() {
    ladeAnimation(kasten1, kasten1background, a1, b1, 450, 440, 0.3);
}

function zweiteAnimationsFunktion() {
    ladeAnimation(kasten2, kasten2background, a2, b2, 450, 440, 0.3);
}

function dritteAnimationsFunktion() {
    ladeAnimation(kasten3, kasten3background, a3, b3, 450, 440, 0.3);
}

function ladeAnimation(object, objectbackground, tweenname, backgroundname, yFrom, yTo, interval) {

    tweenname = game.add.tween(object);
    tweenname.to({
        y: [yFrom, yTo, yFrom]
    }, 1000, "Linear");

    backgroundname = game.add.tween(objectbackground);
    backgroundname.to({
        y: [yFrom - 5, yTo - 5, yFrom - 5]
    }, 1000, "Linear");

    game.time.events.loop(Phaser.Timer.SECOND * interval, play, this);

    function play() {
        tweenname.start();
        backgroundname.start();
    }
}