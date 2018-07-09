function setup() {
  createCanvas(600, 400);
}

function draw() {
  background('green');
  ellipse(mouseX,mouseY,40,40);
  textSize(32);
  fill("red");
  text("Copenhagen",50,100);
}
