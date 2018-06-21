class Player extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, 'player');
        this.game = game;
        this.oldweapon = 'keine';
        this.first = false;
        this.exists = false;
        this.anchor.setTo(0.5, 0.27);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 200;
        //this.scale.setTo(0.5, 0.5);


        this.schadenstypen = {
            pistolenSchuss: 1000,
            shotgunSchuss: 1000,
            akSchuss: 1000,
            rakete: 1000,
        };

        this.health = 1;
        this.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 15, true);
        this.animations.add('left', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 15, true);
        this.jump_left = this.animations.add('jump_right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
            15, false);
        this.jump_right = this.animations.add('jump_left', [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
            15, false);



        this.maxHealth = 1;
        this.tod = this.animations.add('die', [29, 30, 31, 32, 33], 10, false);
        this.tod.onComplete.add(this.death, this);

        // Steuerung
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    }


    stdReset(x, y) {
        this.reset(x, y);
        this.health = this.maxHealth;
        this.exists = true;
        this.dying = false;
        this.sleeping = true;
    }

    munition(weapon) {

        if (this.oldweapon != weapon) {
            this.oldweapon = weapon;
            this.Kugeln = game.add.group();

            // Projektile
            switch (this.oldweapon) {
                case 'pistole':
                    this.pistolenSchuss = new Bullets(this.game, 12, 'pistolenSchuss', 500, 1000, 12, 40, 0, false);
                    this.Kugeln.add(this.pistolenSchuss.bullets);
                    break;

                case 'shotgun':
                    this.shotgunSchuss = new Bullets(this.game, 5, 'shotgunSchuss', 500, 500, 25, 40, 0, false);
                    this.shotgunSchuss.bulletAngleVariance = 5;
                    this.Kugeln.add(this.shotgunSchuss.bullets);
                    break;

                case 'ak':
                    this.akSchuss = new Bullets(this.game, 50, 'akSchuss', 500, 60, 30, 30, 0, false);
                    this.Kugeln.add(this.akSchuss.bullets);
                    break;

                case 'raketenwerfer':
                    this.rakete = new Bullets(this.game, 1, 'rakete', 200, 200, 1, 30, 0, false);
                    break;
            }
        }
    }


    waffe(weapon) {
        this.weapon = weapon;
        switch (this.weapon) {

            case 'keine':
                this.anchor.setTo(0.5, 0.27);
                if (this.first == true) {
                    this.loadTexture('player', 0);
                    this.first = false;
                }
                break;
            case 'pistole':
                this.munition(this.weapon);
                if (this.first == false) {
                    this.loadTexture('player_oa', 0);
                    this.first = true;
                }
                if (richtung == 1 || richtung == 4) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_pistole_links'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.45, 0.27);
                    this.player_child_waffe.anchor.setTo(0.9, 0.15);
                    break;
                } else if (richtung == 2 || richtung == 3) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_pistole_rechts'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.55, 0.28);
                    this.player_child_waffe.anchor.setTo(0.1, 0.15);
                    break;
                }
                break;
            case 'shotgun':
                this.munition(this.weapon);
                if (this.first == false) {
                    this.loadTexture('player_oa', 0);
                    this.first = true;
                }
                if (richtung == 1 || richtung == 4) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_shotgun_links'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.43, 0.25);
                    this.player_child_waffe.anchor.setTo(0.7, 0.1);
                    break;
                } else if (richtung == 2 || richtung == 3) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_shotgun_rechts'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.57, 0.25);
                    this.player_child_waffe.anchor.setTo(0.3, 0.1);
                    break;
                }
                break;
            case 'ak':
                this.munition(this.weapon);
                if (this.first == false) {
                    this.loadTexture('player_oa', 0);
                    this.first = true;
                }
                if (richtung == 1 || richtung == 4) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_ak_links'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.45, 0.27);
                    this.player_child_waffe.anchor.setTo(0.7, 0.1);
                    break;
                } else if (richtung == 2 || richtung == 3) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_ak_rechts'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.55, 0.27);
                    this.player_child_waffe.anchor.setTo(0.28, 0.1);
                    break;
                }
                break;
            case 'raketenwerfer':
                this.munition(this.weapon);
                if (this.first == false) {
                    this.loadTexture('player_oa', 0);
                    this.first = true;
                }
                if (richtung == 1 || richtung == 4) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_raketenwerfer_links'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.45, 0.27);
                    this.player_child_waffe.anchor.setTo(0.55, 0.3);
                    break;
                    a
                } else if (richtung == 2 || richtung == 3) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_raketenwerfer_rechts'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.55, 0.27);
                    this.player_child_waffe.anchor.setTo(0.45, 0.3);
                    break;
                }
                break;
        }
    }


    spawn(x, y, weapon) {
        this.stdReset(x, y);
        this.weapon = weapon;
        this.waffe(this.weapon);


    }

    hit(bullet) {
        this.health -= this.schadenstypen[bullet.type];

        if (this.health < 1) {
            this.dying = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.play('die');
        }
    }
    death() {
        gameOver();
        this.exists = false;
    }

    movement() {
        switch (richtung) {
            case 1:
                this.animations.play('left');
                break;
            case 2:
                this.animations.play('right');
                break;
            case 3:
                this.animations.play('jump_right');
                break;
            case 4:
                this.animations.play('jump_left');
                break;
        }
    }

    sichtbar() {
        this.player_child_waffe.visible = true
    }

    update() {
        // Zielanimation
        if (this.player_child_waffe != null) {

            this.player_child_waffe.rotation = this.game.physics.arcade.angleToPointer(this.player_child_waffe.world);

            if (richtung == 1 || richtung == 4)
                this.player_child_waffe.angle -= 180;


            // game.debug.spriteBounds(this.player_child_waffe);
            // game.debug.spriteInfo(this.player_child_waffe, game.width - 400, game.height - 200);
        }


        // Spielerbewegungen
        if (game.physics.arcade.isPaused == true) {
            this.animations.paused = true;

        }
        this.body.velocity.x = 0;
        // Spieler bewegt sich in die linke Richtung
        if (this.aKey.isDown) {
            if (this.body.touching.down) {
                if (richtung != 1) {
                    richtung = 1;
                    this.movement();
                    this.waffe(this.weapon);
                }
                if (this.animations.paused != false) {
                    this.animations.paused = false;
                }
                game.physics.arcade.isPaused = false;
                this.body.velocity.x = -150;
            } else {
                if (richtung != 4) {
                    richtung = 4;
                    this.movement();
                    this.waffe(this.weapon);
                    if (this.player_child_waffe != null) {
                        this.player_child_waffe.visible = false;
                        this.jump_left.onComplete.add(this.sichtbar, this);
                    }
                }
                if (this.animations.paused != false) {
                    this.animations.paused = false;
                }

                game.physics.arcade.isPaused = false;
                this.body.velocity.x = -150;
            }
            // Bewegt sich in die rechte Richtung
        } else if (this.dKey.isDown) {
            if (this.body.touching.down) {
                if (richtung != 2) {
                    richtung = 2;
                    this.movement();
                    this.waffe(this.weapon);
                }
                if (this.animations.paused != false) {
                    this.animations.paused = false;
                }
                game.physics.arcade.isPaused = false;
                this.body.velocity.x = 150;
            } else {
                if (richtung != 3) {
                    richtung = 3;
                    this.movement();
                    this.waffe(this.weapon);
                    if (this.player_child_waffe != null) {
                        this.player_child_waffe.visible = false;
                        this.jump_right.onComplete.add(this.sichtbar, this);
                    }
                }
                if (this.animations.paused != false) {
                    this.animations.paused = false;
                }

                game.physics.arcade.isPaused = false;
                this.body.velocity.x = 150;
            }
            // Still stehen
        } else {
            game.physics.arcade.isPaused = true;
        }
        // Wenn der Spieler den Boden berührt ist er in der Lage zu springen.
        if (this.spaceKey.isDown && this.body.touching.down) {
            this.body.velocity.y = -250;
        }
        // --- Zeitmechanik ---
        // Mithilfe der SPACEBAR oder der S-Taste kann die Zeit eingeschaltet werden.
        if (this.spaceKey.isDown || (this.sKey.isDown && !(this.body.touching.down))) {
            game.physics.arcade.isPaused = false;
        }




        // Wenn der Spieler einen Gegner berührt erscheint der GameOver Screen.
        game.physics.arcade.overlap(GegnerGruppe, this, this.gameOver, null, this);


        //  Gegner mit Schuss oder Rakete treffen
        game.physics.arcade.overlap(this.Kugeln, GegnerGruppe, this.GegnerTreffen, null, this);

        // Projektile treffen Plattformen
        game.physics.arcade.overlap(this.Kugeln, Plattformen, this.killSimpleProjectiles, null, this);

        // Kollision Player mit Raketenexplosion
        game.physics.arcade.overlap(this, this.raketenexplosion, this.gameOver, null, this);


        //// KOLLISION MIT GEGNER IST DEAKTIVIERT
        // game.physics.arcade.overlap(raketenexplosion, GegnerGruppe, GegnerTreffen,
        //     null,
        //     this);

        // Waffen aufnehmen
        game.physics.arcade.overlap(this, Waffen, this.nimmwaffe, null, this);

        // --- Schießen ---
        // Mithilfe der Maustaste kann der Spieler (wenn er eine Schusswaffe besitzt) schießen.
        if (game.input.activePointer.isDown) {
            if (this.weapon != null) {


                switch (this.weapon) {
                    case 'ak':
                        this.akSchuss.fireAtPointer();
                        munitionsText.text = this.akSchuss.firelimit - this.akSchuss.shots + ' Schuss übrig';
                        if (this.akSchuss.firelimit <= this.akSchuss.shots) {
                            munitionsText.text = '';
                            ausgeruesteterWaffenText.text = '';
                        }
                        this.waffeSchiessen();
                        break;
                    case 'raketenwerfer':
                        this.rakete.fireAtPointer();
                        munitionsText.text = this.rakete.firelimit - this.rakete.shots + ' Raketen übrig';
                        if (this.rakete.firelimit <= this.rakete.shots) {
                            munitionsText.text = '';
                            ausgeruesteterWaffenText.text = '';
                        }
                        this.waffeSchiessenRaketenwerfer();
                        break;
                    case 'shotgun':
                        this.oldfirerate = this.shotgunSchuss.fireRate;
                        this.shotgunSchuss.fireRate = 0;
                        this.shotgunSchuss.fireAtPointer();
                        // this.shotgunSchuss.fireAtPointer();
                        // this.shotgunSchuss.fireAtPointer();
                        // this.shotgunSchuss.fireAtPointer();
                        // this.shotgunSchuss.fireAtPointer();
                        this.shotgunSchuss.fireRate = this.oldfirerate;
                        munitionsText.text = this.shotgunSchuss.firelimit - this.shotgunSchuss.shots + ' Schuss übrig';
                        if (this.shotgunSchuss.firelimit <= this.shotgunSchuss.shots) {
                            munitionsText.text = '';
                            ausgeruesteterWaffenText.text = '';
                        }
                        this.waffeSchiessen();
                        break;
                    case 'pistole':
                        this.pistolenSchuss.fireAtPointer();
                        munitionsText.text = this.pistolenSchuss.firelimit - this.pistolenSchuss.shots + ' Schuss übrig';
                        if (this.pistolenSchuss.firelimit <= this.pistolenSchuss.shots) {
                            munitionsText.text = '';
                            ausgeruesteterWaffenText.text = '';
                        }
                        this.waffeSchiessen();
                        break;
                }
            }
        }


        if (this.raketenexplosion == null) {
            if (this.rakete != null) {
                // Projektilwaffen, die ein Projektil abschiessen dass anschließend explodiert
                game.physics.arcade.overlap(this.rakete.bullets, Plattformen, this.raketeExplodiert, null, this);
                //Kollision Rakete mit Gegner
                game.physics.arcade.overlap(this.rakete.bullets, GegnerGruppe, this.raketeExplodiert, null, this);
            }
        }
        // this.raketenexplosion anhalten oder stoppen
        if (this.raketenexplosion != null) {
            if (game.physics.arcade.isPaused == true) {
                this.explosionTween.pause();
                this.raketenexplosion.animations.paused = true;

            } else {
                this.explosionTween.resume();
                if (this.raketenexplosion.animations.paused != false) {
                    this.raketenexplosion.animations.paused = false;
                }
            }
            this.explosionTween.onComplete.addOnce(function () {
                if (this.raketenexplosion != null)
                    this.raketenexplosion.kill();
            }, game);
        }
    }


    // nimmt Waffe auf
    nimmwaffe(player, waffe) {

        // Das Waffen - Objekt wird gelöscht
        waffe.kill();

        console.log(waffe.key)
        switch (waffe.key) {
            case "pistole":
                this.waffe("pistole");
                munition = 12;
                ausgeruesteterWaffenText.text = 'Pistole ausgerüstet';
                munitionsText.text = munition + ' Schuss übrig';
                break;
            case "shotgun":
                this.waffe("shotgun");
                munition = 5;
                ausgeruesteterWaffenText.text = 'Shotgun ausgerüstet';
                munitionsText.text = munition + ' Schuss übrig';
                break;
            case "ak":
                this.waffe("ak");
                munition = 30;
                ausgeruesteterWaffenText.text = 'AK ausgerüstet';
                munitionsText.text = munition + ' Schuss übrig';
                break;
            case "raketenwerfer":
                this.waffe("raketenwerfer");
                munition = 3;
                ausgeruesteterWaffenText.text = 'Raketenwerfer ausgerüstet';
                munitionsText.text = munition + ' Rakete übrig';
                break;
        }
    }


    killSimpleProjectiles(schuss) {
        schuss.kill();
    }

    waffeSchiessen() {
        game.physics.arcade.isPaused = false;
        game.time.events.add(Phaser.Timer.SECOND * 0.1, this.wiederStoppen, this);
    }

    waffeSchiessenRaketenwerfer() {
        game.physics.arcade.isPaused = false;
        game.time.events.add(Phaser.Timer.SECOND * 0.2, this.wiederStoppen, this);
    }

    wiederStoppen() {
        game.physics.arcade.isPaused = true;
    }

    // Gegner wird von Kugel getroffen
    GegnerTreffen(schuss, gegner) {
        gegner.hit(schuss);
        schuss.kill();
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
    }

    // Game Over Funktion
    gameOver(player) {
        player.kill();
        hauptnachricht.text = 'Game Over';

    }

}