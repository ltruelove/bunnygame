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
    this.leftButton = null;
    this.rightButton = null;
    this.jumpButton = null;
    this.walkFrames = null;
    this.slimeWalkFrames = null;
    this.slimeLeft = true;
    this.playerAnimFrames = 15;
}

MainGame.BunnyGame.prototype = {
    preload: function(){
        this.game.load.tilemap("platforms", "/resources/level1.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset("land", "/resources/tiles_spritesheet.png", this.tileWidth, this.tileHeight,144,0,1);
        this.game.load.image('spikes', 'resources/coinGold.png');
        game.load.audio('music', ['/resources/L1Audio.mp3']);
        this.game.load.image('L1BG', 'resources/level1bg.png');
        this.game.load.atlas("enemies", "/resources/enemies_spritesheet.png","/resources/enemies_atlas.xml", null, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);
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

        //add a test enemy
        this.testSlime = this.game.add.sprite(100, 3400, 'enemies',12);
        this.testSlime.body.gravity.y = 15;
        this.testSlime.body.collideWorldBounds = true;
        this.slimeWalkFrames = Phaser.Animation.generateFrameNames('slimeWalk', 1, 2, '', 0);
        this.testSlime.animations.add('slimewalk',this.slimeWalkFrames,5,true,false);
        this.testSlime.anchor.setTo(.5,1);

        this.bunnySprite = this.game.add.sprite(10, 3400, 'alien');
        this.walkFrames = Phaser.Animation.generateFrameNames('p3_walk', 1, 11, '', 1);
        this.bunnySprite.animations.add('walk',this.walkFrames,20,true,false);
        this.bunnySprite.animations.add('jump',["p3_jump"],20,true,false);
        this.bunnySprite.animations.add('stand',["p3_stand"],20,true,false);
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
        //make the player collide with the world
        this.game.physics.collide(this.bunnySprite, this.layer);

        //make the test enemy collide with the world
        this.game.physics.collide(this.testSlime, this.layer);

        //handle the collision of the player and the goal
        this.game.physics.collide(this.bunnySprite, this.goalSprite, this.goalCollision, null, this);

        //reset velocities
        this.bunnySprite.body.velocity.x = 0;
        this.testSlime.body.velocity.x = 0;
        
        //animate the test enemy
        if(this.testSlime.body.touching.down){
            if(this.testSlime.position.x - (this.testSlime.body.halfWidth) <= this.game.world.bounds.x){
                this.slimeLeft = false;
            }

            if(this.testSlime.position.x >= this.game.world.bounds.right - (this.testSlime.body.halfWidth + 1)){
                this.slimeLeft = true;
            }

            if(this.slimeLeft == true){
                //test enemy moves left
                this.testSlime.body.velocity.x = -50;
                this.testSlime.scale.x = +1;
            }else{
                //test enemy moves right
                this.testSlime.body.velocity.x = +50;
                this.testSlime.scale.x = -1;
            }
        }
        this.testSlime.animations.play('slimewalk',5,true);
        
        // are we moving left?
        if (this.cursors.left.isDown){
            this.bunnySprite.body.velocity.x = -200;
            // Invert scale.x to flip left/right
            this.bunnySprite.scale.x = -1;
            this.bunnySprite.animations.play('walk',this.playerAnimFrames,true);
            if(this.bunnySprite.position.x > 0 && this.game.camera.view.x > 0){
                this.background.tilePosition.x += .1;
            }
        }
        // are we moving right?
        if (this.cursors.right.isDown){
            this.bunnySprite.body.velocity.x = 200;
            this.bunnySprite.scale.x = 1;
            this.bunnySprite.animations.play('walk',this.playerAnimFrames,true);
            if(this.bunnySprite.position.x < 
               (this.tileWidth * this.tilesWide - this.bunnySprite.width)){
                this.background.tilePosition.x -= .1;
            }
        }

        //standing still
        if(this.bunnySprite.body.velocity.x == 0){
            this.bunnySprite.animations.stop('walk');
            this.bunnySprite.animations.play('stand',this.playerAnimFrames,true);
        }

        //did we press the jump key?
        if (this.cursors.up.isDown && this.bunnySprite.body.touching.down){
            this.bunnySprite.body.velocity.y = -750;
            this.bunnySprite.animations.stop('walk');
            this.bunnySprite.animations.play('jump',this.playerAnimFrames,true);
        }

        // are we in the air? 
        if(!this.bunnySprite.body.touching.down){
            this.bunnySprite.animations.stop('walk');
            this.bunnySprite.animations.play('jump',this.playerAnimFrames,true);
        }
    },

    goalCollision: function(player, goal){
        goal.destroy();
        this.game.state.start('level2');
    }
}


