
var tutorial = function (game) { };

var lowPassFilter;

lowPassFilter = new Pizzicato.Effects.LowPassFilter({
});

var filterDa = 1;

var pistolenSound;
var shotgunSound;
var raketenwerferSound;
var akSound;

var deathSound;

// Neu
var LebenErsterGegner = 100;

var pistolSound;

// Coole Variable
var SchussPassiertjetzt = 0;

// Spielelemente
var platforms;

// Menuinformationen
var score = 0;
var scoreText;
var ausgeruesteterWaffenText;
var munitionsText;
var youWinText;

// Steuerungsvariablen
var spaceKey;
var wKey;
var aKey;
var sKey;
var dKey;

// Waffen
var munition;

// Schussarten
var akSchuss;
var shotgunSchuss;
var pistolenSchuss;

// Waffe aufgenommen
var sgAufgenommen;
var rwAufgenommen;
var akAufgenommen;
var pistoleAufgenommen;

// Raketenwerfer
var raketenexplosion;
    
//Gegner

// MUSS ÜBERARBEITET WERDEN
var Leben = 0;
var gegnerZahl = 0;
var gegnerBesiegt = 0;
var animation = 1;
//Animationsvariablen

var richtung = 0;
var aktiv = false;
var gegneraktiv = false;

speed = 10;
var left = 0;
var frame_left = 0;
var right = 0;
var frame_right = 0;
var jump_left = 0;
var jump_right = 0;
var frame_jl = 0;
var frame_jr = 0;

tutorial.prototype = {


    preload: function () {
        // Hintergrund
        game.load.image('sky', 'assets/backgrounds/mainbackground.png');
        // Plattform
        game.load.image('platform', 'assets/platform.png');
        // Boden
        game.load.image('ground', 'assets/ground.png');

        game.load.image('starkerGegner', 'assets/starkerGegner.png');

        game.load.spritesheet('player', 'assets/horstiflo.png', 79.4, 121.5);
        game.load.spritesheet('schwacherGegner', 'assets/enemy.png', 127.2, 116);


        // Waffen
        // Raketenwerfer
        game.load.image('Raketenwerfer', 'assets/raketenwerfer.png');
        game.load.image('rakete', 'assets/rakete.png');
        game.load.image('Explosion', 'assets/raketenexplosion.png');
        game.load.image('raketenspur', 'assets/raketenspur.png');

        // Shotgun
        game.load.image('shotgunSchuss', 'assets/shotgunSchuss.png');
        game.load.image('shotgun', 'assets/shotgun.png');

        // Pistole
        game.load.image('pistole', 'assets/pistole.png');
        game.load.image('pistolenSchuss', 'assets/pistolenSchuss.png');

        // AK
        game.load.image('ak', 'assets/ak47.png');
        game.load.image('akSchuss', 'assets/akSchuss.png');

    
    },
    create: function () {

        pistolenSound = game.add.audio('pistolenSound');
        akSound = game.add.audio('akSound');
        raketenwerferSound = game.add.audio('raketenwerferSound');
        shotgunSound = game.add.audio('shotgunSound');
        deathSound = game.add.audio('deathSound');

        raketenwerferSound.volume = music.volume;
        akSound.volume = music.volume;
        pistolenSound.volume = music.volume;
        shotgunSound.volume = music.volume;
        deathSound.volume = music.volume;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Welt vergrößern
        game.world.setBounds(0, 0, 1600, 700);

        // Hintergrund
        game.add.sprite(0, 0, 'sky');

        // Plattformen
        platforms = game.add.group();
        platforms.enableBody = true;
        ledge = platforms.create(300, 300, 'platform');
        ledge2 = platforms.create(150, 100, 'platform');
        ledge.body.immovable = true;
        ledge2.body.immovable = true;

        // Boden
        ground = platforms.create(0, game.world.height - 1, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        // Player
        player = game.add.sprite(500, game.world.height - 125, 'player');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 200;
        player.body.collideWorldBounds = true;
        player.scale.setTo(0.5, 0.5);


        // player.animations.add('still', 18, 10, true);
        player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        player.animations.add('left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        player.animations.add('jump_right', [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            10, false);
        player.animations.add('jump_left', [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
            10, false);

        // schwacherGegner
        schwacherGegner = game.add.sprite(650, game.world.height - 122, 'schwacherGegner');
        game.physics.arcade.enable(schwacherGegner);
        schwacherGegner.body.gravity.y = 200;
        schwacherGegner.body.collideWorldBounds = true;
        schwacherGegner.scale.setTo(0.5, 0.5);
        gegnerZahl = gegnerZahl + 1;
        schwacherGegner.animations.add('gegner_left', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);

        // ZweiterSchwacherGegner


        // starkerGegner
        starkerGegner = game.add.sprite(200, 400, 'starkerGegner');
        game.physics.arcade.enable(starkerGegner);
        starkerGegner.body.gravity.y = 200;
        starkerGegner.body.collideWorldBounds = true;
        gegnerZahl = gegnerZahl + 1;

        // ak47
        ak = game.add.sprite(30, 400, 'ak');
        game.physics.arcade.enable(ak);
        ak.body.gravity.y = 200;
        ak.body.bounce.y = 0.1;
        ak.body.collideWorldBounds = true;

        // Ak - Projektil kriegt Eigenschaften
        akSchuss = game.add.weapon(6, 'akSchuss');
        akSchuss.enableBody = true;
        akSchuss.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        akSchuss.bulletSpeed = 500;
        akSchuss.fireRate = 60;
        akSchuss.fireLimit = 6;
        akSchuss.trackSprite(player, 30, 0);

        // Pistole
        pistole = game.add.sprite(300, 200, 'pistole');
        game.physics.arcade.enable(pistole);
        pistole.body.gravity.y = 200;
        pistole.body.bounce.y = 0.1;
        pistole.body.collideWorldBounds = true;

        // Pistolen - Projektil kriegt Eigenschaften
        pistolenSchuss = game.add.weapon(12, 'pistolenSchuss');
        pistolenSchuss.enableBody = true;
        pistolenSchuss.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        pistolenSchuss.bulletSpeed = 500;
        pistolenSchuss.fireRate = 1000;
        pistolenSchuss.fireLimit = 12;
        pistolenSchuss.trackSprite(player, 30, 0);

        // Raketenwerfer
        rw = game.add.sprite(400, 400, 'Raketenwerfer');
        game.physics.arcade.enable(rw);
        rw.body.gravity.y = 200;
        rw.body.bounce.y = 0.1;
        rw.collideWorldBounds = true;
        rw.scale.setTo(0.5, 0.5);

        // Raketenwerfer - Projektil kriegt Eigenschaften
        rakete = game.add.weapon(5, 'rakete');
        rakete.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        rakete.enableBody = true;
        rakete.bulletSpeed = 200;
        rakete.fireRate = 200;
        rakete.fireLimit = 3;
        rakete.trackSprite(player, 30, 0);

        // Shotgun
        sg = game.add.sprite(200, 30, 'shotgun');
        game.physics.arcade.enable(sg);
        sg.body.gravity.y = 200;
        sg.body.bounce.y = 0.5;
        sg.collideWorldBounds = true;

        // Shotgun - Projektil kriegt Eigenschaften
        shotgunSchuss = game.add.weapon(25, 'shotgunSchuss');
        shotgunSchuss.enableBody = true;
        shotgunSchuss.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        shotgunSchuss.fireRate = 500;
        shotgunSchuss.bulletSpeed = 500;
        shotgunSchuss.multiFire = true;
        shotgunSchuss.bulletAngleVariance = 7;
        shotgunSchuss.trackSprite(player, 30, 0);

        // Gruppen
        // Gegner
        gegner = game.add.group();
        gegner.add(starkerGegner);
        gegner.add(schwacherGegner);

        // Waffen
        waffen = game.add.group();
        waffen.add(pistole);
        waffen.add(ak);
        waffen.add(rw);
        waffen.add(sg);

        // Einfache Projektile
        einfacheProjektile = game.add.group();
        einfacheProjektile.add(akSchuss.bullets);
        einfacheProjektile.add(shotgunSchuss.bullets);
        einfacheProjektile.add(pistolenSchuss.bullets);

        // Steuerung
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        // Score Text
        scoreText = game.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
        scoreText.fixedToCamera = true;

        // Win Text

        youWinText = game.add.text(250, 300, '', {
            fontSize: '50px',
            fill: '#000'
        });
        youWinText.fixedToCamera = true;

        // Game Over Text
        gameOverText = game.add.text(250, 300, '', {
            fontSize: '50px',
            fill: '#000'
        });
        gameOverText.fixedToCamera = true;

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

        // Einfügen

        zurueckButtonBackground = game.add.sprite(12, 12, "rot1mini");
        zurueckButton = game.add.button(10, 10, "rot2mini", zurueck);

        zurueckButtonBackground.fixedToCamera = true;
        zurueckButton.fixedToCamera = true;

        // ------------------------------


        // Startanimationen

        schwacherGegner.animations.play('gegner_left');

       music.addEffect(lowPassFilter);

    },

    update: function () {

        // Einfügen

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

        animation(zurueckButton, zurueckButtonBackground, 12, 10, 10, 8, "B A C K", "Z U R Ü C K");

        // -----------------------------------------

        game.debug.body;


        // Musikfunktionen

        if(game.physics.arcade.isPaused == false && filterDa == 1) {
            music.removeEffect(lowPassFilter);
        
            filterDa = 0;
        }
        
        if(game.physics.arcade.isPaused == true && filterDa == 0) {
            music.addEffect(lowPassFilter);

            filterDa = 1;
        }

        // schwachen Gegner mit Shotgun treffen
        game.physics.arcade.overlap(shotgunSchuss.bullets, schwacherGegner, schwachenGegnerMitShotgunTreffen, null,
            this);
        // starken Gegner mit Shotgun treffen
        game.physics.arcade.overlap(shotgunSchuss.bullets, starkerGegner, starkenGegnerMitShotgunTreffen, null,
            this);

        // schwachen Gegner mit Ak treffen
        game.physics.arcade.overlap(akSchuss.bullets, schwacherGegner, schwachenGegnerMitAkTreffen, null, this);
        // starken Gegner mit Ak treffen
        game.physics.arcade.overlap(akSchuss.bullets, starkerGegner, starkenGegnerMitAkTreffen, null, this);

        // schwachen Gegner mit Pistole treffen
        game.physics.arcade.overlap(pistolenSchuss.bullets, schwacherGegner, schwachenGegnerMitPistoleTreffen, null,
            this);
        // starken Gegner mit Pistole treffen
        game.physics.arcade.overlap(pistolenSchuss.bullets, starkerGegner, starkenGegnermitPistoleTreffen, null,
            this);

        // schwachen Gegner mit Raketenwerfer treffen
        game.physics.arcade.overlap(raketenexplosion, schwacherGegner, schwachenGegnerMitRaketenwerferTreffen, null,
            this);
        // starken Gegner mit Raketenwerfen treffen
        game.physics.arcade.overlap(raketenexplosion, starkerGegner, starkenGegnerMitRaketenwerferTreffen, null,
            this);

        // Wenn der Spieler einen Gegner berührt erscheint der GameOver Screen.
        game.physics.arcade.overlap(player, gegner, gameOver, null, this);

        // Kolissionverwaltung von Waffen, Gegnern, Plattformen & Projektile
        game.physics.arcade.collide(waffen, waffen);
        game.physics.arcade.collide(waffen, gegner);
        game.physics.arcade.collide(waffen, platforms);
        game.physics.arcade.collide(gegner, platforms);
        game.physics.arcade.collide(player, platforms);

        // Waffen aufnehmen
        game.physics.arcade.overlap(player, ak, nimmak, null, this);
        game.physics.arcade.overlap(player, sg, nimmSg, null, this);
        game.physics.arcade.overlap(player, pistole, nimmPistole, null, this);
        game.physics.arcade.overlap(player, rw, nimmRw, null, this);

        // Projektile treffen Plattformen
        game.physics.arcade.overlap(einfacheProjektile, platforms, killSimpleProjectiles, null, this);

        if (raketenexplosion == null) {
            // Projektilwaffen, die ein Projektil abschiessen dass anschließend explodiert
            game.physics.arcade.overlap(rakete.bullets, platforms, raketeExplodiert, null, this);

            //Kollision Rakete mit Gegner
            game.physics.arcade.overlap(rakete.bullets, schwacherGegner, raketeExplodiert, null, this);
            game.physics.arcade.overlap(rakete.bullets, starkerGegner, raketeExplodiert, null, this);
        }

        // RaketenExplosion anhalten oder stoppen
        if (raketenexplosion != null) {

            if (game.physics.arcade.isPaused == true) {
                explosionTween.pause();
            } else {
                explosionTween.resume()
            }

            explosionTween.onComplete.addOnce(function () {
                raketenexplosion.kill();
            }, this);
        }


        //Kollision Raketenexplosion mit Gegner
        game.physics.arcade.overlap(schwacherGegner, raketenexplosion, schwachenGegnerMitRaketenwerferTreffen, null,
            this);
        game.physics.arcade.overlap(starkerGegner, raketenexplosion, starkenGegnerMitRaketenwerferTreffen, null,
            this);

        //Kollision Raketenexplosion mit Player
        game.physics.arcade.overlap(player, raketenexplosion, gameOver, null, this);


        // NPC-Bwegungen


        //Schwacher Gegner
        if (game.physics.arcade.isPaused == false) {

            schwacherGegner.body.velocity.x = -100;


            if (gegneraktiv == false) {

                schwacherGegner.animations.paused = false;
                gegneraktiv = true;

            }

        }

        // Spielerbewegungen


        if (game.physics.arcade.isPaused == true) {
            player.animations.paused = true;
            schwacherGegner.animations.paused = true;
            aktiv = false;
            gegneraktiv = false;
        }

        player.body.velocity.x = 0;


        // Spieler bewegt sich in die linke Richtung
        if (this.aKey.isDown) {
            if (player.body.touching.down) {
                if (richtung != 1) {
                    richtung = 1;
                    movement();
                    aktiv = false;

                }

                if (aktiv == false) {

                    player.animations.paused = false;
                    aktiv = true;

                }

                game.physics.arcade.isPaused = false;
                player.body.velocity.x = -150;

            } else {

                if (richtung != 4) {
                    richtung = 4;
                    movement();
                    aktiv = false;

                }

                if (aktiv == false) {

                    player.animations.paused = false;
                    aktiv = true;

                }


                game.physics.arcade.isPaused = false;
                player.body.velocity.x = -150;
            }


            // Bewegt sich in die rechte Richtung
        } else if (this.dKey.isDown) {

            if (player.body.touching.down) {

                if (richtung != 2) {
                    richtung = 2;
                    movement();
                    aktiv = false;
                }

                if (aktiv == false) {

                    player.animations.paused = false;
                    aktiv = true;

                }

                game.physics.arcade.isPaused = false;
                player.body.velocity.x = 150;
            } else {

                if (richtung != 3) {
                    richtung = 3;
                    movement();
                    aktiv = false;

                }

                if (aktiv == false) {

                    player.animations.paused = false;
                    aktiv = true;

                }


                game.physics.arcade.isPaused = false;
                player.body.velocity.x = 150;
            }
            // Still stehen
            // git test kommentar
        } else {

            game.physics.arcade.isPaused = true;

        }



        // Wenn der Spieler den Boden berührt ist er in der Lage zu springen.
        if (this.spaceKey.isDown && player.body.touching.down) {

            player.body.velocity.y = -1500;

        }

        // --- Zeitmechanik ---

        // Mithilfe der SPACEBAR oder der S-Taste kann die Zeit eingeschaltet werden.
        if (this.spaceKey.isDown || (this.sKey.isDown && !(player.body.touching.down))) {

            game.physics.arcade.isPaused = false;

        }

        // --- Schießen ---

        // Mithilfe der Maustaste kann der Spieler (wenn er eine Schusswaffe besitzt) schießen.
        if (game.input.activePointer.isDown) {

            // Waffen werden erfolgreich gewechselt.
            if (akAufgenommen == 1) {
                fireAk();
            } else if (rwAufgenommen == 1) {
                fireRaketenwerfer();
            } else if (sgAufgenommen == 1) {
                fireShotgun();
            } else if (pistoleAufgenommen == 1) {
                firePistol();
            }
        }


        // Funktionen

        function movement() {
            switch (richtung) {
                case 1:
                    player.animations.play('left');
                    console.log("links");
                    break;
                case 2:
                    player.animations.play('right');
                    console.log("rechts");
                    break;
                case 3:
                    player.animations.play('jump_right');
                    console.log("sprung_rechts");
                    break;
                case 4:
                    player.animations.play('jump_left');
                    console.log("sprung_links");
                    break;
            }

        }

        function fireAk() {

            if (akAufgenommen == 1 && akSchuss.shots < 6) {

                akSound.play();

                akSchuss.fireAtPointer();

                munitionsText.text = munition - akSchuss.shots + ' Schuss übrig';
                if ((munition - akSchuss.shots) <= 0) {
                    munitionsText.text = '';
                    ausgeruesteterWaffenText.text = '';
                }

                waffeSchiessen();
            }
        }

        function firePistol() {
            if (pistoleAufgenommen == 1 && pistolenSchuss.shots < 12) {

                pistolenSound.play();

                pistolenSchuss.fireAtPointer();

                munitionsText.text = munition - pistolenSchuss.shots + ' Schuss übrig';

                if ((munition - pistolenSchuss.shots) == 0) {
                    munitionsText.text = '';
                    ausgeruesteterWaffenText.text = '';
                }

                waffeSchiessen();
            }
        }

        function fireShotgun() {
            if (sgAufgenommen == 1 && shotgunSchuss.shots < 5) {

                shotgunSound.play();

                shotgunSchuss.fireAtPointer();
                shotgunSchuss.fireAtPointer();
                shotgunSchuss.fireAtPointer();
                shotgunSchuss.fireAtPointer();
                shotgunSchuss.fireAtPointer();

                munitionsText.text = munition - shotgunSchuss.shots + ' Schuss übrig';

                if (munition - shotgunSchuss.shots == 0) {
                    munitionsText.text = '';
                    ausgeruesteterWaffenText.text = '';
                }

                waffeSchiessen();
            }
        }

        function fireRaketenwerfer() {
            if (rwAufgenommen == 1 && rakete.shots < 1) {

                raketenwerferSound.play();

                rakete.fireAtPointer();

                munitionsText.text = munition - rakete.shots + ' Raketen übrig';

                if (munition - rakete.shots == 0) {
                    munitionsText.text = '';
                    ausgeruesteterWaffenText.text = '';
                }

                waffeSchiessenRaketenwerfer();
            }
        }

        function fireGw() {
            if (gwAufgenommen == 1) {

            }
        }

        // PISTOLE
        function schwachenGegnerMitPistoleTreffen(schwacherGegner, pistolenSchuss) {
            pistolenSchuss.kill();

            LebenErsterGegner = LebenErsterGegner - 30;

            if (LebenErsterGegner <= 0) {
                schwacherGegner.kill();
                scorePlusZehn();
            }
        }

        function starkenGegnermitPistoleTreffen(starkerGegner, pistolenSchuss) {
            pistolenSchuss.kill();

            var Leben = Leben + 1;

            if (Leben == 4) {
                starkerGegner.kill();
                scorePlusZwanzig();
            }
        }

        /* GRANATENWERFER
        function schwachenGegnerMitGranatenwerferTreffen(schwacherGegner, pistolenSchuesse) {
        
            scorePlusZehn();
        }
        
        function starkenGegnerMitGranatenwerferTreffen(starkerGegner, pistolenSchuesse) {
        
            scorePlusZehn();
        } */

        // SHOTGUN
        function schwachenGegnerMitShotgunTreffen(schwacherGegner, shotgunSchuss) {

            // SchwacherGegner wird beim sofortigen Treffer getötet.
            schwacherGegner.kill();
            // Die Kugel verschwindet nun.
            shotgunSchuss.kill();

            scorePlusZehn();
        }

        function starkenGegnerMitShotgunTreffen(starkerGegner, shotgunSchuss) {

            // StarkerGegner wird beim sofortigen Treffer getötet.
            starkerGegner.kill();
            // Die Kugel verschwindet nun.
            shotgunSchuss.kill();

            scorePlusZwanzig();
        }

        // AK
        function schwachenGegnerMitAkTreffen(schwacherGegner, akSchuss) {

            // schwacherGegner wird beim sofortigen Treffer getötet.
            schwacherGegner.kill();
            // Die Kugel verschwindet nun logischerweise.
            akSchuss.kill();

            scorePlusZehn();
        }

        function starkenGegnerMitAkTreffen(starkerGegner, akSchuss) {

            // Kugel verschwindet logischerweise.
            akSchuss.kill();

            // Variable, die die Treffer zählt.
            Leben = Leben + 1;

            // Gegner hat kann zwei Schüsse abkriegen
            if (Leben == 2) {
                starkerGegner.kill();

                scorePlusZwanzig();
                Leben = 0;
            }
        }

        // RAKETENWERFER
        function schwachenGegnerMitRaketenwerferTreffen(schwacherGegner, raketenexplosion) {

            // schwacherGegner wird beim sofortigen Treffer getötet.
            schwacherGegner.kill();
            scorePlusZehn();
        }

        function starkenGegnerMitRaketenwerferTreffen(starkerGegner, raketenexplosion) {


            // starkerGegner wird beim sofortigen Treffer getötet.
            starkerGegner.kill();
            scorePlusZwanzig();
        }

        // Win Funktion
        function youWin(gegner) {
            if (gegnerZahl == gegnerBesiegt) {

                youWinText.text = 'Gewonnen';
            }
        }

        function scorePlusZwanzig() {
            score += 20;
            scoreText.text = 'Score: ' + score;

            gegnerBesiegt = gegnerBesiegt + 1;
            youWin();
        }

        function scorePlusZehn() {
            score += 10;
            scoreText.text = 'Score: ' + score;

            gegnerBesiegt = gegnerBesiegt + 1;
            youWin();
        }

        function waffeSchiessen() {
            SchussPassiertjetzt = 1;

            game.physics.arcade.isPaused = false;

            game.time.events.add(Phaser.Timer.SECOND * 0.1, wiederStoppen, this);
        }

        function waffeSchiessenRaketenwerfer() {
            SchussPassiertjetzt = 1;

            game.physics.arcade.isPaused = false;

            game.time.events.add(Phaser.Timer.SECOND * 0.2, wiederStoppen, this);
        }

        function wiederStoppen() {

            SchussPassiertjetzt = 0;
            game.physics.arcade.isPaused = true;
        }

        function killSimpleProjectiles(einfacheProjektile, platforms) {
            einfacheProjektile.kill();
        }

        function raketeExplodiert(rakete, platforms) {


            raketenexplosion = game.add.sprite(rakete.x, rakete.y, 'Explosion');
            raketenexplosion.anchor.setTo(0.5, 0.5);

            game.physics.arcade.enable(raketenexplosion);
            raketenexplosion.enableBody = true;


            rakete.kill();

            explosionTween = game.add.tween(raketenexplosion.scale);

            explosionTween.to({
                x: 3,
                y: 3
            }, 1000, Phaser.Easing.Linear.None, true);

        }


        // Waffe aufnehmen
        function nimmSg(player, sg) {
            // Das Shotgun - Objekt wird gelöscht
            sg.kill();

            // Setzt andere Waffen auf null
            akAufgenommen = 0;
            rwAufgenommen = 0;
            pistoleAufgenommen = 0;

            // Der Spieler besitzt nun die Shotgun
            sgAufgenommen = 1;
            // Nur für Munitionsverwaltungwichtig.
            munition = 5;

            ausgeruesteterWaffenText.text = 'Shotgun ausgerüstet';
            munitionsText.text = munition + ' Schuss übrig';
        }

        function nimmPistole(player, pistole) {
            pistole.kill();

            // Sezt andere Waffen auf null
            rwAufgenommen = 0;
            sgAufgenommen = 0;
            akAufgenommen = 0;

            // Pistole aufgenommen
            pistoleAufgenommen = 1;

            // 12 Schüsse
            munition = 12;

            ausgeruesteterWaffenText.text = 'Pistole ausgerüstet';
            munitionsText.text = munition + ' Schuss übrig';

        }

        function nimmRw(player, rw) {
            rw.kill();

            // Setzt andere Waffen auf null
            sgAufgenommen = 0;
            akAufgenommen = 0;
            pistoleAufgenommen = 0;

            // Raketenwerferaufnehmen
            rwAufgenommen = 1;
            // 3 Raketen
            munition = 3;

            ausgeruesteterWaffenText.text = 'Raketenwerfer ausgerüstet';
            munitionsText.text = munition + ' Rakete übrig';
        }

        function nimmak(player, ak) {
            ak.kill();

            // Setzt andere Waffen auf null
            rwAufgenommen = 0;
            sgAufgenommen = 0;
            pistoleAufgenommen = 0;

            // ak aufgenommen
            akAufgenommen = 1;

            // 6 Schüsse
            munition = 6;

            ausgeruesteterWaffenText.text = 'AK ausgerüstet';
            munitionsText.text = munition + ' Schuss übrig';

        }

        // Game Over Funktion
        function gameOver(player, gegner) {
            player.kill();

            deathSound.play();

            gameOverText.text = 'Game Over';
        }
    }
}