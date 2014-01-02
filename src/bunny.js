function Bunny(game){
	var texture = PIXI.Texture.fromImage("resources/bunny.png");
	PIXI.Sprite.call(this,texture);
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.position.x = 200;
	this.position.y = 0;
	this.game = game;
    
    var fixDef = new box2d.b2FixtureDef();
    fixDef.density = 1;
    fixDef.friction = 0.5;
    
    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = box2d.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.position.x / SCALE;
    bodyDef.position.y = this.position.y / SCALE;
    
    fixDef.shape = new box2d.b2PolygonShape();
    fixDef.shape.SetAsBox(this.width / SCALE, this.height / SCALE);
    
    this.body = game.world.CreateBody(bodyDef);
    this.body.CreateFixture(fixDef);
}

Bunny.constructor = Bunny;
Bunny.prototype = Object.create(PIXI.Sprite.prototype);

Bunny.DELTA_MOVEMENT = 2;

Bunny.prototype.update = function(){
	
    this.position.y = this.body.GetPosition().y * SCALE;
    //this.position.x = this.body.GetPosition().x * SCALE;
    /*
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
				case 37:
					if(this.position.x > 0 + (this.width / 2)){
						this.position.x -= Bunny.DELTA_MOVEMENT;
					}
				break;
				case 39:
					if(this.position.x < 400 - (this.width / 2)){
						this.position.x += Bunny.DELTA_MOVEMENT;
					}
				break;
			}
		}
	}
    */
}
