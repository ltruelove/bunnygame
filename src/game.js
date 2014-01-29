var bunnySprite;
var map;
var tileset;
var layer;
var cursors; 

var game = new Phaser.Game(800,600, Phaser.Auto, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload(){
    game.load.image('bunny', '/resources/bunny.png');
    game.load.tilemap("platforms", "/resources/platforms.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.tileset("land", "/resources/land.png", 32, 32);
}

function create(){
    map = game.add.tilemap("platforms");
    game.stage.backgroundColor = '#333';
    tileset = game.add.tileset("land");
    tileset.setCollisionRange(0, tileset.total-1, true, true, true, true);

    //add a background tile layer
    bglayer = game.add.tilemapLayer(0, 0, 800, 600, tileset, map, 0);
    // now we need to create a game layer, and assign it a tile set and a map
    layer = game.add.tilemapLayer(0, 0, 800, 600, tileset, map, 1);

    bunnySprite = game.add.sprite(10, 3800, 'bunny');
    bunnySprite.body.gravity.y = 6;
    // I'm not so sure we need this one.
    bunnySprite.body.collideWorldBounds = true;

    game.world.setBounds(0,0,30*32,120*32); //setting the bounds of the entire level
    game.camera.follow(bunnySprite); //bounds lets us set the camera to follow the character
    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    game.physics.collide(bunnySprite, layer)
    bunnySprite.body.velocity.x = 0;
    
    // are we moving left?
    if (cursors.left.isDown){
        bunnySprite.body.velocity.x = -150;
    }
    // are we moving right?
    if (cursors.right.isDown){
        bunnySprite.body.velocity.x = 150;
    }
    // are we jumping? 
    if (cursors.up.isDown && bunnySprite.body.touching.down){
        bunnySprite.body.velocity.y = -275;
    }
}

function render() {

    //game.debug.renderCameraInfo(game.camera, 32, 32);
    //game.debug.renderSpriteCoords(bunnySprite, 32, 200);
    //game.debug.renderSpriteCoords(fixed, 600, 200);

    // game.debug.renderSpriteCoords(game.world._container, 32, 400);

}
