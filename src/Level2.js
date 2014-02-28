MainGame.Level2 = function(game) {
    this.game = game;
    this.bunnySprite = null;
    this.map = null;
    this.tileset = null;
    this.spiketileset = null;
    this.layer = null;
    this.cursors = null;
    this.tileWidth = 70;
    this.tileHeight = 70;
    this.tilesWide = 50;
    this.tilesHigh = 15;
    this.music = null;
    this.background = null;
    this.walkFrames = null;
}

MainGame.Level2.prototype = {
    preload: function(){
        this.game.load.tilemap("platforms", "/resources/level2.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap("spikes", "/resources/level2spikes.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset("land", "/resources/tiles_spritesheet.png", this.tileWidth, this.tileHeight,144,0,1);
        this.game.load.image('L2BG', 'resources/level2bg.png');
    },
    
    create: function() {
        this.map = this.game.add.tilemap("platforms");
        this.spikemap = this.game.add.tilemap("spikes");
        this.game.stage.backgroundColor = '#000';
        this.background = this.game.add.tileSprite(0, 0, 3500, 1050, "L2BG");
        this.tileset = this.game.add.tileset("land");
        this.spiketileset = this.game.add.tileset("land");
        this.tileset.setCollisionRange(0, this.tileset.total-1, true, true, true, true);
        this.spiketileset.setCollisionRange(0, 60, true, true, true, true);
    
        //add a background tile layer
        this.spikeLayer = this.game.add.tilemapLayer(0, 0, 800, 600, this.spiketileset, this.spikemap, 0);
        this.bglayer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 0);
        // now we need to create a game layer, and assign it a tile set and a map
        this.layer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 1);
    
        //this.music = game.add.audio('music');
        //this.music.play();

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.bunnySprite = new MainGame.Player(this.game, 10, 700, this.cursors);
        this.bunnySprite.animatePlayer();
    
        this.game.world.setBounds(0,0,this.tilesWide*this.tileWidth,
        this.tilesHigh*this.tileHeight); //setting the bounds of the entire level
        this.game.camera.follow(this.bunnySprite); //bounds lets us set the camera to follow the character
    },
    
    update: function(){
        this.game.physics.collide(this.bunnySprite, this.layer);
        this.game.physics.collide(this.bunnySprite, this.spikeLayer, this.spikeCollision, null, this);
        
        // are we moving left?
        if (this.cursors.left.isDown){
            if(this.bunnySprite.position.x > 0 && this.game.camera.view.x > 0){
                this.background.tilePosition.x += .1;
            }
        }
        // are we moving right?
        if (this.cursors.right.isDown){
            if(this.bunnySprite.position.x < (this.tileWidth * this.tilesWide - this.bunnySprite.width)){
                this.background.tilePosition.x -= .1;
            }
        }

        this.bunnySprite.updatePlayer();
    },

    spikeCollision: function(a, b){
        this.game.state.start('level2');
    },
    
    destroy: function(){
        this.game = null;
        this.bunnySprite = null;
        this.map = null;
        this.tileset = null;
        this.spiketileset = null;
        this.layer = null;
        this.cursors = null;
        this.tileWidth = null;
        this.tileHeight = null;
        this.tilesWide = null;
        this.tilesHigh = null;
        this.music = null;
        this.background = null;
        this.walkFrames = null;
    }
}


