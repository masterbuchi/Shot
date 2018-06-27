var credits = function (game) { };

var creditsRollEins;
var header;

var ersterText;
var ersterTitel;
var zweiterText;
var zweiterTitel;
var dritterText;
var dritterTitel;
var vierterTitel;
var vierterText;
var fuenfterText;
var fuenfterTitel;
var sechsterTitel;
var sechsterText;
var siebterTitel;
var siebterText;
var achterTitel;
var achterText;

credits.prototype = {
    create: function () {
        // Hintergrund
        game.add.sprite(0, 0, "BildElement1");
        game.add.sprite(0, 0, "BildElement2");
        game.add.sprite(0, 0, "BildElement3");

        header = game.add.text(game.world.centerX, 100, "C R E D I T S", { font: "100px Roboto Light", fill: "#000000", align: "center" });
        header.anchor.set(0.5);

        zurueckButtonBackground = game.add.sprite(12, 12, "rot1mini");
        zurueckButton = game.add.button(10, 10, "back", zurueck);


        fadeInFadeOut("D A N K E   F Ü R S  S P I E L E N","T H A N K S   F O R   P L A Y I N G", ersterTitel, "", ersterText, 0, 2);
        fadeInFadeOut("S P R I T E   D E S I G N E R","S P R I T E   D E S I G N E R", zweiterTitel, "J U L E   M A A ß", zweiterText, 3, 5);
        fadeInFadeOut("G A M E   M E C H A N I C S   E N G I N E E R","G A M E   M E C H A N I C S   E N G I N E E R", dritterTitel, "F L O R I A N   B U C H H O L Z", dritterText, 6, 8);
        fadeInFadeOut("U I   D E S I G N E R","U I   D E S I G N E R", vierterTitel, "L U K A S   W E R D E R M A N N", vierterText, 9, 11);
        fadeInFadeOut("M A I N   T H E M E","M A I N   T H E M E", fuenfterTitel, "D A F T   P U N K   -   E N D   O F   L I N E   R E M I X   B Y   V O I D Z 0 N E", fuenfterText, 12, 14);
        fadeInFadeOut("L E V E L 2   T H E M E", "L E V E L 2   T H E M E", sechsterTitel, "D A F T   P U N K   -   A R M O R Y   R E M I X   B Y   B A S I C   S L A C K", sechsterText, 15, 17);
        fadeInFadeOut("L E V E L 3   T H E M E", "L E V E L 3   T H E M E", siebterTitel, "D A F T   P U N K   -   D E R E Z Z E D   R E M I X   B Y   B A S I C   S L A C K", siebterText, 18, 20);
        fadeInFadeOut("L E V E L 4   T H E M E", "L E V E L 4   T H E M E", achterTitel, "D A F T   P U N K   -   T H E   G A ME   H A S   C H A N G E D ", achterText, 21, 23);

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

        if (language == 0) {
            header.text = "C R E D I T S";
        } else {
            header.text = "A B S P A N N";
        }


        animation(zurueckButton, zurueckButtonBackground, 12, 10, 10, 8, "B A C K", "Z U R Ü C K");

    }
}

function deutschOderEnglisch() {

}

function fadeInFadeOut(ueberschriftDeutsch, ueberschriftEnglisch, ueberschriftText, name ,nameText, anfangsAnimation, endAnimation) {

    if(language == 0 ) {
        ueberschriftText = game.add.text(game.world.centerX, game.world.centerY, ueberschriftEnglisch, { font: "50px Roboto Light", fill: "#000000", align: "center" });
    } else {
        ueberschriftText = game.add.text(game.world.centerX, game.world.centerY, ueberschriftDeutsch, { font: "50px Roboto Light", fill: "#000000", align: "center" });
    }

    ueberschriftText.alpha = 0;
    ueberschriftText.anchor.set(0.5);
    nameText = game.add.text(game.world.centerX, game.world.centerY + 50, name, { font: "25px Roboto", fill: "#000000", align: "center" });
    nameText.alpha = 0;
    nameText.anchor.set(0.5);

    game.time.events.add(Phaser.Timer.SECOND * anfangsAnimation, einblenden, this);

    game.time.events.add(Phaser.Timer.SECOND * endAnimation, ausblenden, this);
    

    function einblenden() {

        game.add.tween(ueberschriftText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        game.add.tween(nameText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

    }
    
    function ausblenden() {

        game.add.tween(ueberschriftText).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        game.add.tween(nameText).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    
    }

}

function zurueck() {
    game.state.start("MainMenu");
}