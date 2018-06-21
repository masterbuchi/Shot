// STATES DEFINIEREN DIE EINZELNEN LEVEL UND KÖNNEN SEPARAT MIT PRELOAD ETC GELADEN WERDEN: PHASER.STATE



class Gegner extends Phaser.Sprite {

    constructor(game) {
        super(game, 0, 0, 'schwacherGegner');
        this.exists = false;
        this.oldweapon = 'keine';
        this.anchor.setTo(0.5, 0.27);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 200;
        this.scale.setTo(0.5, 0.5);


        this.schadenstypen = {
            pistolenSchuss: 5,
            shotgunSchuss: 2,
            akSchuss: 5,
            rakete: 1000,
        };

        this.maxHealth = 15;
        this.damage = 1000;


        this.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 10, true);
        this.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        this.animations.add('stand_left', [27], 10, true);
        this.animations.add('stand_right', [26], 10, true);
        this.animations.add('kneel_left', [25], 10, true);
        this.animations.add('kneel_right', [24], 10, true);
        this.animations.add('lie_left', [28], 10, true);
        this.animations.add('lie_right', [28], 10, true);

        this.tod = this.animations.add('die', [29, 30, 31, 32, 33], 10, false);
        this.tod.onComplete.add(this.death, this);
    }

    hit(bullet) {
        if (this.dying) {
            return;
        }
        console.log(bullet.key);
        if (bullet.key == 'explosion') {
            this.health -= 1000;
        } else {
            this.health -= this.schadenstypen[bullet.type];
        }
        if (this.health < 1) {
            this.dying = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.removeChildren();
            this.animations.play('die');
        }
    }

    stdReset(x, y) {
        this.reset(x, y);
        this.health = this.maxHealth;
        this.exists = true;
        this.dying = false;
    }

    bewegung(movement) {
        this.movement = movement;
        switch (this.movement) {
            case 'left':
                this.anchor.setTo(0.5, 0.27);
                this.body.velocity.x = -100
                this.animations.play('left');
                break;
            case 'right':
                this.anchor.setTo(0.5, 0.27);
                this.body.velocity.x = 100
                this.animations.play('right');
                break;
            case 'stand_left':
                this.anchor.setTo(0.5, 0.27);
                this.body.velocity.x = 0
                this.animations.play('stand_left');
                break;
            case 'stand_right':
                this.anchor.setTo(0.5, 0.27);
                this.body.velocity.x = 0
                this.animations.play('stand_right');

                break;
            case 'kneel_left':
                this.anchor.setTo(0.5, 0.5);
                this.body.velocity.x = 0
                this.animations.play('kneel_left');

                break;
            case 'kneel_right':
                this.anchor.setTo(0.5, 0.5);
                this.body.velocity.x = 0
                this.animations.play('kneel_right');

                break;
            case 'lie_left':
                this.anchor.setTo(0.5, 0.27);
                this.body.velocity.x = 0
                this.animations.play('lie_left');
                break;
            case 'lie_right':
                this.anchor.setTo(0.5, 0.27);
                this.body.velocity.x = 0
                this.animations.play('lie_right');
                break;
        }

    }


    munition(weapon) {

        if (this.oldweapon != weapon) {
            this.oldweapon = weapon;
            this.Kugeln = game.add.group();

            // Projektile
            switch (this.oldweapon) {
                case 'pistole':
                    this.pistolenSchuss = new Bullets(this.game, 12, 'pistolenSchuss', 500, 1000, 12, 40, 0, false);
                    this.aktuelleMuni = this.pistolenSchuss;
                    this.Kugeln.add(this.pistolenSchuss.bullets);
                    break;

                case 'shotgun':
                    this.shotgunSchuss = new Bullets(this.game, 5, 'shotgunSchuss', 500, 500, 25, 40, 0, false);
                    this.aktuelleMuni = this.shotgunSchuss;
                    this.shotgunSchuss.bulletAngleVariance = 5;
                    this.Kugeln.add(this.shotgunSchuss.bullets);
                    break;

                case 'ak':
                    this.akSchuss = new Bullets(this.game, 50, 'akSchuss', 500, 60, 30, 30, 0, false);
                    this.aktuelleMuni = this.akSchuss;
                    this.Kugeln.add(this.akSchuss.bullets);
                    break;

                case 'raketenwerfer':
                    this.rakete = new Bullets(this.game, 1, 'rakete', 200, 200, 1, 30, 0, false);
                    this.aktuelleMuni = this.rakete;
                    break;
            }
        }
    }


    waffe(weapon) {
        this.weapon = weapon;
        switch (weapon) {
            case 'pistole':
                this.munition(weapon);
                if (this.movement == 'left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.9, 0.15);
                    break;
                }
                if (this.movement == 'right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.11, 0.3);
                    break;
                }

                if (game.math.radToDeg(game.physics.arcade.angleBetween(this, player)) <= 50 || game.math.radToDeg(game.physics.arcade.angleBetween(this, player)) >= 145) {


                    if (this.movement == 'stand_left') {
                        this.removeChildren();
                        this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_zielend_links'));
                        game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                        this.child_waffe.anchor.setTo(0.9, 0.15);
                        break;
                    }
                    if (this.movement == 'stand_right') {
                        this.removeChildren();
                        this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_zielend_rechts'))
                        game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                        this.child_waffe.anchor.setTo(0.11, 0.3);
                        break;
                    }
                    if (this.movement == "kneel_left") {
                        this.removeChildren();
                        this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_zielend_links'));
                        game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                        this.child_waffe.anchor.setTo(0.9, 0.15);
                        break;
                    }
                    if (this.movement == 'kneel_right') {
                        this.removeChildren();
                        this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_zielend_rechts'))
                        game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                        this.child_waffe.anchor.setTo(0.11, 0.3);
                        break;
                    }

                } else {
                    if (this.movement == 'stand_left') {
                        this.removeChildren();
                        this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_links'));
                        game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                        this.child_waffe.anchor.setTo(0.9, 0.15);
                        break;
                    }
                    if (this.movement == 'stand_right') {
                        this.removeChildren();
                        this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_rechts'))
                        game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                        this.child_waffe.anchor.setTo(0.11, 0.3);
                        break;
                    }
                    if (this.movement == 'kneel_left') {
                        this.removeChildren();
                        this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_links'));
                        game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                        this.child_waffe.anchor.setTo(0.9, 0.15);
                        break;
                    }
                    if (this.movement == 'kneel_right') {
                        this.removeChildren();
                        this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_pistole_rechts'))
                        game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                        this.child_waffe.anchor.setTo(0.11, 0.3);
                        break;
                    }

                }
                break;


            case 'shotgun':
                this.munition(weapon);
                if (this.movement == 'left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_shotgun_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.60, 0.15);
                    break;
                }
                if (this.movement == 'right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_shotgun_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.35, 0.15);
                    break;
                }


                if (this.movement == 'stand_left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_shotgun_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.7, 0.15);
                    break;

                }
                if (this.movement == 'stand_right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_shotgun_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.35, 0.2);
                    break;
                }
                break;

            case 'ak':
                this.munition(weapon);
                if (this.movement == 'left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_ak_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.60, 0.15);
                    break;
                }
                if (this.movement == 'right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_ak_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.3, 0.15);
                    break;
                }

                if (this.movement == 'stand_left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_ak_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.7, 0.15);
                    break;

                }
                if (this.movement == 'stand_right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_ak_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.3, 0.2);
                    break;
                }
                if (this.movement == 'kneel_left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_ak_zielend_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.9, 0.15);
                    break;
                }
                if (this.movement == 'kneel_right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_ak_zielend_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.11, 0.3);
                    break;
                }
                break;

            case 'raketenwerfer':
                this.munition(weapon);
                if (this.movement == 'left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_rw_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.30, 0.15);
                    break;
                }
                if (this.movement == 'right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_rw_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.55, 0.3);
                    break;
                }

                if (this.movement == 'stand_left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_rw_kniend_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.7, 0.4);
                    break;

                }
                if (this.movement == 'stand_right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_rw_kniend_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.3, 0.4);
                    break;
                }
                if (this.movement == 'kneel_left') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_rw_kniend_links'));
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.65, 0.28);
                    break;
                }
                if (this.movement == 'kneel_right') {
                    this.removeChildren();
                    this.child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_gegner_rw_kniend_rechts'))
                    game.physics.enable(this.child_waffe, Phaser.Physics.ARCADE);
                    this.child_waffe.anchor.setTo(0.3, 0.28);
                    break;
                }
                break;

            default:
                null;
                break;
        }



    }
    spawn(x, y, type, movement, weapon) {

        this.type = type;
        this.movement = movement;
        this.weapon = weapon;
        if (this.type == 'starkerGegner') {
            this.maxHealth = 25;
            this.loadTexture('starkerGegner');
        }

        this.stdReset(x, y);

        this.bewegung(this.movement);
        this.waffe(this.weapon);
    }

    death() {
        this.droppedweapon = Waffen.getFirstExists(false);

        if (this.weapon.includes('shotgun')) {
            this.droppedweapon.spawn(this.x, this.y, 'shotgun');
        } else if (this.weapon.includes('pistol')) {
            this.droppedweapon.spawn(this.x, this.y, 'pistole');
        } else if (this.weapon.includes('rakete')) {
            this.droppedweapon.spawn(this.x, this.y, 'raketenwerfer');
        } else if (this.weapon.includes('ak')) {
            this.droppedweapon.spawn(this.x, this.y, 'ak');
        }


        this.exists = false;
    }

    schusskontrolle() {
        if (this.exists) {
            this.abstandZumSpieler = game.math.distance(this.x, this.y, player.x, player.y);

            if ((this.movement == 'left' || this.movement == 'right') && this.abstandZumSpieler <= 400) {
                if (this.movement == 'left') {
                    this.bewegung('stand_left');
                    this.shoot();
                }
                if (this.movement == 'right') {
                    this.bewegung('stand_right');
                    this.shoot();
                }
            }


            if ((this.movement == 'stand_left' || this.movement == 'stand_right') && this.abstandZumSpieler >= 500) {
                if (this.movement == 'stand_left') {
                    this.bewegung('left');
                    this.aktuelleMuni.autofire = false;
                }
                if (this.movement == 'stand_right') {
                    this.bewegung('right');
                    this.aktuelleMuni.autofire = false;
                }
            }


            this.child_waffe.angle = game.math.radToDeg(game.physics.arcade.angleBetween(this, player));



            if (this.movement == 'stand_left' || this.movement == 'left' || this.movement == 'kneel_left' || this.movement == 'lie_left')
                this.child_waffe.angle += 180;

        }
    }



    update() {


        if (!this.tod.isPlaying) {


            if (game.physics.arcade.isPaused == true) {
                this.animations.paused = true;

            } else {
                if (this.animations.paused != false) {
                    this.animations.paused = false;
                }
            }


            this.game.physics.arcade.collide(this, this.game.collisionLayer);


            //Wenn er gegen eine Wand läuft, ändert er die Richtung



            if (this.movement == 'left' || this.movement == 'right') {


                if (this.body.blocked.right) {
                    this.bewegung('left');

                } else if (this.body.blocked.left) {
                    this.bewegung('right');

                }
            }
            if (this.movement == 'stand_left' || this.movement == 'stand_right') {

                if (this.x < player.x) {
                    this.bewegung('stand_right');
                }

                if (this.x >= player.x) {
                    this.bewegung('stand_left');
                }
            }

            if (this.movement == 'kneel_left' || this.movement == 'kneel_right') {

                if (this.x < player.x) {
                    this.bewegung('kneel_right');
                }

                if (this.x >= player.x) {
                    this.bewegung('kneel_left');
                }
            }

            // Die passende Waffe wird geladen
            this.waffe(this.weapon);

            this.schusskontrolle();

        }


        //  Gegner mit Schuss oder Rakete treffen
        game.physics.arcade.overlap(player, this.Kugeln, this.playerTreffen, null, this);

        // Projektile treffen Plattformen
        game.physics.arcade.overlap(this.Kugeln, Plattformen, this.killSimpleProjectiles, null, this);

        // Kollision Player mit Raketenexplosion
        game.physics.arcade.overlap(player, this.raketenexplosion, this.gameOver, null, this);


        // Kollision der Gegner mit der Raketenexplosion
        game.physics.arcade.overlap(this.raketenexplosion, GegnerGruppe, this.gegnerTreffen,
            null,
            this);

        // Waffen aufnehmen
        game.physics.arcade.overlap(this, Waffen, this.nimmwaffe, null, this);



        
    }

    waffeSchiessen() {
        game.physics.arcade.isPaused = false;
        game.time.events.add(Phaser.Timer.SECOND * 0.1, this.wiederStoppen, this);
    }

    waffeSchiessenRaketenwerfer() {
        game.physics.arcade.isPaused = false;
        game.time.events.add(Phaser.Timer.SECOND * 0.2, this.wiederStoppen, this);
    }


    // Gegner wird von Kugel getroffen
    playerTreffen(player, schuss) {

        if (schuss.key == 'explosion') {
            player.hit(schuss);
        } else {

            player.hit(schuss);
            schuss.kill();

        }
    }

    // Gegner wird von Kugel getroffen
    gegnerTreffen(schuss, gegner) {

        if (schuss.key == 'explosion') {
            this.hit(schuss);
        } else {

            this.hit(schuss);
            schuss.kill();

        }
    }

    raketeExplodiert(rakete, Plattformen) {
        this.raketenexplosion = game.add.sprite(rakete.x, rakete.y, 'explosion');
        this.raketenexplosion.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, false);
        this.raketenexplosion.animations.play('boom');
        this.raketenexplosion.anchor.setTo(0.5, 0.5);
        this.raketenexplosion.scale.setTo(0.1);
        game.physics.arcade.enable(this.raketenexplosion);
        this.raketenexplosion.enableBody = true;
        rakete.kill();

        this.explosionTween = game.add.tween(this.raketenexplosion.scale);
        this.explosionTween.to({
            x: 0.8,
            y: 0.8
        }, 1000, Phaser.Easing.Linear.None, true);

        this.explosionTween.onComplete.addOnce(function () {
            player.raketenexplosion.kill();
        }, game);
    }

    killSimpleProjectiles(schuss) {
        schuss.kill();
    }

    // nimmt Waffe auf
    nimmwaffe(player, waffe) {

        // Das Waffen - Objekt wird gelöscht
        waffe.kill();

        switch (waffe.key) {
            case "pistole":
                this.waffe("pistole");
                break;
            case "shotgun":
                this.waffe("shotgun");
                break;
            case "ak":
                this.waffe("ak");
                break;
            case "raketenwerfer":
                this.waffe("raketenwerfer");
                break;
        }
    }



    shoot() {
        // --- Schießen ---
        // Mithilfe der Maustaste kann der Spieler (wenn er eine Schusswaffe besitzt) schießen.
        if (this.weapon != null) {
            switch (this.weapon) {
                case 'ak':
                    this.akSchuss.fireAtSprite(player);
                    this.waffeSchiessen();
                    break;
                case 'raketenwerfer':
                    this.rakete.fireAtSprite(player);
                    this.waffeSchiessenRaketenwerfer();
                    break;
                case 'shotgun':
                    this.shotgunSchuss.fireAtSprite(player);
                    this.waffeSchiessen();
                    break;
                case 'pistole':
                    this.pistolenSchuss.fireAtSprite(player);
                    this.waffeSchiessen();
                    break;
            }
        }
    }
}







// if (this.exists)
//     console.log(game.math.radToDeg(game.physics.arcade.angleBetween(this, player)))