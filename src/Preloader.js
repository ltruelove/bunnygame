var MainGame = {};

MainGame.Preloader = function(game) {
    this.game = game;
};

MainGame.Preloader.prototype = {
    preload: function(){
        this.game.load.image('bunny', '/resources/bunny.png');
        this.game.load.image('mainbg', 'resources/main_bg.png');
        this.game.load.spritesheet('alien', '/resources/p3_walk.png', 66, 93, 3);
    },
    create: function() {
        this.game.state.start('mainmenu');
    }
}
