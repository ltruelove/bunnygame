Slime = function(game) {
    //phaser game
    this.game = game;
    //phaser sprite
    this.sprite = null;
    this.startX = null;
    this.startY = null;
    this.animFrameCount = 5;
    this.atlasName = 'enemies';
    this.atlasPosition = 12;
    this.animFrames = null;
    this.slimeLeft = true;
}

Slime.prototype = {
    create: function (xPos, yPos){
        this.sprite = this.game.add.sprite(xPos, yPos, this.atlasName, this.atlasPosition);
        this.sprite.body.gravity.y = 15;
        this.sprite.body.collideWorldBounds = true;
        this.animFrames = Phaser.Animation.generateFrameNames('slimeWalk', 1, 2, '', 0);
        this.sprite.animations.add('slimewalk',this.animFrames, this.animFrameCount ,true,false);
        this.sprite.anchor.setTo(.5,1);
    },

    update: function() {
        this.sprite.body.velocity.x = 0;
        
        //animate the slime
        if(this.sprite.body.touching.down){
            if(this.sprite.position.x - (this.sprite.body.halfWidth) <= this.game.world.bounds.x){
                this.slimeLeft = false;
            }

            if(this.sprite.position.x >= this.game.world.bounds.right - (this.sprite.body.halfWidth + 1)){
                this.slimeLeft = true;
            }

            if(this.slimeLeft == true){
                //slime moves left
                this.sprite.body.velocity.x = -50;
                this.sprite.scale.x = +1;
            }else{
                //slime moves right
                this.sprite.body.velocity.x = +50;
                this.sprite.scale.x = -1;
            }
        }
        this.sprite.animations.play('slimewalk', this.animFrameCount, true);
    }
}
