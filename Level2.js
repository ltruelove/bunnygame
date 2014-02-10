MainGame.Level2 = function(game) {
    this.game = game;
    this.bunnySprite = null;
    this.map = null;
    this.tileset = null;
    this.layer = null;
    this.cursors = null;
    this.tileWidth = 70;
    this.tileHeight = 70;
    this.tilesWide = 50;
    this.tilesHigh = 10;
    this.music = null;
}

MainGame.Level2.prototype = {
    preload: function(){
        this.game.load.tilemap("platforms", "/resources/level2.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset("land", "/resources/tiles_spritesheet.png", this.tileWidth, this.tileHeight,144,0,1);
    },
    
    create: function() {
        this.map = this.game.add.tilemap("platforms");
        this.game.stage.backgroundColor = '#FFF';
        //background = this.game.add.tileSprite(0, 0, 1400, 3500, "L1BG");
        this.tileset = this.game.add.tileset("land");
        this.tileset.setCollisionRange(0, this.tileset.total-1, true, true, true, true);
    
        //add a background tile layer
        //this.bglayer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 0);
        // now we need to create a game layer, and assign it a tile set and a map
        debugger();
        this.layer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 1);
    
        //this.music = game.add.audio('music');
        //this.music.play();

        this.bunnySprite = this.game.add.sprite(10, 0, 'alien');
        this.bunnySprite.animations.add('walk');
        // Set Anchor to the center of your sprite
        this.bunnySprite.anchor.setTo(.5,1);

        this.bunnySprite.body.gravity.y = 15;
        // I'm not so sure we need this one.
        this.bunnySprite.body.collideWorldBounds = true;
    
        this.game.world.setBounds(0,0,this.tilesWide*this.tileWidth,
        this.tilesHigh*this.tileHeight); //setting the bounds of the entire level
        this.game.camera.follow(this.bunnySprite); //bounds lets us set the camera to follow the character
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        this.game.physics.collide(this.bunnySprite, this.layer)
        this.bunnySprite.body.velocity.x = 0;
        
        // are we moving left?
        if (this.cursors.left.isDown){
            this.bunnySprite.body.velocity.x = -200;
            // Invert scale.x to flip left/right
            this.bunnySprite.scale.x = -1;
            this.bunnySprite.animations.play('walk',20,true);
        }
        // are we moving right?
        if (this.cursors.right.isDown){
            this.bunnySprite.body.velocity.x = 200;
            this.bunnySprite.scale.x = 1;
            this.bunnySprite.animations.play('walk',20,true);
        }

        // are we jumping? 
        if (this.cursors.up.isDown && this.bunnySprite.body.touching.down){
            this.bunnySprite.body.velocity.y = -750;
            this.bunnySprite.animations.stop('walk');
        }
        if(this.bunnySprite.body.velocity.x == 0 || !this.bunnySprite.body.touching.down){
            this.bunnySprite.animations.stop('walk');
        }
    }
}


