class SchwacherGegner {

            constructor(x, y) {

                this.x = x;
                this.y = y;

                var ab = game.add.sprite(x, y, 'schwacherGegner');
                game.physics.arcade.enable(ab);
                ab.body.gravity.y = 200;
                ab.body.collideWorldBounds = true;

                ab.scale.setTo(0.5,0.5);
                ab.health = 2;

                ab.body.bounce.y = 0.5;

                gegnerZahl = gegnerZahl + 1;
            }

        }