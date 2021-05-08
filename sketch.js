var balloon, database,ballimg1,ballimg2;
var position;
var bg;
function preload(){
  bg=loadImage("city.png");
  ballimg1=loadAnimation("ball1.png");
  ballimg2=loadAnimation("ball2.png","ball2.png","ball3.png","ball3.png");
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1500,700);
   balloon = createSprite(250,250,10,10);
   balloon.addAnimation("balloon",ballimg1);
   balloon.scale=0.5;


  var hypnoticBallPosition = database.ref('balloon/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background(bg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
      balloon.changeAnimation("balloon2",ballimg2);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(10,0);
      balloon.changeAnimation("balloon2",ballimg2);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
      balloon.changeAnimation("balloon2",ballimg2);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
      balloon.changeAnimation("balloon2",ballimg2);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
