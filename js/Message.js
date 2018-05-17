class Message {
            constructor(nachricht) {
                this.nachricht = nachricht;
                var text = game.add.text(game.width / 2, game.height / 2, this.nachricht, {
                    fontSize: '50px',
                    fill: '#000',
                });
                text.anchor.setTo(0.5, 0.5);
            }

            toString() {
                return (nachricht);
            }

        }