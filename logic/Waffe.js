class Waffe extends Phaser.Sprite {

    constructor(game) {
        super(game, 0, 0, null);
        this.exists = false;
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 100;
        this.body.bounce.y = 0.1;
        this.body.setSize(20,20);
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