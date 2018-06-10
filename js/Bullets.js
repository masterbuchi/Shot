     class Bullets extends Phaser.Weapon {
         constructor(anzahl, name, bulletspeed, firerate, firelimit, trackspritex, trackspritey) {
             super(game);
            
             this.enableBody = true;
             this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
             this.bulletSpeed = bulletspeed;
             this.fireRate = firerate;
             this.fireLimit = firelimit;
            this.trackSprite(player, trackspritex, trackspritey);
         }

     }