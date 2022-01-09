var bg,bgImg;
var player, shooterImg, shooter_shooting,syringe,syringeImg,zombie2,zombie1,zombieImg2,zombieImg1,zombiegroup,score=0,life=3,gameState="play",createbutton
var conImage,gameoverImage,gameover,restart,restartImage

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  syringeImg=loadImage("assets/syringe.png") 
  zombieImg1=loadImage("assets/zombie1.png")
  zombieImg2=loadImage("assets/zombie.png")
conImage=loadImage("assets/Continuebutton.jpg")
gameoverImage=loadImage("assets/GameOver.png")
restartImage=loadImage("assets/restartbutton.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite

  
  // syringe.setCollider("rectangle",0,0,300,300)
zombiegroup=new Group()
syringe=createSprite(displayWidth-1062,displayHeight-325,50,50)
syringe.shapeColor="black"
 // syringe.addImage(syringeImg)
 createbutton=createSprite(displayWidth/2-20,displayHeight/2,50,50)
 createbutton.addImage(conImage)
 player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
 createbutton.visible=false
 createbutton.scale=.25
 restart = createSprite(displayWidth/2-20, displayHeight/2, 50, 50);
 restart.addImage(restartImage)
  restart.scale = 0.25
   restart.debug = false

 // syringe.scale = 0.3
}

function draw() {
  if(gameState==="play"){
restart.visible=false
  
  background(0); 
//stroke("red")
//text("score : "+ score,displayWidth-300,displayHeight/2-350)


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
 }
 if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
 }
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
syringe=createSprite(displayWidth-1062,displayHeight-325,50,50)
  syringe.addImage(syringeImg)
  syringe.scale = 0.3
  syringe.x=player.x+60
  syringe.y=player.y-25
  syringe.velocityX=5
  syringe.debug=false
  syringe.setCollider("rectangle",0,0,200,300)
  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
 // syringe.visible=false
}
//if(zombiegroup.isTouching(syringe)){
 

 
 //}
zombie()

if(zombiegroup.isTouching(player)){
  life=life-1
  gameState="end"
  
  
  
    }
 for(var i=0;i<zombiegroup.length;i++){     
      
   if(zombiegroup[i].isTouching(syringe)){
        zombiegroup[i].destroy()
syringe.destroy()
score=score+1


        } 
      
  }


}
if(gameState==="end"){
  background(0)
  createbutton.visible=true 
  zombiegroup.destroyEach()
player.destroy()
bg.destroy()
  if(life>0){
    stroke("yellow")
    textSize(35)
    text("You are left with " +life+" life !!!",windowWidth/2-100,windowHeight/2)
   if(mousePressedOver(createbutton)){
     reset() 
   }
  }
  if(life===0){
    createbutton.destroy()
    stroke("yellow")
    textSize(35)
    text("You are left with " +life+" life!!!",windowWidth/2-100,windowHeight/2-200)
    text("GAME OVER",windowWidth/2+10,windowHeight/2)
    restart.visible=true
    if(mousePressedOver(restart)){
      life=3
      createbutton=createSprite(displayWidth/2-20,displayHeight/2,50,50)
 createbutton.addImage(conImage)
 createbutton.scale=.25
      reset()
    }
  }
  
}

drawSprites();
stroke("red")
textSize(20)
text("score : "+ score,displayWidth-300,displayHeight/2-350)
}
function reset(){
  createbutton.visible=false
  gameState="play"
  score=0
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   zombiegroup=new Group()
}


function zombie(){
  if(frameCount%50===0){
zombie1=createSprite(windowWidth-20,random(windowHeight/2-150,windowHeight))

var a =Math.round( random(1,2))
if (a===1){
  zombie1.addImage(zombieImg1)
  zombie1.scale=.5

}
else{
  zombie1.addImage(zombieImg2)
  zombie1.scale=.15
}
//zombie1.scale=0.25
zombie1.debug=false
zombiegroup.add(zombie1)
zombie1.velocityX=-6
//console.log(windowWidth)
zombie1.lifetime=512

  }
}