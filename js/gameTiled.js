let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#AAD4EA',
    parent: "gameTime", // ID of the DOM element to add the canvas to
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

//variable declaration block
let map;
let layer;
let player;
let cursors;



function preload ()
{

    //slightly different preload because this spritesheet has aa margin and spacing between each frame
    this.load.spritesheet('bunny', 'assets/sprites/bunny.png', {
      frameWidth:16, 
      frameHeight:16,
      margin:16,
      spacing:32
    });

    //load map tilesets
    //params: 'key', 'path'
    this.load.image('Grass', 'assets/tiledMap/GrassHillTiles.png');
    this.load.image('Dirt', 'assets/tiledMap/dirt.png');
    this.load.image('Objects', 'assets/tiledMap/things.png');

    //load map json file
    //params: 'key', 'path'
    this.load.tilemapTiledJSON('map', 'assets/tiledMap/mapmap.json');

    //load spritesheet for the coin collectable
    


}
function create ()
{

  /////////////////////////////  Map Load  //////////////////////////////////
  
  // make the map

  //*********Tilesets *************/
  // Add tilesets to the map in vars
  //Params: 'name you gave the tileset in Tiled', 'key of the tileset image in preload'



  //*********Create Layers *************/

  // create the layers -- order closest to furthest
  //Params: 'layer name from Tiled', tileset, x, y
  //NOTE: Phaser only supports one tileset per layer!!

  //create the collectable coin layer 
  //params: name of layer in Tiled
  

  //*********Collision!  *************/

  //visual debugger that highlights the graphics on the layer for debugging
  // const debugGraphics = this.add.graphics().setAlpha(0.75);
  // worldLayer.renderDebug(debugGraphics, {
  //   tileColor: null, // Color of non-colliding tiles
  //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
  //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  // });

  // We add the 'collides' property in Tiled Tileset editor
  //property only turned on for the colliding tiles


  //*********Changing z-index so noe layer in 'on top' of player *************/

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we want the foreground layer to sit on top of the player (which is created later), so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.


  //*********World Boundries *************/
  // set the boundaries of our game world to the width and height of the background layer
  
  
  



  /////////////////////////////Collectables//////////////////////////////////
  
  //create a static group that all the coins will be inside 
  //needs to be ddefined in the variable declaration block
  
  //this is how we actually render our coin object with coin asset we loaded into our game in the preload function
  //These need to be all separate so they can be removed individually later





  ///////////////////////////////Player//////////////////////////////////

  //player code
  player = this.physics.add.sprite(70, 110, 'bunny');
  player.setCollideWorldBounds(true);
  
  //*********Player Collisions *************/
  // This will watch the player and worldLayer every frame to check for collisions
  

  //This will watch the playere and the coins every frame to check for collisions
  //then it will call a function called 'collectCoin' and pass the specific coin it hit
  

  //*********Animations *************/
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('bunny', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('bunny', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('bunny', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('bunny', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'idle',
    frames: [ { key: 'bunny', frame: 0 } ],
    frameRate: 20
  });


  ///////////////////// HUD ///////////////////////////////////

  //********* Score *************/
  //add text 
  //params: x, y, 'text', {options}
  

  ////////////////////// Keyboard Tracking ////////////////////
  cursors = this.input.keyboard.createCursorKeys();

  /////////////////////// Camera Following /////////////////////
  



}

function update ()
{

  ////////////////////// Variable to 'stop the game' ////////////
  

  ////////////////////// Player Movements ///////////////////////
  
  //*********default settings *************/
  const speed = 175;

  // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  //********* Direction movement *************/
  // Horizontal movement
  if(cursors.left.isDown){
      player.setVelocityX(-speed);
  }else if(cursors.right.isDown){
      player.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

// Update the animation last and give left/right animations precedence over up/down animations
if (cursors.left.isDown) {
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.anims.play("right", true);
  } else if (cursors.up.isDown) {
    player.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player.anims.play("down", true);
  } else {
    player.anims.stop();
  }
}

////////////////////////// Function for Coin Collection ///////////////////////
