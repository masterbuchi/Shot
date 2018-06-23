var levelEins = function (game) {};

filterDa = 1;
lowPassFilter = new Pizzicato.Effects.LowPassFilter({});


//Animationsvariablen
richtung = 0;
weltbreite = 2000;
welthöhe = 800;

levelEins.prototype = {

    preload: function () {

    },
    create: function () {

       

        // Musik 
        lowPassFilter = new Pizzicato.Effects.LowPassFilter({});
        music.addEffect(lowPassFilter);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Welt vergrößern
        game.world.setBounds(0, 0, weltbreite, welthöhe);

        // Hintergrund
        background = game.add.tileSprite(0, 0, 2000, 2000, 'levelOneBackground');

        // Plattformen
        Plattformen = game.add.group();
        Plattformen.enableBody = true;
        ledge = Plattformen.create(400, game.world.height - 200, 'platform');
        ledge2 = Plattformen.create(150, game.world.height - 100, 'platform');
        ledge.body.immovable = true;
        ledge2.body.immovable = true;

        // Boden
        ground = Plattformen.create(0, game.world.height - 10, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;


        SpielerGruppe = game.add.group();

        SpielerGruppe.add(new Player(this.game));
        player = SpielerGruppe.getFirstExists(false);
        player.spawn(500, game.world.height - 325, 'keine');


        // Gruppe der Waffen
        Waffen = game.add.group();

        for (let j = 0; j < 10; j++) {
            Waffen.add(new Waffe(this.game));
        }

        pistole = Waffen.getFirstExists(false);
        pistole.spawn(300, game.world.height - 800, 'pistole');

        sg = Waffen.getFirstExists(false);
        sg.spawn(500, game.world.height - 800, 'shotgun');

        ak = Waffen.getFirstExists(false);
        ak.spawn(30, game.world.height - 800, 'ak');

        rw = Waffen.getFirstExists(false);
        rw.spawn(400, game.world.height - 800, 'raketenwerfer');


        // Gruppen der Gegner
        GegnerGruppe = game.add.group();


        //Gegner werden in Gruppe erzeugt
        for (let i = 0; i < 10; i++) {
            GegnerGruppe.add(new Gegner(this.game, player));
        }

        // Gegner werden gespawnt
        gegner = GegnerGruppe.getFirstExists(false);
        gegner.spawn(100, (game.world.height - 222), "starkerGegner", 'right', 'pistole');

        gegner = GegnerGruppe.getFirstExists(false);
        gegner.spawn(900, (game.world.height - 122), "starkerGegner", 'kneel_left', 'raketenwerfer');

        gegner = GegnerGruppe.getFirstExists(false);
        gegner.spawn(350, (game.world.height - 500), "schwacherGegner", 'left', 'ak');

        gegner = GegnerGruppe.getFirstExists(false);
        gegner.spawn(600, (game.world.height - 122), "schwacherGegner", 'kneel_left', 'ak');


        // Munitions Text
        hauptnachricht = game.add.text((game.height / 2), (game.width / 2) - 200, '', {
            fontSize: '32px',
            fill: '#000'
        });
        hauptnachricht.fixedToCamera = true;


        // Munitions Text
        munitionsText = game.add.text(16, 112, '', {
            fontSize: '32px',
            fill: '#000'
        });
        munitionsText.fixedToCamera = true;

        // Waffe ausgerüstet
        ausgeruesteterWaffenText = game.add.text(16, 64, '', {
            fontSize: '32px',
            fill: '#000'
        });
        ausgeruesteterWaffenText.fixedToCamera = true;

        // Eingefügt

        zurueckButtonBackground = game.add.sprite(12, 12, "rot1mini");
        zurueckButton = game.add.button(10, 10, "rot2mini", zurueck);

        zurueckButtonBackground.fixedToCamera = true;
        zurueckButton.fixedToCamera = true;

        nochmalButtonBackground = game.add.sprite(42, 12, "rot1mini");
        nochmalButton = game.add.button(40, 10, "rot2mini", levelNeuStarten);

        nochmalButtonBackground.fixedToCamera = true;
        nochmalButton.fixedToCamera = true;

        // ------------------------------

        // Kamera
        game.camera.follow(player);
    },
    update: function () {

        // Musik

        if (game.physics.arcade.isPaused == false && filterDa == 1) {
            music.removeEffect(lowPassFilter);

            filterDa = 0;
        }

        if (game.physics.arcade.isPaused == true && filterDa == 0) {
            music.addEffect(lowPassFilter);

            filterDa = 1;
        }


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

function zurueck() {

    if (filterDa == 1) {
        music.removeEffect(lowPassFilter);

        filterDa = 0;
    }
    game.state.start("MainMenu");


}

function levelNeuStarten() {

    game.state.start("LevelEins");
}