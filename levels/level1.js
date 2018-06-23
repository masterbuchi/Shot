var levelEins = function (game) {};




//Animationsvariablen


levelEins.prototype = {

    preload: function () {
         // ----- Sound 
        this.lowPassFilter;
        this.pistolenSound;
        this.shotgunSound;
        this.raketenwerferSound;
        this.akSound;
        this.deathSound;
        this.pistolSound;
    
        // ------ Spielelemente
    
        this.Plattformen;
    
        // Menuinformationen
        this.hauptnachricht;
        this.ausgeruesteterWaffenText;
        this.munitionsText;
        // Steuerungsvariablen
        this.spaceKey;
        this.wKey;
        this.aKey;
        this.sKey;
        this.dKey;
    
    
        this.player;
    
        //Waffengruppe
        this.Waffen;
        //Spielergruppe
        this.SpielerGruppe;
        //Gegnergruppen
        this.GegnerGruppe;
    
        //Animationsvariablen
        this.richtung;
        this.gegner;
    
        this.background;
        this.weltbreite;
        this.welthöhe;
           
    },
    create: function () {

       
        // Munitions Text
        this.hauptnachricht = game.add.text((game.height / 2), (game.width / 2) - 200, '', {
            fontSize: '32px',
            fill: '#000'
        });
        this.hauptnachricht.fixedToCamera = true;


        // Munitions Text
        this.munitionsText = game.add.text(16, 112, '', {
            fontSize: '32px',
            fill: '#000'
        });
        this.munitionsText.fixedToCamera = true;

        // Waffe ausgerüstet
        this.ausgeruesteterWaffenText = game.add.text(16, 64, '', {
            fontSize: '32px',
            fill: '#000'
        });
        this.ausgeruesteterWaffenText.fixedToCamera = true;
        this.weltbreite = 2000;
        this.welthöhe = 800;

        // Musik 
        this.lowPassFilter = new Pizzicato.Effects.LowPassFilter({});
        music.addEffect(this.lowPassFilter);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Welt vergrößern
        game.world.setBounds(0, 0, this.weltbreite, this.welthöhe);

        // Hintergrund
        this.background = game.add.tileSprite(0, 0, 2000, 2000, 'levelOneBackground');

        // Plattformen
        this.Plattformen = game.add.group();
        this.Plattformen.enableBody = true;
        this.ledge = this.Plattformen.create(400, game.world.height - 200, 'platform');
        this.ledge2 = this.Plattformen.create(150, game.world.height - 100, 'platform');
        this.ledge.body.immovable = true;
        this.ledge2.body.immovable = true;

        // Boden
        this.ground = this.Plattformen.create(0, game.world.height - 10, 'ground');
        this.ground.scale.setTo(2, 2);
        this.ground.body.immovable = true;
        
        // Gruppe der Gegner
        this.GegnerGruppe = game.add.group();
        // Gruppe der Spieler
        this.SpielerGruppe = game.add.group();

        this.SpielerGruppe.add(new Player(this.game, this.GegnerGruppe, this.Plattformen, this.Waffen, this.hauptnachricht));
        this.player = this.SpielerGruppe.getFirstExists(false);
        this.player.spawn(500, game.world.height - 325, 'keine');


        // Gruppe der Waffen
        this.Waffen = game.add.group();

        for (let j = 0; j < 10; j++) {
            this.Waffen.add(new Waffe(this.game));
        }

        this.pistole = this.Waffen.getFirstExists(false);
        this.pistole.spawn(300, game.world.height - 800, 'pistole');

        this.sg = this.Waffen.getFirstExists(false);
        this.sg.spawn(500, game.world.height - 800, 'shotgun');

        this.ak = this.Waffen.getFirstExists(false);
        this.ak.spawn(30, game.world.height - 800, 'ak');

        this.rw = this.Waffen.getFirstExists(false);
        this.rw.spawn(400, game.world.height - 800, 'raketenwerfer');


   


        //Gegner werden in Gruppe erzeugt
        for (let i = 0; i < 10; i++) {
            this.GegnerGruppe.add(new Gegner(this.game, this.player, this.SpielerGruppe, this.Plattformen, this.GegnerGruppe, this.Waffen,this.hauptnachricht));
        }

        // Gegner werden gespawnt
        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(100, (game.world.height - 222), "starkerGegner", 'right', 'pistole');

        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(900, (game.world.height - 122), "starkerGegner", 'kneel_left', 'raketenwerfer');

        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(350, (game.world.height - 500), "schwacherGegner", 'left', 'ak');

        this.gegner = this.GegnerGruppe.getFirstExists(false);
        this.gegner.spawn(600, (game.world.height - 122), "schwacherGegner", 'kneel_left', 'ak');


        

        // Eingefügt

        this.zurueckButtonBackground = game.add.sprite(12, 12, "rot1mini");
        this.zurueckButton = game.add.button(10, 10, "rot2mini", this.zurueck);

        this.zurueckButtonBackground.fixedToCamera = true;
        this.zurueckButton.fixedToCamera = true;

        this.nochmalButtonBackground = game.add.sprite(42, 12, "rot1mini");
        this.nochmalButton = game.add.button(40, 10, "rot2mini", this.levelNeuStarten);

        this.nochmalButtonBackground.fixedToCamera = true;
        this.nochmalButton.fixedToCamera = true;

        // ------------------------------

        // Kamera
        game.camera.follow(this.player);
    },
    update: function () {

        // Musik

        if (game.physics.arcade.isPaused == false && this.filterDa == 1) {
            music.removeEffect(this.lowPassFilter);

            this.filterDa = 0;
        }

        if (game.physics.arcade.isPaused == true && this.filterDa == 0) {
            music.addEffect(this.lowPassFilter);

            this.filterDa = 1;
        }


        // Kolissionverwaltung von Waffen, Gegnern, Plattformen & Projektile
        game.physics.arcade.collide(this.Waffen, this.Waffen);
        game.physics.arcade.collide(this.Waffen, this.GegnerGruppe);
        game.physics.arcade.collide(this.Waffen, this.Plattformen);
        game.physics.arcade.collide(this.GegnerGruppe, this.Plattformen);
        game.physics.arcade.collide(this.player, this.Plattformen);


        // Wenn alle Gegner getötet wurden
        if (this.GegnerGruppe.total == 0) {
            this.hauptnachricht.text = 'Gewonnen';
        }
    }
}

function zurueck() {

    if (this.filterDa == 1) {
        music.removeEffect(this.lowPassFilter);

        this.filterDa = 0;
    }
    game.state.start("MainMenu");


}

function levelNeuStarten() {

    game.state.start("LevelEins");
}