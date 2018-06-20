class Player extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, 'player');
        this.oldweapon = 'keine';
        this.first = false;
        this.exists = false;
        this.anchor.setTo(0.5, 0.27);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 200;
        this.scale.setTo(0.5, 0.5);


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
            switch (weapon) {
                case 'pistole':
                    this.pistolenSchuss = new Bullets(this.game, 12, 'pistolenSchuss', 500, 1000, 12, 40, 0, false);
                    this.Kugeln.add(this.pistolenSchuss.bullets);
                    break;

                case 'shotgun':
                    this.shotgunSchuss = new Bullets(this.game, 5, 'shotgunSchuss', 500, 500, 5, 40, 0, false);
                    this.shotgunSchuss.multiFire = true;
                    this.shotgunSchuss.bulletAngleVariance = 5;
                    this.Kugeln.add(this.shotgunSchuss.bullets);
                    break;

                case 'ak':
                    this.akSchuss = new Bullets(this.game, 20, 'akSchuss', 500, 60, 30, 30, 0, false);
                    this.Kugeln.add(this.akSchuss.bullets);
                    break;

                case 'raketenwerfer':
                    this.rakete = new Bullets(this.game, 5, 'rakete', 200, 200, 1, 30, 0, false);
                    break;

            }
        }
    }


    waffe(weapon) {
        this.weapon = weapon;
        switch (weapon) {
            case 'keine':
                this.anchor.setTo(0.5, 0.27);
                if (this.first == true) {
                    this.loadTexture('player', 0);
                    this.first = false;
                }
                break;
            case 'pistole':
                this.munition(weapon);
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
                this.munition(weapon);
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
                this.munition(weapon);
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
                this.munition(weapon);
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
        this.waffe(weapon);


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
        
        
        if (this.a == null && this.Kugeln != null) {
            console.log(this.Kugeln);
            console.log(GegnerGruppe);
            this.a = 2
        }


        //  Gegner mit Schuss oder Rakete treffen
        
        console.log(game.physics.arcade.overlap(this.Kugeln, GegnerGruppe, this.GegnerTreffen, null, this));

        // Projektile treffen Plattformen
        game.physics.arcade.overlap(this.Kugeln, Plattformen, this.killSimpleProjectiles, null, this);


        game.physics.arcade.overlap(this, raketenexplosion, gameOver, null, this);


        // Waffen aufnehmen
        game.physics.arcade.overlap(this, Waffen, this.nimmwaffe, null, this);

        // --- Schießen ---
        // Mithilfe der Maustaste kann der Spieler (wenn er eine Schusswaffe besitzt) schießen.
        if (game.input.activePointer.isDown) {
            // Waffen werden erfolgreich gewechselt.
            if (akAufgenommen == 1) {
                this.fireAk();
            } else if (rwAufgenommen == 1) {
                this.fireRaketenwerfer();
            } else if (sgAufgenommen == 1) {
                this.fireShotgun();
            } else if (pistoleAufgenommen == 1) {
                this.firePistol();
            }
        }



    }

    // nimmt Waffe auf
    nimmwaffe(player, waffe) {
        // Das Waffen - Objekt wird gelöscht
        waffe.kill();
        // Setzt alle Waffen auf null
        sgAufgenommen = 0;
        akAufgenommen = 0;
        rwAufgenommen = 0;
        pistoleAufgenommen = 0;
        this.waffe(waffe.key);
        switch (waffe.key) {
            case "pistole":
                pistoleAufgenommen = 1;
                munition = 12;
                ausgeruesteterWaffenText.text = 'Pistole ausgerüstet';
                munitionsText.text = munition + ' Schuss übrig';
                break;
            case "shotgun":
                sgAufgenommen = 1;
                munition = 5;
                ausgeruesteterWaffenText.text = 'Shotgun ausgerüstet';
                munitionsText.text = munition + ' Schuss übrig';
                break;
            case "ak":
                akAufgenommen = 1;
                munition = 6;
                ausgeruesteterWaffenText.text = 'AK ausgerüstet';
                munitionsText.text = munition + ' Schuss übrig';
                break;
            case "raketenwerfer":
                rwAufgenommen = 1;
                munition = 3;
                ausgeruesteterWaffenText.text = 'Raketenwerfer ausgerüstet';
                munitionsText.text = munition + ' Rakete übrig';
                break;
        }

    }


    killSimpleProjectiles(schuss) {
        schuss.kill();
    }

    fireAk() {
        if (akAufgenommen == 1 && this.akSchuss.shots < 30) {
            this.akSchuss.fireAtPointer();
            munitionsText.text = munition - this.akSchuss.shots + ' Schuss übrig';
            if ((munition - this.akSchuss.shots) <= 0) {
                munitionsText.text = '';
                ausgeruesteterWaffenText.text = '';
            }
            this.waffeSchiessen();
        }
    }

    firePistol() {
        if (pistoleAufgenommen == 1 && this.pistolenSchuss.shots < 12) {
            this.pistolenSchuss.fireAtPointer();
            munitionsText.text = munition - this.pistolenSchuss.shots + ' Schuss übrig';
            if ((munition - this.pistolenSchuss.shots) == 0) {
                munitionsText.text = '';
                ausgeruesteterWaffenText.text = '';
            }
            this.waffeSchiessen();
        }
    }

    fireShotgun() {
        if (sgAufgenommen == 1 && this.shotgunSchuss.shots < 5) {
            this.shotgunSchuss.fireAtPointer();
            munitionsText.text = munition - this.shotgunSchuss.shots + ' Schuss übrig';
            if (munition - this.shotgunSchuss.shots == 0) {
                munitionsText.text = '';
                ausgeruesteterWaffenText.text = '';
            }
            this.waffeSchiessen();
        }
    }

    fireRaketenwerfer() {
        if (rwAufgenommen == 1 && this.rakete.shots < 1) {
            this.rakete.fireAtPointer();
            munitionsText.text = munition - this.rakete.shots + ' Raketen übrig';
            if (munition - rakete.shots == 0) {
                munitionsText.text = '';
                ausgeruesteterWaffenText.text = '';
            }
            this.waffeSchiessenRaketenwerfer();
        }
    }


    waffeSchiessen() {
        SchussPassiertjetzt = 1;
        game.physics.arcade.isPaused = false;
        game.time.events.add(Phaser.Timer.SECOND * 0.1, this.wiederStoppen, this);
    }

    waffeSchiessenRaketenwerfer() {
        SchussPassiertjetzt = 1;
        game.physics.arcade.isPaused = false;
        game.time.events.add(Phaser.Timer.SECOND * 0.2, this.wiederStoppen, this);
    }

    wiederStoppen() {
        SchussPassiertjetzt = 0;
        game.physics.arcade.isPaused = true;
    }

    // Gegner wird von Kugel getroffen
    GegnerTreffen(schuss, gegner) {
        console.log(schuss);
        console.log(gegner);
        gegner.hit(schuss);
        schuss.kill();

    }

}