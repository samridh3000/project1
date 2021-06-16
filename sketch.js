var jumped = false
var goomba
var PLAY = 1
var END = 0
var pipe1, pipe2, pipe3
var gameState = PLAY
var score = 0

function preload() {

  snowAnimation = loadAnimation('snow/snow.jpg','snow/snow2.jpg','snow/snow3.jpg')
  marioAnimation = loadAnimation('mario/mario1.gif','mario/mario2.gif','mario/mario3.gif','mario/mario4.gif','mario/mario5.gif','mario/mario6.gif')
  goombaAnimation = loadAnimation('goomba/goomba1.gif','goomba/goomba2.gif','goomba/goomba3.gif','goomba/goomba4.gif','goomba/goomba5.gif',)
  bgImage = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png');
  pipe1 = loadImage("mario_pipe.png")
  pipe2 = loadImage("mario_pipe2.png")
  pipe3 = loadImage("mario_pipe3.png")
}


function setup() {

  createCanvas(800,400);
  
  bg = createSprite(400,200)
  bg.addImage(bgImage)

  mario = createSprite(50,350)
  mario.addAnimation('running',marioAnimation)

  
  goombaGroup = new Group()
  goombaHeadGroup = new Group()
   
  pipeGroup = new Group()
  pipeInteriorGroup = new Group()

  invisiGround = createSprite(400,400,800,10)
}



function draw() {
  background(255,255,255);  
  drawSprites();
 //scale
  mario.scale = 0.5
  bg.scale = 1.5
  text(score,100,100)

  spawnGoomba()
  spawnPipe()
  
 bg.velocityX = -2
 if(bg.x<150){
   bg.x = bg.width/2
 }

 if(keyWentDown('space') && mario.y>200){
 
  mario.velocityY = -10
  
}

if(keyDown("S")){
  spawnSnow()
}


if(goombaHeadGroup.isTouching(mario)){
goombaGroup.destroyEach()
goombaHeadGroup.destroyEach()
}
 
if(goombaGroup.isTouching(mario)){
backGround.velocityX = 0
goombaGroup.setVelocityXEach(0)
goombaHeadGroup.setVelocityXEach(0)

}
 mario.velocityY+= 0.4

mario.collide(invisiGround)
pipeGroup.collide(mario)

invisiGround.visible = false
}

function spawnGoomba() {
if(frameCount%200 === 0)  {
goomba = createSprite(600,380)
  goomba.addAnimation('running',goombaAnimation)
  goomba.scale = 0.05
  goomba.debug = true
  goomba.setCollider("rectangle",-30,0,30,5)
  goombaGroup.add(goomba)
  goomba.velocityX = -2
  goombaHead = createSprite(goomba.x+15, 370, 20, 3)
  goombaHead.velocityX = -2
 goombaHeadGroup.add(goombaHead)  
}
                 

  if(pipeInteriorGroup.isTouching(mario)){
    backGround.velocityX = 0
    pipeGroup.setVelocityXEach(0)
    PipeInteriorGroup.setVelocityXEach(0)
  }

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  }

}



//spawn a dragon random





function spawnSnow(){
  snowball = createSprite(mario.x,mario.y)
  snowball.addAnimation("snow",snowAnimation)
  snowball.scale = 0.05
  snowball.velocityX = 10
  snowball.velocityY = -4
}

function spawnPipe() {
  var myRand = Math.round(random(1,5))
  switch(myRand){
    case 1: frameNumber = 200
    break
    case 2: frameNumber = 300
    break
    case 3: frameNumber = 350
    break
    case 4: frameNumber = 400
    break
    case 5: frameNumber = 450
    break
  }
  if(frameCount % frameNumber === 0) {
    var pipe = createSprite(600,height-50,20,30);
    pipe.setCollider('circle',0,0,45) 
  
    pipe.velocityX = -(6 + 3*score/100);
  
  var rand = Math.round(random(1,3))
  
switch(rand){
  case 1: pipe.addImage(pipe1)
  pipe.scale = 0.6;
  break
  case 2: pipe.addImage(pipe2)
  pipe.scale = 0.3
  break
  case 3: pipe.addImage(pipe3)
  pipe.scale = 0.6;
  break

  default: break
}



pipe.lifetime = 10000;
    pipe.depth = mario.depth;
    pipe.velocityX = -2
    pipeInterior = createSprite(pipe.x,pipe.y,10,50)
    pipeGroup.add(pipe)
  }   
}



