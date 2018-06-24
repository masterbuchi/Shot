var levelDrei = function (game) {};


levelDrei.prototype = {

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


        //Filter löschen, falls noch vorhanden
        if (filterDa == 1) {
            music.removeEffect(lowPassFilter);

            filterDa = 0;
        }

        // Hintergrund
        this.background = this.game.add.sprite(0, 0, 'levelThreeBackground');

        //Animationsvariablen
        this.richtung = 0;
        this.weltbreite = 2500;
        this.welthöhe = 2190;

        // Musik 
       filterDa = 0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // Welt vergrößern
        this.game.world.setBounds(0, 0, this.weltbreite, this.welthöhe);


        // Plattformen
        this.Plattformen = this.game.add.group();
        this.Plattformen.enableBody = true;

        this.ledge = this.Plattformen.create(803, this.game.world.height - 1745, 'felsen1');
        this.ledge9 = this.Plattformen.create(1260, this.game.world.height - 1745, 'felsen2');
        this.ledge10 = this.Plattformen.create(847, this.game.world.height - 1526, 'felsen');
        this.ledge11 = this.Plattformen.create(1680, this.game.world.height - 877, 'felsen3');
        this.ledge2 = this.Plattformen.create(-20, this.game.world.height - 250, '2platform1');
        this.ledge3 = this.Plattformen.create(446, this.game.world.height - 465, '2platform2');
        this.ledge4 = this.Plattformen.create(634, this.game.world.height - 730, '2platform3');
        this.ledge5 = this.Plattformen.create(-20, this.game.world.height - 950, '2platform1');
        this.ledge6 = this.Plattformen.create(0, this.game.world.height - 1220, '2platform3');
        this.ledge7 = this.Plattformen.create(450, this.game.world.height - 1470, '2platform6');
        this.ledge8 = this.Plattformen.create(-20, this.game.world.height - 1900, '2platform6');
        this.ledge12 = this.Plattformen.create(2100, this.game.world.height - 1900, '2platform6');
        this.ledge13 = this.Plattformen.create(1973, this.game.world.height - 1570, '2platform6');
        this.ledge14 = this.Plattformen.create(2103, this.game.world.height - 710, '2platform6');
        this.ledge15 = this.Plattformen.create(1774, this.game.world.height - 370, '2platform7');
        this.ledge16 = this.Plattformen.create(1900, this.game.world.height - 100, '2brocken');
        //   this.ledge9 =  this.Plattformen.create(1300,  this.game.world.height - 1746, '2platform1');
        //   this.ledge8 =  this.Plattformen.create(4477,  this.game.world.height - 537, 'platform8');
        //  this.ledge9 =  this.Plattformen.create(4920,  this.game.world.height - 310, 'platform9');
        //   this.ledge10 =  this.Plattformen.create(5368,  this.game.world.height - 560, 'platform10');
        //  this.ledge11=  this.Plattformen.create(5558,  this.game.world.height - 298, 'platform11');
        //  this.ledge12=  this.Plattformen.create(4520,  this.game.world.height - 847, 'stalaknat');
        //  this.ledge13 =  this.Plattformen.create(1460,  this.game.world.height - 124, 'brocken1');
        //  this.ledge14=  this.Plattformen.create(3660,  this.game.world.height - 140, 'brocken2');
        //  this.ledge15=  this.Plattformen.create(4140,  this.game.world.height - 137, 'brocken3');
        //  this.ledge16=  this.Plattformen.create(5556,  this.game.world.height - 270, 'brocken4');
        //  this.ledge17=  this.Plattformen.create(1860,  this.game.world.height - 930, 'stalaktiten');

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
        //  this.ledge11.body.immovable = true;
        this.ledge12.body.immovable = true;
        this.ledge13.body.immovable = true;
        this.ledge14.body.immovable = true;
        this.ledge15.body.immovable = true;
        this.ledge16.body.immovable = true;
        //  this.ledge17.body.immovable = true;


         // Hauptnachricht
         this.hauptnachricht = this.game.add.text((this.game.height / 2), (this.game.width / 2) - 200, '', {
            fontSize: '32px',
            fill: '#000'
        });
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
        this.ground = this.Plattformen.create(0, this.game.world.height - 10, 'groundlevel3');
        //ground.scale.setTo(2, 2);
        this.ground.body.immovable = true;




        this.SpielerGruppe.add(new Player(this.game, this.GegnerGruppe, this.Plattformen, this.Waffen, this.hauptnachricht, this.ausgeruesteterWaffenText, this.munitionsText));
        this.player = this.SpielerGruppe.getFirstExists(false);
        this.player.spawn(100, this.game.world.height - 125, 'keine');



        for (let j = 0; j < 10; j++) {
            this.Waffen.add(new Waffe(this.game));
        }

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

        //  Gegner werden gespawnt
        // this.gegner = this.GegnerGruppe.getFirstExists(false);
        // this.gegner.spawn(5000, (this.game.world.height - 222), "starkerGegner", 'right', 'pistole');

        // this.gegner = this.GegnerGruppe.getFirstExists(false);
        // this.gegner.spawn(4670, (this.game.world.height - 622), "starkerGegner", 'stand_right', 'raketenwerfer');


        // this.gegner = this.GegnerGruppe.getFirstExists(false);
        // this.gegner.spawn(5800, (this.game.world.height - 122), "starkerGegner", 'kneel_left', 'ak');

        // this.gegner = this.GegnerGruppe.getFirstExists(false);
        // this.gegner.spawn(350, (this.game.world.height - 500), "schwacherGegner", 'left', 'ak');

        // this.gegner = this.GegnerGruppe.getFirstExists(false);
        // this.gegner.spawn(600, (this.game.world.height - 122), "schwacherGegner", 'kneel_left', 'ak');



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

    update () {
        // Musik

        if (this.game.physics.arcade.isPaused == false &&  filterDa == 1) {
            music.removeEffect(lowPassFilter);

             filterDa = 0;
        }

        if (this.game.physics.arcade.isPaused == true &&  filterDa == 0) {
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
     
        if ( filterDa == 1) {
            console.log(music)
            music.removeEffect(lowPassFilter);

             filterDa = 0;
        }
        this.game.state.start("MainMenu");


    },

    levelNeuStarten() {
        if ( filterDa == 1) {
            music.removeEffect(lowPassFilter);
             filterDa = 0;
        }
        this.game.state.start("LevelDrei");
    }
}