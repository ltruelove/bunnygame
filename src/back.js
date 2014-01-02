function Back(game){
	var texture = PIXI.Texture.fromImage("resources/back.png");
	PIXI.TilingSprite.call(this,texture,400,300);
	
	this.game = game;
	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;
}

Back.constructor = Back;
Back.prototype = Object.create(PIXI.TilingSprite.prototype);
Back.DELTA_X = 0.128;

Back.prototype.update = function(){
	if(game.isKeyDown){
		for(var i in game.keysPressed){
			switch (game.keysPressed[i]){
				case 37:
					this.tilePosition.x += Back.DELTA_X;
				break;
				case 39:
					this.tilePosition.x -= Back.DELTA_X;
				break;
			}
		}
	}
}