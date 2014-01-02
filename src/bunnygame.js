function BunnyGame(){
	// create an new instance of a pixi stage
	this.stage = new PIXI.Stage(0x66FF99);
	
	// create a renderer instance
	this.renderer = new PIXI.CanvasRenderer(400, 300);
	
	this.isKeyDown = false;
	this.keysPressed = new Array();
	this.bunny = new Bunny(this);
	this.back = new Back();
	this.fore = new Fore();
	
	// add the renderer view element to the DOM
	document.body.appendChild(this.renderer.view);
	
	// create a texture from an image path
	var blockTexture = PIXI.Texture.fromImage("resources/block.png");
	// create a new Sprite using the texture
	var block = new PIXI.Sprite(blockTexture);
	
	//position the block sprite
	block.position.x = 150;
	block.position.y = 67;
	
	this.stage.addChild(this.back);
	this.stage.addChild(this.fore);
	this.stage.addChild(block);
	this.stage.addChild(this.bunny);
	
	document.onkeydown = this.keydown.bind(this);
	
	document.onkeyup = this.keyup.bind(this);
	
	requestAnimFrame( this.update.bind(this) );
}

BunnyGame.constructor = BunnyGame;

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
	    // just for fun, lets rotate mr rabbit a little
	    //bunny.rotation += 0.1;
		
		this.bunny.update();
		this.back.update();
		this.fore.update();
		
	    // render the stage   
	    this.renderer.render(this.stage);
		
	    requestAnimFrame( this.update.bind(this) );
}