var SCALE = 30;

function BunnyGame(){
	// create an new instance of a pixi stage
	this.stage = new PIXI.Stage(0x66FF99);
    this.world = new Object();
	this.setupPhysics();
    
	// create a renderer instance
	this.renderer = new PIXI.CanvasRenderer(400, 300);
	
	this.isKeyDown = false;
	this.keysPressed = new Array();
	this.bunny = new Bunny(this);
	this.back = new Back();
	this.fore = new Fore();
    this.block = new Block(this);
	
	// add the renderer view element to the DOM
	document.body.appendChild(this.renderer.view);
	
	this.stage.addChild(this.back);
	this.stage.addChild(this.fore);
	this.stage.addChild(this.bunny);
	this.stage.addChild(this.block);
	
	document.onkeydown = this.keydown.bind(this);
	
	document.onkeyup = this.keyup.bind(this);
	
	requestAnimFrame( this.update.bind(this) );
}

BunnyGame.constructor = BunnyGame;

BunnyGame.prototype.setupPhysics = function(){
    this.world = new box2d.b2World(new box2d.b2Vec2(0,50),true);
    
    //create ground
    var fixDef = new box2d.b2FixtureDef();
    fixDef.density = 1;
    fixDef.friction = 0.5;
    
    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = box2d.b2Body.b2_staticBody;
    bodyDef.position.x = 200 / SCALE;
    bodyDef.position.y = 300 / SCALE;
    
    fixDef.shape = new box2d.b2PolygonShape();
    fixDef.shape.SetAsBox(200 / SCALE, 40 / SCALE);
    
    this.world.CreateBody(bodyDef).CreateFixture(fixDef);

}

BunnyGame.prototype.keydown = function(evt){
	if(this.keysPressed.indexOf(evt.keyCode) == -1){
		this.keysPressed.push(evt.keyCode);
	}
	if(!this.isKeyDown){
		this.isKeyDown = true;
	}
}

BunnyGame.prototype.keyup = function(evt){
	var keyIndex = this.keysPressed.indexOf(evt.keyCode);
	if(keyIndex != -1){
		this.keysPressed.splice(keyIndex,1);
	}
	
	if(this.isKeyDown && this.keysPressed.length < 1){
		this.isKeyDown = false;
	}
}

BunnyGame.prototype.update = function(){
	    requestAnimFrame( this.update.bind(this) );
        
	    // just for fun, lets rotate mr rabbit a little
	    //bunny.rotation += 0.1;
		
        this.world.Step(1/60, 10, 10);
        this.world.ClearForces();
		
        //this.blockView.block.position.x = this.blockView.body.GetPosition().x * SCALE;
		this.bunny.update();
		this.back.update();
		this.fore.update();
        this.block.update();
		
	    // render the stage   
	    this.renderer.render(this.stage);
}
