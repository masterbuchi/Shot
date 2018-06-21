var boot = function (game) { };

boot.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#FFFFFF";

        game.load.audio('music', ['audio/music/music.mp3']);
    },
    create: function () {
        game.state.start("Preload");
    }
}