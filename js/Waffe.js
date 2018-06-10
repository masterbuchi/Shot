class Waffe extends Phaser.Sprite{
    
    constructor(game, x, y, name, gravitation, bounce) {
        super(game, x, y, name);
        this.body.gravity.y = gravitation;
        this.body.bounce.y = bounce;
        this.body.collideWorldBounds = true;
        game.physics.arcade.enable(this);




    }

}