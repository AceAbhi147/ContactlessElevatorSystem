let socket;

function setup() {
  createCanvas(400, 400);
  background(51);

  socket = io.connect('http://localhost:5000');
}

function draw() {
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 36, 36);
}
