class Waffe extends Phaser.Sprite {

    constructor(game, gravitation, bounce) {

        super(game, 0, 0, null);
        this.exists = false;
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = gravitation;
        this.body.bounce.y = bounce;
    }

    stdReset(x, y) {
        this.reset(x, y);
        this.exists = true;
    }

    spawn(x, y, type) {
        this.stdReset(x, y);
        this.loadTexture(type);
    }
}