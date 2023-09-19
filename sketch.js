var ground;
var lava, lavaImage;
var player, playerImage;
var edges;
var gameTitle, gameTitleImage;
//var brick, brickGroup,
var brickLava, brickLavaGroup, brickLavaImage;
var invisibleGround;
var gameState="start";
var start, startImage;
var score=0;
var restart, restartImage;

function preload(){
  lavaImage=loadImage("Lava.jpg");
  playerImage=loadImage("Player.png");
  startImage=loadImage("StartButton.png");
  brickLavaImage=loadImage("brickLava.jpg");
  gameTitleImage=loadImage("Game_Title.png");
  restartImage=loadImage("Restart_Button.png")
}

function setup() {
  createCanvas(400,600);

  //ground=createSprite(200,300,400,1200);
  //ground.velocityY=2;
  //ground.shapeColor="black";

  lava=createSprite(200,600,400,50);
  lava.addImage(lavaImage);
  lava.scale=0.7;

  player=createSprite(200,150,50,50);
  player.addImage(playerImage);
  player.scale=0.1;

  invisibleGround=createSprite(200,200,400,5);
  invisibleGround.shapeColor="black";

  start=createSprite(200,300,100,50);
  start.addImage(startImage);
  start.scale=0.5;

  gameTitle=createSprite(200,100,100,100);
  gameTitle.addImage(gameTitleImage);
  gameTitle.scale=0.8;

  restart=createSprite(200,450,100,50)
  restart.addImage(restartImage);

  //brickGroup=new Group();
  brickLavaGroup=new Group();

  edges=createEdgeSprites();
}

function draw() {
  background(0);

  if(gameState==="start"){
    gameTitle.visible=true;
    restart.visible=false;
    start.visible=true;
    score=0;
    textSize(20);
    fill("white");
    text("Click to Start the Game",100,230);
    textSize(15)
    text("- Don't Touch the Lava below the player",60,430);
    text("- Don't touch the lava coming from the top",50,460);
    text("when you start the game",120,480)
    text("- Press SPACE to jump",120,520);
    text("- Press LEFT ARROW to move left",70,550);
    text("- Press RIGHT ARROW to move right",70,580);

    //ground.destroy();

    if(mousePressedOver(start)){
      gameState="play";
    }

    player.visible=false;
    lava.visible=false;
  }
  else if(gameState==="play"){
    player.visible=true;
    lava.visible=true;
    start.visible=false;
    gameTitle.visible=false;
    restart.visible=false;
    invisibleGround.destroy();
    fill("white");
    textSize(20)
    text("Score : " + Math.round(score),280,30);
    score=score+0.03;
    console.log(score)

    /*if(ground.y>500){
      ground.y=300;
    }*/  
  
    if(keyDown("LEFT_ARROW" || "A")){
      player.x=player.x-5;
    }
    if(keyDown("RIGHT_ARROW" || "D")){
      player.x=player.x+5;
    }
    if(keyWentDown("space")){
      player.velocityY=-8;
    }
    player.velocityY=player.velocityY+0.8;

    /*if(player.isTouching(brickGroup)){
      player.velocityY=0;
    }*/
  
    if(player.isTouching(brickLavaGroup) || player.isTouching(lava)){
      gameState="end";
    }

    createBrick();
  }
  else{
    //player.destroy();
    player.visible=false;
    restart.visible=true;
    if(mousePressedOver(restart)){
      reset();
    }
    //brickGroup.destroyEach();
    brickLavaGroup.destroyEach();
    lava.visible=false;
    //ground.destroy();
    textSize(40);
    fill("red");
    strokeWeight(4);
    stroke("yellow");
    text("Game Over!!",90,300);
    textSize(25);
    text("Your Score : " +  Math.round(score), 120,350)
  }

  player.collide(edges);
  player.collide(invisibleGround);

  drawSprites();
}

function createBrick(){
  if(frameCount%55===0){
    /*brick=createSprite(random(25,375),50,50,10);
    brick.shapeColor="brown";
    brick.velocityY=2;
    brick.lifetime=250;
    brickGroup.add(brick);*/
    brickLava=createSprite(random(25,375),40,100,10);
    //brickLava.x=brick.x;
    //brickLava.y=brick.y+4;
    brickLava.velocityY=2;
    brickLava.lifetime=260;
    brickLava.addImage(brickLavaImage);
    brickLava.scale=0.2
    brickLava.shapeColor="yellow";
    brickLavaGroup.add(brickLava);
  }
}

function reset(){
  gameState="start";
  player.y=150;
}
