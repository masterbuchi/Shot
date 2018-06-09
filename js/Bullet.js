     class Bullet extends Phaser.Weapon {
         constructor(game, anzahl, name, bulletspeed, firerate, firelimit, trackspritex, trackspritey, player) {
             super(game);
             this.enableBody = true;
             this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
             this.bulletSpeed = bulletspeed;
             this.fireRate = firerate;
             this.fireLimit = firelimit;
             this.trackSprite(player, trackspritex, trackspritey);
             this.active = true;
             this.bullets = anzahl;
         }

     }