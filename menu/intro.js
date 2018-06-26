var intro = function (game) { };

var intro;

var text;
var text2;
var text3;
var text4;

var logo;

var audioVisiualizer1;
var audioVisiualizer1Background;

var audioVisiualizer2;
var audioVisiualizer2Background;

var audioVisiualizer3;
var audioVisiualizer3Background;

var skipIntro;

intro.prototype = {
    create: function () {
        skipIntro = game.add.button(0, 0, "whiteBackground", starteMenu);

        audioVisiualizer1 = game.add.sprite(370, 450 ,"rot1audio");
        audioVisiualizer1.anchor.set(0.5);
        audioVisiualizer1Background = game.add.sprite(365, 445, "rot2audio");
        audioVisiualizer1Background.anchor.set(0.5);
        audioVisiualizer1.alpha = 1;
        audioVisiualizer1Background.alpha = 1;

        audioVisiualizer2 = game.add.sprite(game.world.centerX, 450 ,"rot1audio");
        audioVisiualizer2.anchor.set(0.5);
        audioVisiualizer2Background = game.add.sprite(game.world.centerX - 5, 445, "rot2audio");
        audioVisiualizer2Background.anchor.set(0.5);
        audioVisiualizer2.alpha = 0;
        audioVisiualizer2Background.alpha = 0;

        audioVisiualizer3 = game.add.sprite(630 , 450 ,"rot1audio");
        audioVisiualizer3.anchor.set(0.5);
        audioVisiualizer3Background = game.add.sprite( 625, 445, "rot2audio");
        audioVisiualizer3Background.anchor.set(0.5);
        audioVisiualizer3.alpha = 0;
        audioVisiualizer3Background.alpha = 0;

        logo = game.add.sprite(game.world.centerX , game.world.centerY - 75, "Logo");

        logo.anchor.set(0.5);
        //logo.scale.set(0.25);
        logo.alpha = 0;

        text = game.add.text(game.world.centerX, game.world.centerY - 75, "E R R O R   4 0 4",  { font: "70px Roboto Light", fill: "#000000", align: "center" });
        text.anchor.set(0.5);
        text.alpha = 0;

        text2 = game.add.text(game.world.centerX, game.world.centerY - 75, "P R O U D L Y   P R E S E N T S",  { font: "70px Roboto Light", fill: "#000000", align: "center" });
        text2.anchor.set(0.5);
        text2.alpha = 0;

        text3 = game.add.text(game.world.centerX, game.world.centerY - 75, "A N   A C T I O N - S H O O T E R",  { font: "70px Roboto Light", fill: "#000000", align: "center" });
        text3.anchor.set(0.5);
        text3.alpha = 0;

        text4 = game.add.text(game.world.centerX, game.world.centerY - 75, "R E A D Y  ?",  { font: "70px Roboto Light", fill: "#000000", align: "center" });
        text4.anchor.set(0.5);
        text4.alpha = 0;
        
        game.time.events.add(Phaser.Timer.SECOND * 0.0, function() { text.alpha = 1; }, this);
        game.time.events.add(Phaser.Timer.SECOND * 1.2, function() { text.alpha = 0; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 1.8, function() { text2.alpha = 1; }, this);
        game.time.events.add(Phaser.Timer.SECOND * 3.0, function() { text2.alpha = 0; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 3.6, function() { text3.alpha = 1; }, this);
        game.time.events.add(Phaser.Timer.SECOND * 4.8 , function() { text3.alpha = 0; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 5.4, function() { logo.alpha = 1; }, this);
        game.time.events.add(Phaser.Timer.SECOND * 6.6, function() { logo.alpha = 0; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 7.2, function() { text4.alpha = 1; }, this);
        game.time.events.add(Phaser.Timer.SECOND * 8.4, function() { text4.alpha = 0; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 0, firstAudioVisiualiser , this);
        game.time.events.add(Phaser.Timer.SECOND * 0, secondAudioVisiualizer , this);
        game.time.events.add(Phaser.Timer.SECOND * 0, thirdAudioVisiualizer, this);
  
        game.time.events.add(Phaser.Timer.SECOND * 9, starteMenu, this);

    }
}

function playDrei() {
    if(audioVisiualizer3.alpha == 1) {
        audioVisiualizer3.alpha = 0;
        audioVisiualizer3Background.alpha = 0;  
    } else {
        audioVisiualizer3.alpha = 1;
        audioVisiualizer3Background.alpha = 1;
    }
}

function playEins() {

    if(audioVisiualizer1.alpha == 1) {
        audioVisiualizer1.alpha = 0;
        audioVisiualizer1Background.alpha = 0;  
    } else {
        audioVisiualizer1.alpha = 1;
        audioVisiualizer1Background.alpha = 1;
    }
}

function playZwei() {
    if(audioVisiualizer2.alpha == 1) {
        audioVisiualizer2.alpha = 0;
        audioVisiualizer2Background.alpha = 0;  
    } else {
        audioVisiualizer2.alpha = 1;
        audioVisiualizer2Background.alpha = 1;
    }
}

function thirdAudioVisiualizer() {
    game.time.events.loop(Phaser.Timer.SECOND * 0.3, playDrei, this);
}

function secondAudioVisiualizer() {
    game.time.events.loop(Phaser.Timer.SECOND * 0.6, playZwei, this);
}

function firstAudioVisiualiser() {
    game.time.events.loop(Phaser.Timer.SECOND * 0.6, playEins, this);
}

function starteMenu () {
    game.state.start("MainMenu");
}