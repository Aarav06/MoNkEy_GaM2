var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var END1 = 2;
var gameState = PLAY;
var banana_load;
var obs_load;
var FoodGroup;
var ObsGroup;
var banana_load;
var score = 0;
var food1_load, food2_load,food3_load;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
  "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_load = loadImage("banana.png");
  food1_load = loadImage("images-1.jpg");
  food2_load = loadImage("images-2.jpg");
  food3_load = loadImage("images.jpg");
  obs_load = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  FoodGroup = new Group();
  ObsGroup = new Group();
}

function draw() { 

  background(0);
  if(gameState===PLAY){
  if(score>=5) {
    gameState = END1;
    backgr.velocityX=-10;
  }
  spawnFood();
  spawnObstacles();

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    if(FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      score = score+1;
      player.scale +=+0.05;
    }
    if(ObsGroup.isTouching(player)) {
      ObsGroup.destroyEach();
      FoodGroup.destroyEach();
      gameState = END;
      player.scale =0.1;
      backgr.velocityX=-10;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
  if(gameState == END1) {
    fill("green");
    textSize(20);
    text("You Win!!", 200, 200);
  }
  if(gameState == END) {
    fill("white");
    textSize(20);
    text("You Lose!!", 200, 200);
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Score:" +score, 400, 200);
}

function spawnFood() {
  if(frameCount%80===0) {
    var r = random(0,4);
    console.log(r);
    var food = createSprite(600, 250, 40,10);
    food.y = random(150, 220);
    if(r >=1 && r <2) {
      food.addImage(banana_load);
      food.scale = 0.07;
    }
    else if(r >=1 && r <3) {
      food.addImage(food1_load);
      food.scale = 0.3;
    }
    else if(r <4 && r>1) {
      food.addImage(food2_load);
      food.scale = 0.3;
    }
    else if(r <1) {
      food.addImage(food3_load);
      food.scale = 0.3;
    }
    
    
    food.velocityX = -4;

    food.lifetime = 300;
    player.depth = food.depth+1;
    FoodGroup.add(food);
  }
}

function spawnObstacles() {
  if(frameCount%120===0) {
    var obs = createSprite(600, 250, 40,10);
    obs.y = random(270, 350);
    obs.addImage(obs_load);
    obs.scale = 0.2;
    obs.velocityX = -4;

    obs.lifetime = 300;
    player.depth = obs.depth+1;
    ObsGroup.add(obs);
  }
}