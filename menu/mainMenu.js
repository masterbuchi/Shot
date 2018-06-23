var mainMenu = function (game) { }

var playButton;
var playButtonBackground;

var language = 0;

var creditsButton;
var creditsButtonBackground;

var optionsButton;
var optionsButtonBackground;

var menuText;

var bildElementEins;
var bildElementZwei;
var bildElementDrei;

mainMenu.prototype = {
    create: function () {

        // Fenstergröße muss explizit festgelegt werden, da in den Levels verschiedene Größen verwendet werden und durch den Zurück - Button das Layout verrückt werden würde. 
        game.world.setBounds(0, 0, 1000, 700);

        // Hintergrund
        bildElementEins = game.add.sprite(0, 0, "BildElement1");
        bildElementZwei = game.add.sprite(0, 0, "BildElement2");
        bildElementDrei = game.add.sprite(0, 0, "BildElement3");
    
        playButton = game.add.button(game.world.centerX, 300, "rot1klein", startLevelsMenu);
        playButton.anchor.set(0.5);
        playButtonBackground = game.add.sprite(game.world.centerX - 5, 295, "rot2klein");
        playButtonBackground.anchor.set(0.5);

        optionsButton = game.add.button(game.world.centerX, 400, "rot1klein", startOptions);
        optionsButton.anchor.set(0.5);
        optionsButtonBackground = game.add.sprite(game.world.centerX - 5, 395, "rot2klein");
        optionsButtonBackground.anchor.set(0.5);

        creditsButton = game.add.button(game.world.centerX, 500, "rot1klein", startCredits);
        creditsButton.anchor.set(0.5);
        creditsButtonBackground = game.add.sprite(game.world.centerX - 5, 495, "rot2klein");
        creditsButtonBackground.anchor.set(0.5);

        menuText = game.add.text(game.world.centerX, 100, "M E N U", { font: "100px Roboto Light", fill: "#000000", align: "center" });

        menuText.anchor.set(0.5);
        
    },
    update: function () {

        if (language == 0) {
            menuText.text = "M E N U";
        } else {
            menuText.text = "M E N Ü";
        }

        // Bildelemente
        game.add.tween(bildElementEins).to({
            angle: 0,
            x: 0,
            y: 0
        }, 100, Phaser.Easing.Linear.None, true);
        game.add.tween(bildElementZwei).to({
            angle: 0,
            x: 0,
            y: 0
        }, 100, Phaser.Easing.Linear.None, true);
        game.add.tween(bildElementDrei).to({
            angle: 0,
            x: 0,
            y: 0
        }, 100, Phaser.Easing.Linear.None, true);

        if (playButton.input.pointerOver()) {

            menuText.text = "L E V E L S"

            game.add.tween(playButton).to({
                y: 295
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(playButtonBackground).to({
                y: 290
            }, 100, Phaser.Easing.Linear.None, true);

            game.add.tween(bildElementEins).to({
                x: 10,
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(bildElementZwei).to({
                x: 10,
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(bildElementDrei).to({
                x: 10,
            }, 100, Phaser.Easing.Linear.None, true);

        } else {

            game.add.tween(playButton).to({
                y: 300
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(playButtonBackground).to({
                y: 295
            }, 100, Phaser.Easing.Linear.None, true);

        }

        if (optionsButton.input.pointerOver()) {

            if (language == 0) {
                menuText.text = "O P T I O N S";
            } else {
                menuText.text = "O P T I O N E N";
            }

            game.add.tween(optionsButton).to({
                y: 395
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(optionsButtonBackground).to({
                y: 390
            }, 100, Phaser.Easing.Linear.None, true);

            game.add.tween(bildElementEins).to({
                x: -10,
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(bildElementZwei).to({
                x: -10,
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(bildElementDrei).to({
                x: -10,
            }, 100, Phaser.Easing.Linear.None, true);

        } else {

            game.add.tween(optionsButton).to({
                y: 400
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(optionsButtonBackground).to({
                y: 395
            }, 100, Phaser.Easing.Linear.None, true);

        }

        if (creditsButton.input.pointerOver()) {

            if (language == 0) {
                menuText.text = "C R E D I T S";
            } else {
                menuText.text = "A B S P A N N";
            }

            game.add.tween(creditsButton).to({
                y: 495
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(creditsButtonBackground).to({
                y: 490
            }, 100, Phaser.Easing.Linear.None, true);

            game.add.tween(bildElementEins).to({
                y: 10
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(bildElementZwei).to({
                y: 10
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(bildElementDrei).to({
                y: 10
            }, 100, Phaser.Easing.Linear.None, true);

        } else {

            game.add.tween(creditsButton).to({
                y: 500
            }, 100, Phaser.Easing.Linear.None, true);
            game.add.tween(creditsButtonBackground).to({
                y: 495
            }, 100, Phaser.Easing.Linear.None, true);

        }

    }
}

function startLevelsMenu() {
    game.state.start("LevelSelection");
}

function startCredits() {
    game.state.start("Credits");
}

function startOptions() {
    game.state.start("GameOptions");
}

function zurueck() {

    if( filterDa == 1) {   
        music.removeEffect(lowPassFilter);
        
        filterDa = 0;
    }
    game.state.start("MainMenu");


}