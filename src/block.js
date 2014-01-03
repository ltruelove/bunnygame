function Block(game){
	var texture = PIXI.Texture.fromImage("resources/block.png");
	PIXI.Sprite.call(this,texture);
	
	this.game = game;
    this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.position.x = 250;
	this.position.y = 10;
    
    var fixDef = new box2d.b2FixtureDef();
    fixDef.density = 5;
    fixDef.friction = 0.5;
    
    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = box2d.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.position.x / SCALE;
    bodyDef.position.y = this.position.y / SCALE;
    
    fixDef.shape = new box2d.b2PolygonShape();
    fixDef.shape.SetAsBox(this.width / SCALE, this.height / SCALE);
    
    this.body = game.world.CreateBody(bodyDef);
    var blockFix = this.body.CreateFixture(fixDef);
    blockFix.SetUserData(5);
}

Block.constructor = Fore;
Block.prototype = Object.create(PIXI.Sprite.prototype);

Block.prototype.update = function(){
	if(game.isKeyDown){
		for(var i in game.keysPressed){
			switch (game.keysPressed[i]){
				case 37:
					this.position.x += 1;
                    this.body.SetPosition(new box2d.b2Vec2(this.position.x / SCALE,this.body.GetPosition().y));
				break;
				case 39:
					this.position.x -= 1;
                    this.body.SetPosition(new box2d.b2Vec2(this.position.x / SCALE,this.body.GetPosition().y));
				break;
			}
		}
	}
    this.position.y = this.body.GetPosition().y * SCALE;
}
