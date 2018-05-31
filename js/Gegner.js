class Gegner extends Phaser.Sprite {

    constructor(game) {
        super(game, 0, 0, 'schwacherGegner');
        this.exists = false;
        this.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 200;


        this.schadenstypen = {
            pistole: 5,
            shotgun: 1,
            ak: 5,
            raketenwerfer: 1000,
        };

        this.maxHealth = 15;
        this.damage = 1000;


        this.animations.add('gegner_left', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        


        // let anim = this.animations.add("deathAnimation", ["boom0", "boom1", "boom2"], 15, false); // generic explosion when killed, can be overrided of course
        // anim.onComplete.add(this.death, this);


    }

    stdReset(x, y) {
        this.reset(x, y);
        this.energy = this.maxHealth;
        this.exists = true;
        this.dying = false;
        this.sleeping = true;
    }

    bewegung(movement) {
        this.movement = movement;
        switch (this.movement) {
            case 'left':
                this.body.velocity.x = -100
                this.animations.play('gegner_left');
                break;
            case 'right':
                this.body.velocity.x = 100
                this.animations.play('gegner_left');
                break;
            case 'stand_left':
                this.body.velocity.x = 0
                break;
            case 'stand_right':
                this.body.velocity.x = 0
                break;
            case 'kneel_left':
                this.body.velocity.x = 0
                break;
            case 'kneel_right':
                this.body.velocity.x = 0
                break;
            case 'lie_left':
                this.body.velocity.x = 0
                break;
            case 'lie_right':
                this.body.velocity.x = 0
                break;
        }
    }
    spawn(x, y, type, movement) {
        this.stdReset(x, y);
        this.type = type;
        this.movement = movement;

        if (this.type == 'starkerGegner') {
            this.maxHealth = 25;
            this.loadTexture('starkerGegner');
        }
        this.bewegung(this.movement);
    }


    hit(bullet) {
        this.health -= this.vulnerabilities[bullet.type];

        if (this.health < 1) {
            this.dying = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            //this.play("deathAnimation");
        }
    }

   


    death() {
        this.exists = false;
    }

    update() {
        // if(!this.stdUpdate()){return;}; // Do a standard update from Enemy class to check if update should even be done
        this.game.physics.arcade.collide(this, this.game.collisionLayer);
        if (this.body.blocked.right) {
            this.scale.x = -1;
            this.body.velocity.x = -this.speed;
        } else if (this.body.blocked.left) {
            this.scale.x = 1;
            this.body.velocity.x = this.speed;
        }
    }



}