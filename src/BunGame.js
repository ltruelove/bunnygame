MainGame.BunnyGame = function(game) {
    this.game = game;
    this.bunnySprite = null;
    this.map = null;
    this.tileset = null;
    this.layer = null;
    this.cursors = null;
}

MainGame.BunnyGame.prototype = {
    preload: function(){
        this.game.load.tilemap("platforms", "/resources/platforms.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset("land", "/resources/land.png", 32, 32);
    },
    
    create: function() {
        this.map = this.game.add.tilemap("platforms");
        this.game.stage.backgroundColor = '#333';
        this.tileset = this.game.add.tileset("land");
        this.tileset.setCollisionRange(0, this.tileset.total-1, true, true, true, true);
    
        //add a background tile layer
        this.bglayer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 0);
        // now we need to create a game layer, and assign it a tile set and a map
        this.layer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 1);
    
        this.bunnySprite = this.game.add.sprite(10, 3800, 'bunny');
        this.bunnySprite.body.gravity.y = 6;
        // I'm not so sure we need this one.
        this.bunnySprite.body.collideWorldBounds = true;
    
        this.game.world.setBounds(0,0,30*32,120*32); //setting the bounds of the entire level
        this.game.camera.follow(this.bunnySprite); //bounds lets us set the camera to follow the character
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        this.game.physics.collide(this.bunnySprite, this.layer)
        this.bunnySprite.body.velocity.x = 0;
        
        // are we moving left?
        if (this.cursors.left.isDown){
            this.bunnySprite.body.velocity.x = -150;
        }
        // are we moving right?
        if (this.cursors.right.isDown){
            this.bunnySprite.body.velocity.x = 150;
        }
        // are we jumping? 
        if (this.cursors.up.isDown && this.bunnySprite.body.touching.down){
            this.bunnySprite.body.velocity.y = -275;
        }
    }
}


