MainGame.Slime = function(game, xPos, yPos) {
    this.animFrameCount = 5;
    this.atlasName = 'enemies';
    this.atlasPosition = 12;
    this.animFrames = null;
    this.slimeLeft = true;
    this.killCount = 0;
    this.isKilling = false;

    Phaser.Sprite.call(this, game, xPos, yPos, this.atlasName, this.atlasPosition);
    game.add.existing(this);
};

// set-up the "class" to inherit from 'SomeBaseClass'
MainGame.Slime.prototype = Object.create(Phaser.Sprite.prototype);
// re-set the constructor (so it's not just an alias for 'SomeBaseClass')
MainGame.Slime.prototype.constructor = MainGame.Slime;

    MainGame.Slime.prototype.animateSlime = function (){
        this.body.gravity.y = 15;
        this.body.collideWorldBounds = true;
        this.animFrames = Phaser.Animation.generateFrameNames('slimeWalk', 1, 2, '', 0);
        this.animations.add('slimewalk',this.animFrames, this.animFrameCount ,true,false);
        this.animations.add('slimedead',['slimeDead'], this.animFrameCount ,true,false);
        this.anchor.setTo(.5,1);
    };

    MainGame.Slime.prototype.update = function() {
        this.body.velocity.x = 0;

        //hopefully we can fix this and use the game timer in a newer version
        if(this.isKilling){
            if(this.killCount < 30){
                this.killCount++;
            }else{
                this.isKilling = false;
                this.killCount = 0;
                this.kill();
            }
        }else{
            if(this.body.touching.down){
                if(this.position.x - (this.body.halfWidth + 1) <= this.game.world.bounds.x){
                    this.slimeLeft = false;
                }

                if(this.position.x >= this.game.world.bounds.right - (this.body.halfWidth + 1)){
                    this.slimeLeft = true;
                }

                if(this.slimeLeft == true){
                    //slime moves left
                    this.body.velocity.x = -50;
                    this.scale.x = +1;
                }else{
                    //slime moves right
                    this.body.velocity.x = +50;
                    this.scale.x = -1;
                }
            }
            this.animations.play('slimewalk', this.animFrameCount, true);
        }
    };

    MainGame.Slime.prototype.squish = function() {
        this.animations.stop('slimewalk');
        this.animations.play('slimedead');
        this.isKilling = true;
        //this.game.time.events.add(Phaser.Timer.SECOND * 1, this.kill, this);
    }
