var levelZwei = function (game) {};

filterDa = 1;
lowPassFilter = new Pizzicato.Effects.LowPassFilter({});


//Animationsvariablen
richtung = 0;
weltbreite = 6000;
welthöhe = 880;


levelZwei.prototype = {

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
        background = game.add.sprite(0, 0, 'levelTwoBackground');

        // Plattformen
        Plattformen = game.add.group();
        Plattformen.enableBody = true;
        ledge = Plattformen.create(72, game.world.height - 518, 'platform1');
        ledge2 = Plattformen.create(900, game.world.height - 370, 'platform2');
        ledge3 = Plattformen.create(1465, game.world.height - 542, 'platform3');
        ledge4 = Plattformen.create(1460, game.world.height - 163, 'platform4');
        ledge5 = Plattformen.create(3201, game.world.height - 430, 'platform5');
        ledge6 = Plattformen.create(3660, game.world.height - 189, 'platform6');
        ledge7 = Plattformen.create(4140, game.world.height - 175, 'platform7');
        ledge8 = Plattformen.create(4477, game.world.height - 537, 'platform8');
        ledge9 = Plattformen.create(4920, game.world.height - 310, 'platform9');
        ledge10 = Plattformen.create(5368, game.world.height - 560, 'platform10');
        ledge11 = Plattformen.create(5558, game.world.height - 298, 'platform11');
        ledge12 = Plattformen.create(4520, game.world.height - 847, 'stalaknat');
        ledge13 = Plattformen.create(1460, game.world.height - 124, 'brocken1');
        ledge14 = Plattformen.create(3660, game.world.height - 140, 'brocken2');
        ledge15 = Plattformen.create(4140, game.world.height - 137, 'brocken3');
        ledge16 = Plattformen.create(5556, game.world.height - 270, 'brocken4');
        ledge17 = Plattformen.create(1860, game.world.height - 930, 'stalaktiten');

        ledge.body.immovable = true;
        ledge2.body.immovable = true;
        ledge3.body.immovable = true;
        ledge4.body.immovable = true;
        ledge5.body.immovable = true;
        ledge6.body.immovable = true;
        ledge7.body.immovable = true;
        ledge8.body.immovable = true;
        ledge9.body.immovable = true;
        ledge10.body.immovable = true;
        ledge11.body.immovable = true;
        ledge12.body.immovable = true;
        ledge13.body.immovable = true;
        ledge14.body.immovable = true;
        ledge15.body.immovable = true;
        ledge16.body.immovable = true;
        ledge17.body.immovable = true;
        
        // Boden
        ground = Plattformen.create(0, game.world.height - 10, 'groundlevel2');
        ground.body.immovable = true;


        SpielerGruppe = game.add.group();

        SpielerGruppe.add(new Player(this.game));
        player = SpielerGruppe.getFirstExists(false);
        player.spawn(4300, game.world.height - 725, 'keine');


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
        gegner.spawn(5000, (game.world.height - 222), "starkerGegner", 'right', 'pistole');

        gegner = GegnerGruppe.getFirstExists(false);
        gegner.spawn(4670, (game.world.height - 622), "starkerGegner", 'stand_right', 'raketenwerfer');


        gegner = GegnerGruppe.getFirstExists(false);
        gegner.spawn(5800, (game.world.height - 122), "starkerGegner", 'kneel_left', 'ak');

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

    game.state.start("LevelZwei");
}