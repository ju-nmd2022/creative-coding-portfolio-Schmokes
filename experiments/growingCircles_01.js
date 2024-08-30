function setup() {
  createCanvas(600, 600);
}

const size = 10;
const numRows = 60;
const numCols = 60;

function draw() {
  background(255);
  noStroke();
  fill(60, 80, 100);
  //noiseSeed(8);
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = map(x, 0, numCols, 2, size * 2);

      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }

  //will only draw it once
  noLoop();
}
