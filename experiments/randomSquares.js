function setup() {
  createCanvas(600, 500);
}

const amount = 120;

function draw() {
  noFill();
  background(255);

  for (i = 0; i < amount; i++) {
    let x = Math.random() * 470 + 50;
    let y = Math.random() * 350 + 50;

    rect(x, y, 40, 40);
  }
  noLoop();
}
