var levelEins = function (game) { };

// Spielelemente
var Plattformen;
// Musik
var music;

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

// Waffen
var munition;

//Waffengruppe (für alle zugreifbar)
var Waffen;


//Gegnergruppen
var GegnerGruppe;

var Leben = 0;
var gegnerZahl = 0;
var gegnerBesiegt = 0;

//Animationsvariablen
var richtung = 0;
let gegner;

var background;
let weltbreite = 2000;
let welthöhe = 2000;

levelEins.prototype = {

    preload: function() {

    },
    create: function() {
        game.add.sprite(0, 0, "background");
    },
    update: function() {
        // game.debug.spriteInfo(player, game.width - 400, game.height - 500);
        // game.debug.spriteBounds(player);


        // Kolissionverwaltung von Waffen, Gegnern, Plattformen & Projektile
        game.physics.arcade.collide(Waffen, Waffen);
        game.physics.arcade.collide(Waffen, GegnerGruppe);
        game.physics.arcade.collide(Waffen, Plattformen);
        game.physics.arcade.collide(GegnerGruppe, Plattformen);
        game.physics.arcade.collide(player, Plattformen);


        // Wenn alle Gegner getötet wurden
        if (GegnerGruppe.total == 0) {
            hauptnachricht.text = 'Gewonnen';
        }
    }
}