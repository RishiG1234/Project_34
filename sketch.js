//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock

function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  drawSprites();
  text("Note:Press UP_ARROW key To Feed Drago Milk!",120,50);
  fill("white");
  stroke("white");
  text("Food")
  text("Food remaining:"+foodS,170,220); 
  //add styles here

}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {
  if(x<=0) {
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

