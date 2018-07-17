
var circles = [];
var startingR = 64;
var currentR = startingR;
var maxLoops = 100;

function setup() {
  windowResized();
  colorMode(HSB);
  background(0);
  generateCircles();
}

function draw() {
  background(0);

  for (var i = 0; i < circles.length; i++) {
    circles[i].draw();
  }

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  circles = [];
  generateCircles();
  // Reset variables here
}

function generateCircles() {
  currentR = startingR;
  var loopCycle = maxLoops;

  while (loopCycle > 0) {
    var circle = new Circle(random(width), random(height), currentR);

    var available = true;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      if (dist(circle.x, circle.y, other.x, other.y) < circle.r + other.r) {
        available = false;
        break;
      }
    }

    if (available) {
      circles.push(circle);
    }

    loopCycle--;
    if (loopCycle === 0) {
      if (currentR > 1) {
        currentR = currentR - 1;
        console.log('Reduced Radius: ' + currentR, 'Circles: ' + circles.length);
        loopCycle = maxLoops;
      }
    }
  }
}

function Circle(x, y, r) {

	this.x = x;
	this.y = y;
	this.r = r;

}

Circle.prototype.draw = function() {
	push();
	noStroke();
	fill(map(this.r, 0, startingR, 0, 255), 255, 255);
	ellipse(this.x, this.y, this.r*2, this.r*2);

	fill(255);
	textAlign(CENTER);
	pop();
}
// function setup() {
//   createCanvas(500, 500);
// }
//
// function draw() {
//   background(0);
//   noStroke();
//   mouseData();
// }
//
// function mouseData() {
//   var morningCoffee = [0, 2, 8, 1, 0, 3, 1, 3, 7, 4, 0, 3];
//   for(var i = 0; i < morningCoffee.length; i++){
//     var mapCoffee = map(morningCoffee[i], 0, 7, 10, 100);
//     var mapXpos = map(i, 0, morningCoffee.length, 10, width+20);
//     if(morningCoffee[i] == 0){
//       fill(0);
//       stroke(200,0,200,200);
//       ellipse(mapXpos, height/2, mapCoffee, mapCoffee);
//     }
//     else{
//       fill(0, 255, 255, 100);
//       noStroke();
//       textSize(12);
//       ellipse(mapXpos, height/2, mapCoffee, mapCoffee);
//     }
//       fill('white');
//       if(mouseX <= mapXpos+mapCoffee/2 && mouseX >= mapXpos - mapCoffee/2 && mouseY >= height/2-mapCoffee/2 && mouseY <= height/2+mapCoffee/2){
//         text(morningCoffee[i], mapXpos, height/2);
//
//     }
//   }
// }

//Triangle Pointers
//fill("blue");
//triangle(mouseX-20,mouseY-20, 60, 0, 0, 60);
//triangle(0,0, 60, 0, 0, 60);
//triangle(mouseX+20,mouseY+20, 540, 400, 600, 340);
//triangle(600,400, 540, 400, 600, 340);
