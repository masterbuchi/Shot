function preload() {

    // Hintergrund
    game.load.image('background', 'assets/background.jpg');
    // Plattform
    game.load.image('platform', 'assets/platform.png');
    // Boden
    game.load.image('ground', 'assets/ground.png');


    game.load.spritesheet('player', 'assets/player_sprite_oa.png', 212.6, 243);
    game.load.spritesheet('schwacherGegner', 'assets/gegner_schwach_sprite.png', 212.6, 243);
    game.load.spritesheet('starkerGegner', 'assets/gegner_stark_sprite.png', 212.6, 243);

    // Waffen

    // Pistole
    game.load.image('pistole', 'assets/pistole.png');
    game.load.image('pistolenSchuss', 'assets/Muni_pt.png');

    // Shotgun
    game.load.image('shotgun', 'assets/shotgun.png');
    game.load.image('shotgunSchuss', 'assets/Muni_sg.png');

    // AK
    game.load.image('ak', 'assets/ak47.png');
    game.load.image('akSchuss', 'assets/Muni_ak.png');

    // Raketenwerfer
    game.load.image('raketenwerfer', 'assets/raketenwerfer.png');
    game.load.image('rakete', 'assets/Muni_rw.png');
    game.load.image('explosion', 'assets/raketenexplosion.png');
    game.load.image('raketenspur', 'assets/raketenspur.png');


    // Arme

    //Gegner

    //Pistole gehend
    game.load.image('arme_gegner_pistole_rechts', 'assets/gegner_pt rechts.png');
    game.load.image('arme_gegner_pistole_links', 'assets/gegner_pt links.png');
    //Pistole stehend
    game.load.image('arme_gegner_pistole_zielend_rechts', 'assets/gegner_pt stehend rechts.png');
    game.load.image('arme_gegner_pistole_zielend_links', 'assets/gegner_pt stehend links.png');

    // Shotgun gehend/stehend 
    game.load.image('arme_gegner_shotgun_rechts', 'assets/gegner_sg rechts.png');
    game.load.image('arme_gegner_shotgun_links', 'assets/gegner_sg links.png');
    // AK Gehend
    game.load.image('arme_gegner_ak_rechts', 'assets/gegner_ak rechts.png');
    game.load.image('arme_gegner_ak_links', 'assets/gegner_ak links.png');
    // AK Kniend
    game.load.image('arme_gegner_ak_zielend_rechts', 'assets/gegner_ak kniend rechts.png');
    game.load.image('arme_gegner_ak_zielend_links', 'assets/gegner_ak kniend links.png');
    // Raketenwerfer 
    game.load.image('arme_gegner_rw_rechts', 'assets/gegner_rw rechts.png');
    game.load.image('arme_gegner_rw_links', 'assets/gegner_rw links.png');
    // Raketenwerfer kniend
    game.load.image('arme_gegner_rw_kniend_rechts', 'assets/gegner_rw kniend rechts.png');
    game.load.image('arme_gegner_rw_kniend_links', 'assets/gegner_rw kniend links.png');
    // Raketenwerfer liegend
    game.load.image('arme_gegner_rw_liegend_rechts', 'assets/gegner_rw liegend rechts.png');
    game.load.image('arme_gegner_rw_liegend_links', 'assets/gegner_rw liegend links.png');

}