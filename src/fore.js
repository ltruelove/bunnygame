function Fore(game){
	var texture = PIXI.Texture.fromImage("resources/fore.png");
	PIXI.TilingSprite.call(this,texture,400,300);
	
	this.game = game;
	this.position.x = 0;
	this.position.y = 150;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;
}

Fore.constructor = Fore;
Fore.prototype = Object.create(PIXI.TilingSprite.prototype);
Fore.DELTA_X = 0.64;

Fore.prototype.update = function(){
	if(game.isKeyDown){
		for(var i in game.keysPressed){
			switch (game.keysPressed[i]){
				case 37:
					this.tilePosition.x += Fore.DELTA_X;
				break;
				case 39:
					this.tilePosition.x -= Fore.DELTA_X;
				break;
			}
		}
	}
}