class Bullets extends Phaser.Weapon {
    constructor(game, anzahl, name, bulletspeed, firerate, firelimit, trackspritex, trackspritey){
      super(game, game.plugins);
      this.anzahl = anzahl;
      this.name = name;
      this.bulletspeed = bulletspeed;
      this.firerate = firerate;
      this.firelimit = firelimit;
      this.trackspritex = trackspritex;
      this.trackspritey = trackspritey;
      
      
      /*the hack*/
      this.active = true; /*active plugin*/
      this.hasUpdate = true;
      var test = game.plugins.add(Phaser.Weapon); /*Only for the game.plugins(PluginManager) start running*/
      game.plugins.plugins.push(this); /*add my weapon in the PluginManager*/

      this.createBullets(this.anzahl, this.name);
      this.enableBody = true;
      this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      this.bulletSpeed = this.bulletspeed;
      this.fireRate = this.firerate;
      this.fireLimit = this.firelimit;
      this.trackSprite(player, this.trackspritex, this.trackspritey);

    }


    
}

     
      
     