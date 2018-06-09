class Player extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, 'player');

        this.exists = false;
        this.scale.setTo(0.5, 0.5);
        this.anchor.setTo(0.5, 0.27);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 200;



        this.schadenstypen = {
            pistole: 5,
            shotgun: 1,
            ak: 5,
            raketenwerfer: 1000,
        };


        this.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 15, true);
        this.animations.add('left', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 15, true);
        this.animations.add('jump_right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
            15, false);
        this.animations.add('jump_left', [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
            15, false);



        this.maxHealth = 15;
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
        this.energy = this.maxHealth;
        this.exists = true;
        this.dying = false;
        this.sleeping = true;
    }

    waffe(weapon) {
        if (weapon == 'keine') {

        }
    }


    spawn(x, y, weapon) {
        this.stdReset(x, y);
        this.weapon = weapon;
        this.waffe(weapon);


    }

    hit(bullet) {
        this.health -= this.vulnerabilities[bullet.type];

        if (this.health < 1) {
            this.dying = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.play('die');
        }
    }
    death() {
        // this.game.weapons.createNew(this.x, this.y, "Waffe");
        this.exists = false;
    }

    movement() {
        switch (richtung) {
            case 1:
                this.animations.play('left');
                console.log("links");
                break;
            case 2:
            this.animations.play('right');
                console.log("rechts");
                break;
            case 3:
            this.animations.play('jump_right');
                console.log("sprung_rechts");
                break;
            case 4:
            this.animations.play('jump_left');
                console.log("sprung_links");
                break;
        }
    }

    update() {

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