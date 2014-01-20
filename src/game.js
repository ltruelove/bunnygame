var bunnySprite;
var map;
var tileset;
var layer;
var cursors; 

var game = new Phaser.Game(800,600, Phaser.Auto, '', {
    preload: preload,
    create: create,
    update: update
});

function preload(){
    game.load.image('bunny', '/resources/bunny.png');
    game.load.tilemap("platforms", "/resources/platforms.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.tileset("land", "/resources/land.png", 32, 32);
}

function create(){
    map = game.add.tilemap("platforms");
    tileset = game.add.tileset("land");
    tileset.setCollisionRange(0, tileset.total-1, true, true, true, true);
    // now we need to create a game layer, and assign it a tile set and a map
    layer = game.add.tilemapLayer(0, 0, 800, 600, tileset, map, 0);

    bunnySprite = game.add.sprite(10, 500, 'bunny');
    bunnySprite.body.gravity.y = 8;
    //bunnySprite.body.collideWorldBounds = true;
    //bunnySprite.body.drag.x = 500;

    // the fastest way to create game controls is "createCursorKeys" method
    // which automatically assigns up, down, left and right movement to
    // arrow keys
    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    game.physics.collide(bunnySprite, layer)
    bunnySprite.body.velocity.x = 0;
    
    // are we moving left?
    if (cursors.left.isDown){
        bunnySprite.body.velocity.x = -100;
    }
    // are we moving right?
    if (cursors.right.isDown){
        bunnySprite.body.velocity.x = 100;
    }
    // are we jumping? 
    if (cursors.up.isDown && bunnySprite.body.touching.down){
        bunnySprite.body.velocity.y = -300;
    }
}
