var levelDrei = function (game) {};

filterDa = 1;
lowPassFilter = new Pizzicato.Effects.LowPassFilter({});


//Animationsvariablen
richtung = 0;
weltbreite = 2500;
welthöhe = 2190;


levelDrei.prototype = {

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
        background = game.add.sprite(0, 0, 'levelThreeBackground');

        // Plattformen
        Plattformen = game.add.group();
        Plattformen.enableBody = true;

        ledge = Plattformen.create(803, game.world.height - 1745, 'felsen1');
        ledge9 = Plattformen.create(1260, game.world.height - 1745, 'felsen2');
        ledge10 = Plattformen.create(847, game.world.height - 1526, 'felsen');
        ledge11 = Plattformen.create(1680, game.world.height - 877, 'felsen3');
        ledge2 = Plattformen.create(-20, game.world.height - 250, '2platform1');
        ledge3 = Plattformen.create(446, game.world.height - 465, '2platform2');
        ledge4 = Plattformen.create(634, game.world.height - 730, '2platform3');
        ledge5 = Plattformen.create(-20, game.world.height - 950, '2platform1');
        ledge6 = Plattformen.create(0, game.world.height - 1220, '2platform3');
        ledge7 = Plattformen.create(450, game.world.height - 1470, '2platform6');
        ledge8 = Plattformen.create(-20, game.world.height - 1900, '2platform6');
        ledge12 = Plattformen.create(2100, game.world.height - 1900, '2platform6');
        ledge13 = Plattformen.create(1973, game.world.height - 1570, '2platform6');
        ledge14 = Plattformen.create(2103, game.world.height - 710, '2platform6');
        ledge15 = Plattformen.create(1774, game.world.height - 370, '2platform7');
        ledge16 = Plattformen.create(1900, game.world.height - 100, '2brocken');
        //  ledge9 = Plattformen.create(1300, game.world.height - 1746, '2platform1');
        //  ledge8 = Plattformen.create(4477, game.world.height - 537, 'platform8');
        // ledge9 = Plattformen.create(4920, game.world.height - 310, 'platform9');
        //  ledge10 = Plattformen.create(5368, game.world.height - 560, 'platform10');
        // ledge11= Plattformen.create(5558, game.world.height - 298, 'platform11');
        // ledge12= Plattformen.create(4520, game.world.height - 847, 'stalaknat');
        // ledge13 = Plattformen.create(1460, game.world.height - 124, 'brocken1');
        // ledge14= Plattformen.create(3660, game.world.height - 140, 'brocken2');
        // ledge15= Plattformen.create(4140, game.world.height - 137, 'brocken3');
        // ledge16= Plattformen.create(5556, game.world.height - 270, 'brocken4');
        // ledge17= Plattformen.create(1860, game.world.height - 930, 'stalaktiten');

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
        // ledge11.body.immovable = true;
        ledge12.body.immovable = true;
        ledge13.body.immovable = true;
        ledge14.body.immovable = true;
        ledge15.body.immovable = true;
        ledge16.body.immovable = true;
        // ledge17.body.immovable = true;
        // Boden
        ground = Plattformen.create(0, game.world.height - 10, 'ground');
        //ground.scale.setTo(2, 2);
        ground.body.immovable = true;


        SpielerGruppe = game.add.group();

        SpielerGruppe.add(new Player(this.game));
        player = SpielerGruppe.getFirstExists(false);
        player.spawn(100, game.world.height - 125, 'keine');


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
        // gegner = GegnerGruppe.getFirstExists(false);
        // gegner.spawn(5000, (game.world.height - 222), "starkerGegner", 'right', 'pistole');

        // gegner = GegnerGruppe.getFirstExists(false);
        // gegner.spawn(4670, (game.world.height - 622), "starkerGegner", 'stand_right', 'raketenwerfer');


        // gegner = GegnerGruppe.getFirstExists(false);
        // gegner.spawn(5800, (game.world.height - 122), "starkerGegner", 'kneel_left', 'ak');

        // gegner = GegnerGruppe.getFirstExists(false);
        // gegner.spawn(350, (game.world.height - 500), "schwacherGegner", 'left', 'ak');

        // gegner = GegnerGruppe.getFirstExists(false);
        // gegner.spawn(600, (game.world.height - 122), "schwacherGegner", 'kneel_left', 'ak');


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


        // Kamera
        game.camera.follow(player);
    },

    update: function () {
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

function zurueck() {

    if (filterDa == 1) {
        music.removeEffect(lowPassFilter);

        filterDa = 0;
    }
    game.state.start("MainMenu");


}

function levelNeuStarten() {

    game.state.start("LevelDrei");
}