var data;
var balls = [];
var ballsNow = [];
var quarters = [];
var gravity = 0.1;
var button1, button2, button3, button4, button5;


// Preload table data
function preload() {
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

function buttonInfo1(){
   console.log('Copenhagen');
}
function buttonInfo2(){
   console.log('Aarhus');
}
function buttonInfo3(){
   console.log('Odense');
}
function buttonInfo4(){
   console.log('Aalborg');
}
function buttonInfo5(){
   console.log('Fredericksberg');
}

// Setup
function setup() {

  createCanvas(windowWidth, windowHeight);

  var birthsObject = colValsMinMax(data, "births");
  var windObject = colValsMinMax(data, "wind_direction");
  var cityObject = cityValues(data, "city");
  var wDirection = 0;
  console.log(birthsObject.values);

  button1 = createButton(cityObject.values[0]);
  button1.position(100, 65);
  button1.mousePressed(buttonInfo1);
  button2 = createButton(cityObject.values[4]);
  button2.position(100, 100);
  button2.mousePressed(buttonInfo2);
  button3 = createButton(cityObject.values[8]);
  button3.position(100, 135);
  button3.mousePressed(buttonInfo3);
  button4 = createButton(cityObject.values[12]);
  button4.position(100, 170);
  button4.mousePressed(buttonInfo4);
  button5 = createButton(cityObject.values[16]);
  button5.position(100, 205);
  button5.mousePressed(buttonInfo5);

  // assign 1,2,3,4 to N,S,E,W
  if(windObject.values[0]<=45 || windObject.values[0]>=315)wDirection = 1;
  else if (windObject.values[0]>45 && windObject.values[0]<135)wDirection = 3;
  else if (windObject.values[0]>=135 && windObject.values[0]<=225)wDirection = 2;
  else wDirection = 4;

  // create array of birth balls objects (x, y, d, wDirection)
  for(var j = 0; j < 4; j++){
  console.log(birthsObject.values[j]);
  for (var i = 0; i < birthsObject.values[j]; i++) {
    balls[i] = new Ball(random(350), random(350), 4, wDirection);
  }
  quarters[j] = balls;
  balls = [];
  }

}

// Draw
function draw() {

  background(0);
  fill(255, 255, 255, 100);
  rect(400, 50, 350, 350);
  rect(800, 50, 350, 350);
  rect(400, 450, 350, 350);
  rect(800, 450, 350, 350);
  fill(255, 255, 255, 100);
  textSize(40);
  text('Spring', 475, 200);
  text('Summer', 875, 200);
  text('Autumn', 475, 600);
  text('Winter', 875, 600);

  // display and update each birth ball on top of square
  translate(400,50);
  ballsNow = quarters[0];
  for (var i = 0; i < ballsNow.length; i++) {
    ballsNow[i].display();
    ballsNow[i].update();
  }

  translate(400,0);
  ballsNow = quarters[1];
  for (var i = 0; i < ballsNow.length; i++) {
    ballsNow[i].display();
    ballsNow[i].update();
  }

  translate(-400,400);
  ballsNow = quarters[2];
  for (var i = 0; i < ballsNow.length; i++) {
    ballsNow[i].display();
    ballsNow[i].update();
  }

  translate(400,0);
  ballsNow = quarters[3];
  for (var i = 0; i < ballsNow.length; i++) {
    ballsNow[i].display();
    ballsNow[i].update();
  }

}

// Ball Object
function Ball(tempX, tempY, tempW, tempZ) {

  this.x = tempX;  // x location of ball
  this.y = tempY;  // y location of ball
  this.w = tempW;  // ball diameter
  this.speed = 0.1;  // speed
  this.direction = tempZ;

  //diplay the ball
  this.display = function() {
    fill('blue');
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
          if (this.y > 500 || this.x > 500) {
           this.speed = this.speed * 0;
           this.x = 500;
           this.y = this.y;
          }
       }
  };

}
