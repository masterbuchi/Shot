class Player extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, 'player');
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
        this.animations.add('jump_right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
            15, false);
        this.animations.add('jump_left', [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
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
                } else if (richtung == 2 || richtundg == 3) {
                    this.removeChildren();
                    this.player_child_waffe = this.addChild(game.make.sprite(0, 0, 'arme_shotgun_rechts'));
                    game.physics.enable(this.player_child_waffe, Phaser.Physics.ARCADE);
                    this.anchor.setTo(0.57, 0.25);
                    this.player_child_waffe.anchor.setTo(0.3, 0.1);
                    break;
                }
                break;
            case 'ak':
           
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
                    break;a
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
            // GegnerGruppe.animations.paused = true;
            aktiv = false;
            gegneraktiv = false;
        }
        this.body.velocity.x = 0;
        // Spieler bewegt sich in die linke Richtung
        if (this.aKey.isDown) {
            if (this.body.touching.down) {
                if (richtung != 1) {
                    richtung = 1;
                    this.movement();
                    this.waffe(this.weapon);
                    aktiv = false;
                }
                if (aktiv == false) {
                    this.animations.paused = false;

                    aktiv = true;
                }
                game.physics.arcade.isPaused = false;
                this.body.velocity.x = -150;
            } else {
                if (richtung != 4) {
                    richtung = 4;
                    this.movement();
                    this.waffe(this.weapon);
                    aktiv = false;
                }
                if (aktiv == false) {
                    this.animations.paused = false;
                    aktiv = true;
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
                    aktiv = false;
                }
                if (aktiv == false) {
                    this.animations.paused = false;
                    aktiv = true;
                }
                game.physics.arcade.isPaused = false;
                this.body.velocity.x = 150;
            } else {
                if (richtung != 3) {
                    richtung = 3;
                    this.movement();
                    this.waffe(this.weapon);
                    aktiv = false;
                }
                if (aktiv == false) {
                    this.animations.paused = false;
                    aktiv = true;
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
        if (this.spaceKey.isDown || (this.sKey.isDown && !(player.body.touching.down))) {
            game.physics.arcade.isPaused = false;
        }




    }


}