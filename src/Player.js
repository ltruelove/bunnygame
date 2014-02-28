MainGame.Player = function(game, xPos, yPos, cursors) {
    this.animFrameCount = 25;
    this.speed = 250;
    this.atlasName = 'alien';
    this.walkFrames = null;
    this.playerLeft = true;
    this.isHurt = false;
    this.hurtCount = 0;
    this.cursors = cursors;

    Phaser.Sprite.call(this, game, xPos, yPos, this.atlasName);
    game.add.existing(this);
};

// set-up the "class" to inherit from 'SomeBaseClass'
MainGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
// re-set the constructor (so it's not just an alias for 'SomeBaseClass')
MainGame.Player.prototype.constructor = MainGame.Player;

MainGame.Player.prototype.animatePlayer = function (){
    this.walkFrames = Phaser.Animation.generateFrameNames('p3_walk', 1, 11, '', 2);
    this.animations.add('walk',this.walkFrames,this.animFrameCount,true,false);

    this.animations.add('jump',["p3_jump"],this.animFrameCount,true,false);
    this.animations.add('stand',["p3_stand"],this.animFrameCount,true,false);
    this.animations.add('hurt',["p3_hurt"],this.animFrameCount,true,false);

    // Set Anchor to the center of your sprite
    this.anchor.setTo(.5,1);
    this.name = 'player';
    this.body.gravity.y = 30;
    this.body.collideWorldBounds = true;
};

MainGame.Player.prototype.updatePlayer = function() {
    if(this.hurtCount < 1){
        //reset velocities
        this.body.velocity.x = 0;

        // are we moving left?
        if (this.cursors.left.isDown){
            this.body.velocity.x = -1 * this.speed;
            // Invert scale.x to flip left/right
            this.scale.x = -1;
            this.animations.play('walk',this.animFrameCount,true);
        }
        // are we moving right?
        if (this.cursors.right.isDown){
            this.body.velocity.x = this.speed;
            this.scale.x = 1;
            this.animations.play('walk',this.animFrameCount,true);
        }

        //standing still
        if(this.body.velocity.x == 0){
            this.animations.stop('walk');
            this.animations.play('stand',this.animFrameCount,true);
        }

        //did we press the jump key?
        if ((this.cursors.up.isDown || this.game.input.pointer1.isDown) && this.body.touching.down){
            this.body.velocity.y = -1050;
            this.animations.stop('walk');
            this.animations.play('jump',this.animFrameCount,true);
        }

        // are we in the air? 
        if(!this.body.touching.down){
            this.animations.stop('walk');
            this.animations.play('jump',this.animFrameCount,true);
        }
    }else{
        this.hurtCount--;
    }
};

