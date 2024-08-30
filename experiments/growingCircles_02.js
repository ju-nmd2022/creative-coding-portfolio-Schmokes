function setup() {
  createCanvas(600, 600);
}

const size = 5;
const numRows = 50;
const numCols = 50;

function draw() {
  background(30);
  noStroke();
  fill(169, 69, 213);
  
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      push();
      translate(170, 170);
      const value = map(x, 0, numCols, 2, size * 2) / 1.42;

      ellipse(size / 2 + x * size, size / 2 + y * size, value);
      pop();
    }
  }

  //will only draw it once
  noLoop();
}
