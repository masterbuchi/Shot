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
}

var boot = function (game) { };

boot.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#FFFFFF";

        game.load.image("rot1", "assets/sprites/rot1.png");
        game.load.image("rot2", "assets/sprites/rot2.png");
        game.load.image("rot1klein", "assets/sprites/rot1klein.png");
        game.load.image("rot2klein", "assets/sprites/rot2klein.png");
        game.load.image("rot1audio", "assets/sprites/rot1audio.png");
        game.load.image("rot2audio", "assets/sprites/rot2audio.png");
        game.load.image("rot1mini", "assets/sprites/rot1mini.png");
        game.load.image("rot2mini", "assets/sprites/rot2mini.png");

        game.load.script("Preload","menu/preload.js");

        game.load.audio('akSound','audio/sounds/ak47.mp3');
        game.load.audio('pistolenSound', 'audio/sounds/pistole.mp3');
        game.load.audio('raketenwerferSound', 'audio/sounds/raketenwerfer.mp3');
        game.load.audio('shotgunSound','audio/sounds/shotgun.mp3');

        game.load.audio('deathSound', 'audio/sounds/death.mp3');

    },
    create: function () {

        kasten1 = game.add.sprite(370, 450, "rot1audio");
        kasten1.anchor.set(0.5);
        kasten1background = game.add.sprite(365, 445, "rot2audio");
        kasten1background.anchor.set(0.5);

        kasten2 = game.add.sprite(game.world.centerX, 450 ,"rot1audio");
        kasten2.anchor.set(0.5);
        kasten2background = game.add.sprite(game.world.centerX - 5, 445, "rot2audio");
        kasten2background.anchor.set(0.5);

        kasten3 = game.add.sprite(630, 450, "rot1audio");
        kasten3.anchor.set(0.5);
        kasten3background = game.add.sprite(625, 445, "rot2audio");
        kasten3background.anchor.set(0.5);
        
        game.time.events.add(Phaser.Timer.SECOND * 0, ersteAnimationsFunktion , this);
        game.time.events.add(Phaser.Timer.SECOND * 0.3, zweiteAnimationsFunktion , this);
        game.time.events.add(Phaser.Timer.SECOND * 0.6, dritteAnimationsFunktion , this);

        text = game.add.text(game.world.centerX, game.world.centerY, "L O A D I N G", { font: "50px Roboto Light", fill: "#000000", align: "center" });
        text.anchor.set(0.5);

        music = new Pizzicato.Sound('audio/music/endOfLine.mp3', function() {
            
            music.play();
        });
          
          

        game.state.add("Preload", preload);

    },
    update: function () {
        if (music.playing) {
            game.state.start("Preload");
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
    tweenname.to({y: [yFrom, yTo, yFrom] }, 1000, "Linear");

    backgroundname = game.add.tween(objectbackground);
    backgroundname.to({y: [yFrom - 5, yTo - 5, yFrom -5]}, 1000, "Linear");

    game.time.events.loop(Phaser.Timer.SECOND * interval, play, this);

    function play() {
        tweenname.start();
        backgroundname.start();
    }
}