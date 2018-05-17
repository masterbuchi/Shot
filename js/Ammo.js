     class Ammo {
            constructor(anzahl, name, bulletspeed, firerate, firelimit, trackspritex, trackspritey) {
                this.anzahl = anzahl;
                this.name = name;
                this.bulletspeed = bulletspeed;
                this.firerate = firerate;
                this.firelimit = firelimit;
                this.trackspritex = trackspritex;
                this.trackspritey = trackspritey;

                var schuss = game.add.weapon(this.anzahl, this.name);
                schuss.enableBody = true;
                schuss.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
                schuss.bulletSpeed = this.bulletspeed;
                schuss.fireRate = this.firerate;
                schuss.fireLimit = this.firelimit;
                schuss.trackSprite(player, this.trackspritex, this.trackspritey);
                this.schuss = schuss;
            }

            getSchuss() {
                return this.schuss;
            }
        }