class Weapon{
            constructor(x, y, name, gravitation, bounce) {
                this.x = x;
                this.y = y;
                this.name = name;
                this.gravitation = gravitation;
                this.bounce = bounce;

                var waffe = game.add.sprite(this.x, this.y, this.name);
                game.physics.arcade.enable(waffe);
                waffe.body.gravity.y = this.gravitation;
                waffe.body.bounce.y = this.bounce;
                waffe.body.collideWorldBounds = true;
                this.waffe = waffe;
            }

            getWeapon() {
                return this.waffe;
            }

        }