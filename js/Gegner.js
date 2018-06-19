// STATES DEFINIEREN DIE EINZELNEN LEVEL UND KÖNNEN SEPARAT MIT PRELOAD ETC GELADEN WERDEN: PHASER.STATE



class Gegner extends Phaser.Sprite {

    constructor(game, player) {
        super(game, 0, 0, 'schwacherGegner');
        this.player = player;
        this.exists = false;
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

        this.health -= this.schadenstypen[bullet.type];

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

    waffe(weapon) {


        switch (weapon) {
            case 'pistol_walk':
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

            case 'pistol_stand':

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

                }
            case 'pistol_kneel':

                if (game.math.radToDeg(game.physics.arcade.angleBetween(this, player)) <= 50 || game.math.radToDeg(game.physics.arcade.angleBetween(this, player)) >= 145) {

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

            case 'shotgun_walk':
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

            case 'shotgun_stand':


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

            default:
                null;
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
        var waffe = this.game.Waffen.getFirstExists(false);


        if (this.weapon.includes('shotgun')) {
            waffe.spawn(this.x, this.y, 'shotgun');
        } 
        else if (this.weapon.includes('pistol')) {
            waffe.spawn(this.x, this.y, 'pistole');
        } 
        else if (this.weapon.includes('rakete')) {
            waffe.spawn(this.x, this.y, 'raketenwerfer');
        } 
        else if (this.weapon.includes('AK')) {
            waffe.spawn(this.x, this.y, 'ak');
        } 


        this.exists = false;
    }



    update() {


        if (!this.tod.isPlaying) {


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

            // if (this.exists)
            //     console.log(game.math.radToDeg(game.physics.arcade.angleBetween(this, player)))


            if (this.child_waffe != null) {
                this.child_waffe.angle = game.math.radToDeg(game.physics.arcade.angleBetween(this, player));



                if (this.movement == 'stand_left' || this.movement == 'left' || this.movement == 'kneel_left' || this.movement == 'lie_left')
                    this.child_waffe.angle += 180;
            }



        }
    }




}