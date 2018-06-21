class Bullets extends Phaser.Weapon {
  constructor(game, anzahl, name, bulletspeed, firerate, firelimit, trackspritex, trackspritey, autofire) {
    super(game, game.plugins);
    this.autofire = autofire;
    this.anzahl = anzahl;
    this.name = name;
    this.bulletspeed = bulletspeed;
    this.firerate = firerate;
    this.firelimit = firelimit;
    this.trackspritex = trackspritex;
    this.trackspritey = trackspritey;
    this.autoExpandBulletsGroup = false;


    /*the hack*/
    this.active = true; /*active plugin*/
    this.hasUpdate = true;
    game.plugins.add(Phaser.Weapon); /*Only for the game.plugins(PluginManager) start running*/
    game.plugins.plugins.push(this); /*add my weapon in the PluginManager*/

    this.createBullets(this.anzahl, this.name);
    this.enableBody = true;
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.trackSprite(player, this.trackspritex, this.trackspritey);
    this.bullets.setAll('type', name);
    
  }


}