function Bunny(game){
	var texture = PIXI.Texture.fromImage("resources/bunny.png");
	PIXI.Sprite.call(this,texture);
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.position.x = 200;
	this.position.y = 300 - this.height;
	this.game = game;
}

Bunny.constructor = Bunny;
Bunny.prototype = Object.create(PIXI.Sprite.prototype);

Bunny.DELTA_MOVEMENT = 2;

Bunny.prototype.update = function(){
	if(game.isKeyDown){
		for(var i in game.keysPressed){
			switch (game.keysPressed[i]){
				case 38:
					if(this.position.y > 0 + (this.height / 2)){
						this.position.y -= Bunny.DELTA_MOVEMENT;
					}
				break;
				case 40:
					if(this.position.y < 300 - (this.height / 2)){
						this.position.y += Bunny.DELTA_MOVEMENT;
					}
				break;
				/*case 37:
					if(this.position.x > 0 + (this.width / 2)){
						this.position.x -= Bunny.DELTA_MOVEMENT;
					}
				break;
				case 39:
					if(this.position.x < 400 - (this.width / 2)){
						this.position.x += Bunny.DELTA_MOVEMENT;
					}
				break;*/
			}
		}
	}
}
