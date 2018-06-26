var levelZwei = function (game) {

};


levelZwei.prototype = {

    preload() {
        this.game = game;


        // ----- Sound 
        // Müssen noch eingebaut werden, aber wahrscheinlich in den Klassen nicht hier!
        this.pistolenSound;
        this.shotgunSound;
        this.raketenwerferSound;
        this.akSound;
        this.deathSound;
        this.pistolSound;




    },
    create() {

        // Neuen Song starten

        music.pause(); // Alten Song anhalten
        music = trackTwo; // music überschreiben
        music.play(); // music abspielen lassen

        //Filter löschen, falls noch vorhanden
        if (filterDa == 1) {
            music.removeEffect(lowPassFilter);

            filterDa = 0;
        }


        // Hintergrund
        this.background = this.game.add.sprite(0, 0, 'levelTwoBackground');

        //Animationsvariablen
        this.richtung = 0;
        this.weltbreite = 6000;
        this.welthöhe = 880;


        // Musik 
        filterDa = 0;


        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // Welt vergrößern
        this.game.world.setBounds(0, 0, this.weltbreite, this.welthöhe);



        // Plattformen
        this.Plattformen = this.game.add.group();
        this.Plattformen.enableBody = true;
        this.ledge = this.Plattformen.create(72, this.game.world.height - 518, 'platform1');
        this.ledge2 = this.Plattformen.create(900, this.game.world.height - 370, 'platform2');
        this.ledge3 = this.Plattformen.create(1465, this.game.world.height - 542, 'platform3');
        this.ledge4 = this.Plattformen.create(1460, this.game.world.height - 163, 'platform4');
        this.ledge5 = this.Plattformen.create(3201, this.game.world.height - 430, 'platform5');
        this.ledge6 = this.Plattformen.create(3660, this.game.world.height - 189, 'platform6');
        this.ledge7 = this.Plattformen.create(4140, this.game.world.height - 175, 'platform7');
        this.ledge8 = this.Plattformen.create(4477, this.game.world.height - 537, 'platform8');
        this.ledge9 = this.Plattformen.create(4920, this.game.world.height - 310, 'platform9');
        this.ledge10 = this.Plattformen.create(5368, this.game.world.height - 560, 'platform10');
        this.ledge11 = this.Plattformen.create(5558, this.game.world.height - 298, 'platform11');
        this.ledge12 = this.Plattformen.create(4520, this.game.world.height - 847, 'stalaknat');
        this.ledge13 = this.Plattformen.create(1460, this.game.world.height - 124, 'brocken1');
        this.ledge14 = this.Plattformen.create(3660, this.game.world.height - 140, 'brocken2');
        this.ledge15 = this.Plattformen.create(4140, this.game.world.height - 137, 'brocken3');
        this.ledge16 = this.Plattformen.create(5556, this.game.world.height - 270, 'brocken4');
        this.ledge17 = this.Plattformen.create(1860, this.game.world.height - 930, 'stalaktiten');

        this.ledge.body.immovable = true;
        this.ledge2.body.immovable = true;
        this.ledge3.body.immovable = true;
        this.ledge4.body.immovable = true;
        this.ledge5.body.immovable = true;
        this.ledge6.body.immovable = true;
        this.ledge7.body.immovable = true;
        this.ledge8.body.immovable = true;
        this.ledge9.body.immovable = true;
        this.ledge10.body.immovable = true;
        this.ledge11.body.immovable = true;
        this.ledge12.body.immovable = true;
        this.ledge13.body.immovable = true;
        this.ledge14.body.immovable = true;
        this.ledge15.body.immovable = true;
        this.ledge16.body.immovable = true;
        this.ledge17.body.immovable = true;


        // Hauptnachricht
        this.hauptnachricht = this.game.add.text((this.game.width / 2), (this.game.height / 2) - 200, '', {
            fontSize: '32px',
            fill: '#000'
        });
        this.hauptnachricht.anchor.setTo(0.5);
        this.hauptnachricht.fixedToCamera = true;


        // Munitions Text
        this.munitionsText = this.game.add.text(16, 112, '', {
            fontSize: '32px',
            fill: '#000'
        });
        this.munitionsText.fixedToCamera = true;

        // Waffe ausgerüstet
        this.ausgeruesteterWaffenText = this.game.add.text(16, 64, '', {
            fontSize: '32px',
            fill: '#000'
        });
        this.ausgeruesteterWaffenText.fixedToCamera = true;

        // Gruppe der Gegner
        this.GegnerGruppe = this.game.add.group();
        // Gruppe der Spieler
        this.SpielerGruppe = this.game.add.group();

        // Gruppe der Waffen
        this.Waffen = this.game.add.group();

        // Boden
        this.ground = this.Plattformen.create(0, this.game.world.height - 10, 'groundlevel2');
        this.ground.body.immovable = true;




        // Player
        this.SpielerGruppe.add(new Player(this.game, this.GegnerGruppe, this.Plattformen, this.Waffen, this.hauptnachricht, this.ausgeruesteterWaffenText, this.munitionsText));
        this.player = this.SpielerGruppe.getFirstExists(false);
        this.player.spawn(4300, this.game.world.height - 725, 'keine');



        // Waffen
        for (let j = 0; j < 10; j++) {
            this.Waffen.add(new Waffe(this.game));
        }

        this.pistole = this.Waffen.getFirstExists(false);
        this.pistole.spawn(4000, this.game.world.height - 200, 'ak');
        

        this.pistole = this.Waffen.getFirstExists(false);
        this.pistole.spawn(300, this.game.world.height - 800, 'pistole');

        this.sg = this.Waffen.getFirstExists(false);
        this.sg.spawn(500, this.game.world.height - 800, 'shotgun');

        this.ak = this.Waffen.getFirstExists(false);
        this.ak.spawn(30, this.game.world.height - 800, 'ak');

        this.rw = this.Waffen.getFirstExists(false);
        this.rw.spawn(400, this.game.world.height - 800, 'raketenwerfer');



        //Gegner werden in Gruppe erzeugt
        for (let i = 0; i < 10; i++) {
            this.GegnerGruppe.add(new Gegner(this.game, this.player, this.SpielerGruppe, this.Plattformen, this.GegnerGruppe, this.Waffen, this.hauptnachricht));
        }

        // Gegner werden gespawnt

        //         this.gegner = this.GegnerGruppe.getFirstExists(false);
        //         this.gegner.spawn(350, (this.game.world.height - 500), "schwacherGegner", 'left', 'ak');'


        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(1200, (this.game.world.height - 122), "schwacherGegner", 'kneel_left', 'ak');

        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(3000, (this.game.world.height - 122), "starkerGegner", 'left', 'pistole');
        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(3000, (this.game.world.height - 122), "starkerGegner", 'right', 'pistole');


        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(1511, 200, "schwacherGegner", 'kneel_left', 'shotgun');

        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(2600, (this.game.world.height - 1022), "schwacherGegner", 'kneel_left', 'pistole');


        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(4670, (this.game.world.height - 622), "starkerGegner", 'stand_right', 'raketenwerfer');

        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(5000, (this.game.world.height - 222), "starkerGegner", 'right', 'pistole');


        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(5950, (this.game.world.height - 122), "starkerGegner", 'kneel_left', 'ak');



        // Eingefügt

        this.zurueckButtonBackground = this.game.add.sprite(12, 12, "rot1mini");
        this.zurueckButton = this.game.add.button(10, 10, "rot2mini", this.zurueck);

        this.zurueckButtonBackground.fixedToCamera = true;
        this.zurueckButton.fixedToCamera = true;

        this.nochmalButtonBackground = this.game.add.sprite(42, 12, "rot1mini");
        this.nochmalButton = this.game.add.button(40, 10, "rot2mini", this.levelNeuStarten);

        this.nochmalButtonBackground.fixedToCamera = true;
        this.nochmalButton.fixedToCamera = true;

        // ------------------------------

        // Kamera
        this.game.camera.follow(this.player);
    },
    update() {


        // Musik

        if (this.game.physics.arcade.isPaused == false && filterDa == 1) {
            music.removeEffect(lowPassFilter);

            filterDa = 0;
        }

        if (this.game.physics.arcade.isPaused == true && filterDa == 0) {
            music.addEffect(lowPassFilter);

            filterDa = 1;
        }


        // Kolissionverwaltung von Waffen, Gegnern, Plattformen & Projektile
        this.game.physics.arcade.collide(this.Waffen, this.Waffen);
        this.game.physics.arcade.collide(this.Waffen, this.GegnerGruppe);
        this.game.physics.arcade.collide(this.Waffen, this.Plattformen);
        this.game.physics.arcade.collide(this.GegnerGruppe, this.Plattformen);
        this.game.physics.arcade.collide(this.player, this.Plattformen);


        // Wenn alle Gegner getötet wurden
        if (this.GegnerGruppe.total == 0) {
            this.hauptnachricht.text = 'Gewonnen';
        }
    },


    zurueck() {

        if (filterDa == 1) {
            console.log(music)
            music.removeEffect(lowPassFilter);

            filterDa = 0;
        }
        this.game.state.start("MainMenu");


    },

    levelNeuStarten() {
        if (filterDa == 1) {
            music.removeEffect(lowPassFilter);
            filterDa = 0;
        }
        this.game.state.start("LevelZwei");
    }
}