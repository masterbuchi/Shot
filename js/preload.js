function preload() {

            // Hintergrund
            game.load.image('sky', 'assets/background.png');
            // Plattform
            game.load.image('platform', 'assets/platform.png');
            // Boden
            game.load.image('ground', 'assets/ground.png');


            game.load.spritesheet('player', 'assets/player.png', 212.6, 243);
            game.load.spritesheet('schwacherGegner', 'assets/gegner_schwach.png', 212.6, 243);
            game.load.spritesheet('starkerGegner', 'assets/gegner_stark.png', 212.6, 243);

            // Waffen

            // Raketenwerfer
            game.load.image('Raketenwerfer', 'assets/waffen_munition/raketenwerfer.png');
            game.load.image('rakete', 'assets/waffen_munition/rakete.png');
            game.load.image('Explosion', 'assets/waffen_munition/raketenexplosion.png');
            game.load.image('raketenspur', 'assets/waffen_munition/raketenspur.png');

            // Shotgun
            game.load.image('shotgunSchuss', 'assets/waffen_munition/shotgunSchuss.png');
            game.load.image('shotgun', 'assets/waffen_munition/shotgun.png');

            // Pistole
            game.load.image('pistole', 'assets/waffen_munition/pistole.png');
            game.load.image('pistolenSchuss', 'assets/waffen_munition/pistolenSchuss.png');

            // AK
            game.load.image('ak', 'assets/waffen_munition/ak47.png');
            game.load.image('akSchuss', 'assets/waffen_munition/akSchuss.png');

        }