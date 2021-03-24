var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dino, dino_running, dino_collided;
var invisibleGround;

var sun, sunImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3; 
var score;
var gameOverImg,restartImg

var restart, gameOver;

function preload(){
  dino_running = loadAnimation("Animation1.png","Animation2.png","Animation3.png","Animation4.png","Animation5.png","Animation6.png","Animation7.png","Animation8.png","Animation9.png");
  dino_collided = loadAnimation("collided.png");
   obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  
  
  restartImg = loadImage("reset1.png")
  gameOverImg = loadImage("over.png")
  
  back_image=loadImage("background.png")
 
  sunImage=loadImage("Sun.png")
}

function setup() {
  createCanvas(600, 200);

 
  
  dino = createSprite(90,155);
  dino.addAnimation("running", dino_running);
  dino.addAnimation("collided", dino_collided);
  dino.scale = 0.6;
  
  sun=createSprite(550,50);
  sun.addImage("day",sunImage);
  sun.scale=0.5
  
  gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.3;
  
  invisibleGround = createSprite(200,180,800,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
 

  
  dino.setCollider("rectangle",0,0,dino.width,dino.height);
 
  
  score = 0;
  
}

function draw() {
  
  background(back_image);
 
  text("Score: "+ score, 400,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(frameCount/120);
    
   
    
    if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
    
  
    if(keyDown("space")&& dino.y >= 100) {
        dino.velocityY = -12;
        
    }
    
    
    dino.velocityY = dino.velocityY + 0.8
  

   
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(dino)){
       
       
        gameState = END;
       
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
  
      dino.changeAnimation("collided", dino_collided);
    
     
     
      invisibleGround.velocityX = 0;
      dino.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
     
   }
  
  
 
 
  dino.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState=PLAY
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  
  score=0; 
  dino.changeAnimation("running", dino_running);
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,155,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

