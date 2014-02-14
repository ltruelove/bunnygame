MainGame.BunnyGame = function(game) {
    this.game = game;
    this.bunnySprite = null;
    this.goalSprite = null;
    this.map = null;
    this.tileset = null;
    this.layer = null;
    this.cursors = null;
    this.tileWidth = 70;
    this.tileHeight = 70;
    this.tilesWide = 20;
    this.tilesHigh = 52;
    this.music = null;
    this.background = null;
}

MainGame.BunnyGame.prototype = {
    preload: function(){
        this.game.load.tilemap("platforms", "/resources/level1.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset("land", "/resources/tiles_spritesheet.png", this.tileWidth, this.tileHeight,144,0,1);
        this.game.load.image('spikes', 'resources/coinGold.png');
        game.load.audio('music', ['/resources/L1Audio.mp3']);
        this.game.load.image('L1BG', 'resources/level1bg.png');
    },
    
    create: function() {
        this.map = this.game.add.tilemap("platforms");
        this.game.stage.backgroundColor = '#000';
        this.background = this.game.add.tileSprite(0, 0, 1400, 3640, "L1BG");
        //background = this.game.add.tileSprite(0, 0, 1400, 3500, "L1BG");
        this.tileset = this.game.add.tileset("land");
        this.tileset.spacing = 1;
        this.tileset.setCollisionRange(0, this.tileset.total-1, true, true, true, true);
    
        //add a background tile layer
        //this.bglayer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 0);
        // now we need to create a game layer, and assign it a tile set and a map
        this.layer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 0);
    
        //this.music = game.add.audio('music');
        //this.music.play();

        this.bunnySprite = this.game.add.sprite(10, 3400, 'alien');
        this.bunnySprite.animations.add('walk');
        // Set Anchor to the center of your sprite
        this.bunnySprite.anchor.setTo(.5,1);

        this.bunnySprite.body.gravity.y = 15;
        // I'm not so sure we need this one.
        this.bunnySprite.body.collideWorldBounds = true;

        //add the goal sprite
        this.goalSprite = this.game.add.sprite((this.tilesWide - 1) * this.tileWidth,
                                               this.tileHeight * 5,'spikes');
        this.goalSprite.name = 'goal';
        this.goalSprite.body.immovable = true;
    
        this.game.world.setBounds(0,0,this.tilesWide*this.tileWidth,
        this.tilesHigh*this.tileHeight); //setting the bounds of the entire level
        this.game.camera.follow(this.bunnySprite); //bounds lets us set the camera to follow the character
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        this.game.physics.collide(this.bunnySprite, this.layer)
        this.game.physics.collide(this.bunnySprite, this.goalSprite, this.goalCollision, null, this);
        this.bunnySprite.body.velocity.x = 0;
        
        // are we moving left?
        if (this.cursors.left.isDown){
            this.bunnySprite.body.velocity.x = -200;
            // Invert scale.x to flip left/right
            this.bunnySprite.scale.x = -1;
            this.bunnySprite.animations.play('walk',20,true);
            if(this.bunnySprite.position.x > 0 && this.game.camera.view.x > 0){
                this.background.tilePosition.x += .1;
            }
        }
        // are we moving right?
        if (this.cursors.right.isDown){
            this.bunnySprite.body.velocity.x = 200;
            this.bunnySprite.scale.x = 1;
            this.bunnySprite.animations.play('walk',20,true);
            if(this.bunnySprite.position.x < 
               (this.tileWidth * this.tilesWide - this.bunnySprite.width)){
                this.background.tilePosition.x -= .1;
            }
        }

        // are we jumping? 
        if (this.cursors.up.isDown && this.bunnySprite.body.touching.down){
            this.bunnySprite.body.velocity.y = -750;
            this.bunnySprite.animations.stop('walk');
        }
        if(this.bunnySprite.body.velocity.x == 0 || !this.bunnySprite.body.touching.down){
            this.bunnySprite.animations.stop('walk');
        }
    },

    goalCollision: function(player, goal){
        goal.destroy();
        this.game.state.start('level2');
    }
}


