var data;
var balls = [];
var ballsNow = [];
var quarters = [];
var images = [];
var button1, button2, button3, button4, button5, button6;
var birthsObject, windObject, cityObject, wDirection;
var gravity = 0.1;
var start = -1;
var end = 0;
var imageNo;
var myFont;
var myFont2;

// Preload table data
function preload() {
  myFont = loadFont('fonts/publico.otf');
  myFont2 = loadFont('fonts/antenna.otf');
  images[0] = loadImage("images/image-01.png");
  images[1] = loadImage("images/image-02.png");
  images[2] = loadImage("images/image-03.png");
  images[3] = loadImage("images/image-04.png");
  images[4] = loadImage("images/image-05.png");
  images[5] = loadImage("images/image-06.png");
  images[6] = loadImage("images/image-07.png");
  images[7] = loadImage("images/image-08.png");
  images[8] = loadImage("images/image-09.png");
  images[9] = loadImage("images/image-10.png");
  images[10] = loadImage("images/image-11.png");
  images[11] = loadImage("images/image-12.png");
  images[12] = loadImage("images/image-13.png");
  images[13] = loadImage("images/image-14.png");
  images[14] = loadImage("images/image-15.png");
  images[15] = loadImage("images/image-16.png");

  data = loadTable(
    'data/denmark_wind_births.csv',
    'csv',
    'header');
}

// Object from data tables
function colValsMinMax(tab, colName) {
  var vals = data.getColumn(colName);
  var obj = {
    values: vals,
    min: min(vals),
    max: max(vals),
  }
  return obj;
}

// Object from data table
function cityValues(tab, colName) {
  var vals = data.getColumn(colName);
  var obj = {
    values: vals,
  }
  return obj;
}

// Setup
function setup() {

  createCanvas(windowWidth, windowHeight);

  birthsObject = colValsMinMax(data, "births");
  windObject = colValsMinMax(data, "wind_direction");
  cityObject = cityValues(data, "city");
  wDirection = 0;


  button1 = createButton(cityObject.values[0]);
  button1.position(75, 385+205);
  button1.mousePressed(buttonInfo1);
  button2 = createButton(cityObject.values[4]);
  button2.position(75, 430+205);
  button2.mousePressed(buttonInfo2);
  button3 = createButton(cityObject.values[8]);
  button3.position(75, 475+205);
  button3.mousePressed(buttonInfo3);
  button4 = createButton(cityObject.values[12]);
  button4.position(75, 520+205);
  button4.mousePressed(buttonInfo4);
  button5 = createButton(cityObject.values[16]);
  button5.position(75, 565+205);
  button5.mousePressed(buttonInfo5);
  //button6 = createButton(cityObject.values[20]);
  //button6.position(75, 770);
  //button6.mousePressed(buttonInfo6);

}



// Draw
function draw() {

  background('#171a4d');
  noStroke();
  fill('#ffffff');
  textFont(myFont);
  textSize(46);
  text('Vindoskop', 75, 85);
  fill('#5099cd');
  textFont(myFont2);
  textSize(15);
  text('Select a city below to view the\nnumber of births for that city over\neach over the 4 seasons of 2017.', 75, 150);
  text('Based on the season and average\nwind direction for that season,\na \'Vindoskop\' is assigned.', 75, 220);
  textSize(13);
  text('*Wind direction data for Aarhus, Odense\nand Aalborg based on yearly average', 75, 300);
  text('Dan Eames, CIID 2018', 75, 360);
  text('daneames.com', 75, 380);
  text('', 75, 300);
  fill(255, 255, 255, 50);
  rect(400, 50, 350, 350); rect(800, 50, 350, 350);
  rect(400, 450, 350, 350); rect(800, 450, 350, 350);
  fill(255, 255, 255, 25);
  textFont(myFont);
  textSize(80);
  //text('Spring', 400, 400); text('Summer', 800, 400);
  //text('Autumn', 400, 800); text('Winter', 800, 800);


  if(start>-1){
    // display and update each birth ball on top of square
    translate(400,50);
    ballsNow = quarters[start];
    for (var i = 0; i < ballsNow.length; i++) {
      ballsNow[i].display();
      ballsNow[i].update();
    }
    if ( mouseX >= 400 && mouseX <= 750 && mouseY >= 50 && mouseY <= 400) {
    image(images[0], 0, 0, 350, 350);
    }

    translate(400,0);
    ballsNow = quarters[start+1];
    for (var i = 0; i < ballsNow.length; i++) {
      ballsNow[i].display();
      ballsNow[i].update();
    }
    if (mouseX >= 800 && mouseX <= 1150 && mouseY >= 50 && mouseY <= 400) {
    imageNo = start*wind_direction;
    image(images[imageNo], 0, 0, 350, 350);
    }

    translate(-400,400);
    ballsNow = quarters[start+2];
    for (var i = 0; i < ballsNow.length; i++) {
      ballsNow[i].display();
      ballsNow[i].update();
    }
    if ( mouseX >= 400 && mouseX <= 750 && mouseY >= 450 && mouseY <= 800) {
    image(images[2], 0, 0, 350, 350);
    }

    translate(400,0);
    ballsNow = quarters[start+3];
    for (var i = 0; i < ballsNow.length; i++) {
      ballsNow[i].display();
      ballsNow[i].update();
    }
    if ( mouseX >= 800 && mouseX <= 1150 && mouseY >= 450 && mouseY <= 800) {
    image(images[3], 0, 0, 350, 350);
    }
  }

}

function buttonInfo1(){
   start = 0;
   end = 4;
   makeBalls(start, end);
}

function buttonInfo2(){
   balls = [];
   quarters = [];
   start = 4;
   end = 8;
   makeBalls(start, end);
}

function buttonInfo3(){
   balls = [];
   quarters = [];
   start = 8;
   end = 12;
   makeBalls(start, end);
}

function buttonInfo4(){
   balls = [];
   quarters = [];
   start = 12;
   end = 16;
   makeBalls(start, end);
}

function buttonInfo5(){
   balls = [];
   quarters = [];
   start = 16;
   end = 20;
   makeBalls(start, end);
}

function buttonInfo6(){
   balls = [];
   quarters = [];
   start = 20;
   end = 24;
   makeBalls(start, end);
}

function makeBalls(start, end){
  // create array of birth balls objects (x, y, d, wDirection)
  for(var j = start; j < end; j++){

  if(windObject.values[j]<=45 || windObject.values[j]>=315)wDirection = 1;
  else if (windObject.values[j]>45 && windObject.values[j]<135)wDirection = 3;
  else if (windObject.values[j]>=135 && windObject.values[j]<=225)wDirection = 2;
  else wDirection = 4;

  for (var i = 0; i < birthsObject.values[j]; i++) {
    balls[i] = new Ball(random(350), random(350), 4, wDirection);
  }
  quarters[j] = balls;
  balls = [];
  }
}

// Ball Object
function Ball(tempX, tempY, tempW, tempZ) {

  this.x = tempX;  // x location of ball
  this.y = tempY;  // y location of ball
  this.w = tempW;  // ball diameter
  this.speed = 0.1;  // speed
  this.direction = tempZ;
  //console.log(wDirection);

  //diplay the ball
  this.display = function() {
    fill('#48c8c1');
    noStroke();
    ellipse(this.x,this.y,this.w,this.w);
  };

  // Update the next display of the ball as per wind
  this.update = function() {
     // North Wind
     if (this.direction == 1){
       // Add speed upwards
       this.y = this.y + this.speed;
       // Add gravity to speed if speed is not 0
       if (this.speed != 0){
         this.speed = this.speed + random(gravity*100)/10;
       }
       // If ball reaches top edge then speed becomes zero and ball freezes.
       if (this.y > 350 || this.x > 350) {
         this.speed = this.speed * 0;
         this.x = this.x;
         this.y = 350;
       }
     }
     // South Wind
     else if (this.direction == 2){
        // Add speed downwards
        this.y = this.y - this.speed;
        // Add gravity to speed if speed is not 0
        if (this.speed != 0){
          this.speed = this.speed + random(gravity*100)/10;
        }
        // If ball reaches bottom edge then speed becomes zero and ball freezes.
        if (this.y < 0 || this.x < 0) {
         this.speed = this.speed * 0;
         this.x = this.x;
         this.y = 0;
        }
      }
     // East Wind
     else if (this.direction == 3){
         // Add speed leftwards
         this.x = this.x - this.speed;
         // Add gravity to speed if speed is not 0
         if (this.speed != 0){
           this.speed = this.speed + random(gravity*100)/10;
         }
         // If ball reaches left edge then speed becomes zero and ball freezes.
         if (this.y < 0 || this.x < 0) {
          this.speed = this.speed * 0;
          this.x = 0;
          this.y = this.y;
         }
       }
     // West wind
     else {
          // Add speed rightwards
          this.x = this.x + this.speed;
          // Add gravity to speed if speed is not 0
          if (this.speed != 0){
            this.speed = this.speed + random(gravity*100)/10;
          }
          // If ball reaches right edge then speed becomes zero and ball freezes.
          if (this.y > 350 || this.x > 350) {
           this.speed = this.speed * 0;
           this.x = 350;
           this.y = this.y;
          }
       }
  };

}
