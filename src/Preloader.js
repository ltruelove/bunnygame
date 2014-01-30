var MainGame = {};

MainGame.Preloader = function(game) {
    this.game = game;
};

MainGame.Preloader.prototype = {
    preload: function(){
        this.game.load.image('bunny', '/resources/bunny.png');
        this.game.load.image('mainbg', 'resources/main_bg.png');
    },
    create: function() {
        this.game.state.start('mainmenu');
    }
}