var ironman, ironmanImage, ironman_collided;
var bg, bgImg;
var stoneImage, stoneGroup;
var diamondImage, diamondGroup;
var diamondScore = 0;
var obstacleGroup, spikesObstacleImage;
var gameState = "PLAY";

function preload() {
  bgImg = loadImage("images/bg.jpg");

  ironmanImage = loadImage("images/iron.png");

  stoneImage = loadImage("images/stone.png");

  diamondSound = loadSound("sounds/coinSound.mp3");

  diamondImage = loadImage("images/diamond.png");

  spikesObstacleImage = loadImage("images/spikes.png");

  dieSound = loadSound("sounds/dieSound.mp3");

  ironman_collided = loadImage("image/restart.png");

}

function setup() {
  createCanvas(1000, 600);

  // create background sprite
  bg = createSprite(580, 300);
  bg.addImage(bgImg);
  bg.scale = 2;
  bg.velocityX = -6;

  // create ironman sprite
  ironman = createSprite(200, 505, 20, 50);
  ironman.addImage(ironmanImage);
  ironman.scale = 0.3;

  ironman.debug = true;
  ironman.setCollider("rectangle", 100, 0, 200, 400);

  // create ground sprite
  ground = createSprite(200, 585, 400, 10);
  ground.visible = false;

  // create groups
  stoneGroup = new Group();
  diamondGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {

  // scroll background
  if (bg.x < 100) {
    bg.x = bg.width / 4;
  }
  // prevent ironman moving out with the stone
  if (ironman.x < 200) {
    ironman.x = 200;
  }

  // prevent ironman moving out from the top
  if (ironman.y < 50) {
    ironman.y = 50;
  }

  // jump with space
  if (keyDown("up")) {
    ironman.velocityY = -10;
  }

  // to come down
  ironman.velocityY = ironman.velocityY + 0.5;

  // generate stone
  generateStone();

  // for ironman to collide with the stone
  for (var i = 0; i < (stoneGroup).length; i++) {
    var temp = (stoneGroup).get(i);
    if (temp.isTouching(ironman)) {
      ironman.collide(temp);
    }
  }


  generateObstacles();

  // generate diamonds
  generatediamonds();

  // for ironman to touch the diamonds
  for (var i = 0; i < (diamondGroup).length; i++) {
    var temp = (diamondGroup).get(i);

    if (temp.isTouching(ironman)) {
      // to generate diamond sound
      diamondSound.play();
      // to increment score
      diamondScore++;
      // making coins invisible
      temp.destroy();
      temp = null;
    }

  }

  // to stand on the ground
  ironman.collide(ground);

  drawSprites();

  // to display score
  textSize(20);
  fill("red")
  text("diamonds Collected: " + diamondScore, 500, 50);

}


function generateStone() {
  // to generate stone at every 70 sec
  if (frameCount % 70 === 0) {
    var stone = createSprite(1200, 120, 40, 10);
    stone.y = random(50, 450)     //to generate stone from 50 to 450 
    stone.addImage(stoneImage)    //to add image
    stone.scale = 0.5;
    stone.velocityX = -5;
    stone.lifetime = 250;     // lifetime of the stone
    stoneGroup.add(stone);
  }


}
function generatediamonds() {
  // to generate diamonds at every 50 sec
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200, 120, 40, 10);
    diamond.addImage(diamondImage)
    diamond.y = Math.round(random(80, 350));    //to generate the diamonds value from 80 to 350
    diamond.scale = 0.5;
    diamond.velocityX = -3;
    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
  }
}
function generateObstacles() {
  // to generate obstacles at every 100 sec
  if (frameCount % 100 === 0) {

    // to create sprite of obstacles
    var obstacle = createSprite(1200, 545, 10, 40);
    obstacle.velocityX = -4;
    obstacle.scale = 0.5;
    var rand = Math.round(random(1));
    switch (rand) {
      case 1:
        obstacle.addAnimation("spikes", spikesObstacleImage);
        break;
      default:
        break;
    }
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);


  }
}

