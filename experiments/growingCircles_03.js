function setup() {
  createCanvas(600, 600);
}

const size = 5;
const numRows = 50;
const numCols = 50;

function draw() {
  background(255, 182, 193);
  noStroke();
  fill(75, 0, 130);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      push();
      translate(420, 180);
      rotate(PI / 2);
      const value = map(x, 0, numCols, 2, size * 2) / 3;

      ellipse(size / 2 + x * size, size / 2 + y * size, value);
      pop();
    }
  }

  //will only draw it once
  noLoop();
}
