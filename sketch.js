
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var survivalTime=0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  survivalTime = survivalTime+ Math.round(getFrameRate()/60);
  textSize(20);
  text("survival time:"+ survivalTime, 450, 40);
  drawSprites();
  
  food();
  obstacles();
  if(keyDown("space") && monkey.y>=298){
    monkey.velocityY = -17;
  }
  monkey.velocityY = monkey.velocityY+0.8;
  
  if(monkey.isTouching(obstacleGroup)){
    survivalTime = 0;
    monkey.velocityX=0;
    monkey.pause();
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  ground.x=ground.width/2;
  
  monkey.collide(ground);
  
  
}

function food(){
  if(frameCount % 80===0){
    banana = createSprite(600, 300, 10, 10);
    banana.y=Math.round(random(120, 130));
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX = -3;
    banana.lifetime = 600;
    foodGroup.add(banana);
  }
  
}

function obstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(600, 315, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-4;
    obstacle.lifetime=600;
    obstacleGroup.add(obstacle);
  }
}


