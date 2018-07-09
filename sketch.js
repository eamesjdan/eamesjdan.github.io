
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background('black');
  //ellipse(mouseX,mouseY,10,10);
  noStroke();
  fill("blue");
  triangle(mouseX-20,mouseY-20, 60, 0, 0, 60);
  triangle(0,0, 60, 0, 0, 60);
  triangle(mouseX+20,mouseY+20, 540, 400, 600, 340);
  triangle(600,400, 540, 400, 600, 340);
  textSize(20);
  fill("red");
  //translate(-80,80);
  //rotate(QUARTER_PI);
  text("CIID 2018",mouseX,mouseY);

}
