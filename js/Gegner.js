class Gegner {

            constructor(x, y, name, gravity, scale, health, bounce) {

                this.x = x;
                this.y = y;
                this.name = name;
                this.gravity = gravity;
                this.scale = scale;
                this.health = health;
                this.bounce = bounce;

                var gegner = game.add.sprite(this.x, this.y, this.name);
                game.physics.arcade.enable(gegner);
                gegner.body.gravity.y = this.gravity;
                gegner.body.collideWorldBounds = true;

                gegner.scale.setTo(this.scale);
                gegner.health = this.health;

                gegner.body.bounce.y = this.bounce;

                gegnerZahl = gegnerZahl + 1;

                this.gegner = gegner;
            }

            getGegner() {
                return this.gegner;
            }

        }