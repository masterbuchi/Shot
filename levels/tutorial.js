var tutorial = function (game) {};




//Animationsvariablen


tutorial.prototype = {

    preload() {
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
        this.background = this.game.add.tileSprite(0, 0, 2000, 2000, 'background_tut');
        
        // Musik 
         filterDa = 0;

        this.weltbreite = 2000;
        this.welthöhe = 900;


        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Welt vergrößern
        game.world.setBounds(0, 0, this.weltbreite, this.welthöhe);



        // Plattformen
        this.Plattformen = this.game.add.group();
        this.Plattformen.enableBody = true;
        this.ledge = this.Plattformen.create(500, this.game.world.height - 300, 'platform');
        this.ledge2 = this.Plattformen.create(150, this.game.world.height - 100, 'platform');
        this.ledge.body.immovable = true;
        this.ledge2.body.immovable = true;

        // Boden
        this.ground = this.Plattformen.create(0, this.game.world.height - 10, 'ground');
        this.ground.scale.setTo(2, 2);
        this.ground.body.immovable = true;

        // Hauptnachricht
        this.hauptnachricht = this.game.add.text((this.game.width / 2), (this.game.height / 2) -200, '', {
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



        // Die Gruppen müssen zur Übergabe an Player und Gegner bereits existieren

        // Gruppe der Gegner
        this.GegnerGruppe = this.game.add.group();
        // Gruppe der Spieler
        this.SpielerGruppe = this.game.add.group();

        // Gruppe der Waffen
        this.Waffen = this.game.add.group();


        this.SpielerGruppe.add(new Player(this.game, this.GegnerGruppe, this.Plattformen, this.Waffen, this.hauptnachricht, this.ausgeruesteterWaffenText, this.munitionsText));
        this.player = this.SpielerGruppe.getFirstExists(false);
        this.player.spawn(500, this.game.world.height - 425, 'keine');




        for (let j = 0; j < 10; j++) {
            this.Waffen.add(new Waffe(this.game));
        }

        // this.pistole = this.Waffen.getFirstExists(false);
        // this.pistole.spawn(600, this.game.world.height - 800, 'pistole');

        this.sg = this.Waffen.getFirstExists(false);
        this.sg.spawn(500, this.game.world.height - 800, 'shotgun');

        this.ak = this.Waffen.getFirstExists(false);
        this.ak.spawn(700, this.game.world.height - 800, 'ak');

        this.rw = this.Waffen.getFirstExists(false);
        this.rw.spawn(900, this.game.world.height - 800, 'raketenwerfer');





        //Gegner werden in Gruppe erzeugt
        for (let i = 0; i < 10; i++) {
            this.GegnerGruppe.add(new Gegner(this.game, this.player, this.SpielerGruppe, this.Plattformen, this.GegnerGruppe, this.Waffen, this.hauptnachricht));
        }

        // Gegner werden gespawnt
        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(100, (this.game.world.height - 222), "starkerGegner", 'right', 'pistole');

        // this.gegner = this.GegnerGruppe.getFirstExists(false);
        // this.gegner.spawn(900, (this.game.world.height - 122), "starkerGegner", 'kneel_left', 'raketenwerfer');

        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(900, (this.game.world.height - 122), "schwacherGegner", 'kneel_left', 'shotgun');

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
    update() {


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
        this.game.state.start("Tutorial");
    }
}






