class Bullets extends Phaser.Weapon {
  constructor(game, anzahl, name, bulletspeed, firerate, firelimit) {
    super(game, game.plugins);
    this.anzahl = anzahl;
    this.name = name;
    this.bulletSpeed = bulletspeed;
    this.fireRate  = firerate;
    this.fireLimit = firelimit;
    this.autoExpandBulletsGroup = false;
    
    
    this.createBullets(this.anzahl, this.name);
    this.enableBody = true;
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.bullets.setAll('type', name);

    /*the hack*/
    this.active = true; /*active plugin*/
    this.hasUpdate = true;
    game.plugins.add(Phaser.Weapon); /*Only for the game.plugins(PluginManager) start running*/
    game.plugins.plugins.push(this); /*add my weapon in the PluginManager*/

    
    
  }


}