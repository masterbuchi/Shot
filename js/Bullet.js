     class Bullet extends Phaser.Weapon {
         constructor(anzahl, bulletspeed, firerate, firelimit, trackspritex, trackspritey) {
             super(anzahl, );
             this.enableBody = true;
             this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
             this.bulletSpeed = bulletspeed;
             this.fireRate = firerate;
             this.fireLimit = firelimit;
            //  this.trackSprite(player, trackspritex, trackspritey);
             this.active = true;
             this.bullets = anzahl;
         }

     }