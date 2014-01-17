var bunnySprite;
var game = new Phaser.Game(800,600, Phaser.Auto, '', {
    preload: preload,
    create: create,
    update: update
});

function preload(){
    game.load.image('bunny', '/resources/bunny.png');
}

function create(){
    bunnySprite = game.add.sprite(game.world.centerX, 200, 'bunny');
    bunnySprite.body.acceleration.y = 500;
    bunnySprite.body.collideWorldBounds = true;
    bunnySprite.body.drag.x = 500;
}

function update(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        bunnySprite.body.velocity.x = -200;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        bunnySprite.body.velocity.x = 200;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        bunnySprite.body.velocity.y = -100;
    }
}
