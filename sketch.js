var PLAY = 1;
var END = 0;
gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var restart, restartImg;

var gameOver, overImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png");
  
  overImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  restart = createSprite(300,110,40,40);
  restart.addImage("restart", restartImg);
  restart.scale = 0.7;
  restart.visible = false;
    
  gameOver = createSprite(300,70,40,40);
  gameOver.addImage("gameOver", overImg);
  gameOver.scale = 0.75;
  gameOver.visible = false;
  
  score = 0;
}

function draw() {
  background(180);
 
  trex.collide(invisibleGround);
  
  fill("white");
  textFont("Georgia");
  textSize(15);
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space") && trex.y>=140) {
      trex.velocityY = -13;
   }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if(ground.x < 0){
      ground.x = ground.width/2;
   }
    
    if(trex.isTouching(obstaclesGroup)){
      gameState = END;
      trex.changeAnimation("collided", trex_collided);
      restart.visible = true;
      gameOver.visible = true;   
   }
    
    spawnClouds();
    ground.velocityX = -5;
    spawnObstacles();
 }
  
  else if(gameState === END){   
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    
  
  if(mousePressedOver(restart)) {
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();     
      trex.changeAnimation("running",trex_running);
      gameState = PLAY;
      score = 0;
      restart.visible = false;
      gameOver.visible = false;   
    }      
  }
  
  cloudsGroup.depth = restart.depth;
  restart.depth = restart.depth+1;
  
  drawSprites();
} 

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 125;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
  trex.changeAnimation("running",trex_running);
  gameOver.visible = false;
  restart.visible = false;
}