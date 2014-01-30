MainGame.MainMenu = function (game) {
    this.game = game;
};

MainGame.MainMenu.prototype = {
    create: function(){
        var bg = this.game.add.sprite(0,0,'mainbg');
        
        this.game.input.onDown.add(this.beginGame, this);
    },
    
    beginGame: function(){
        this.game.state.start('bunnygame');
    }
}