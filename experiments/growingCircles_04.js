function setup() {
  createCanvas(600, 600);
}

const size = 6;
const divider = 10;
const numRows = 50;
const numCols = 50;

let counter = 0;

function draw() {
  background(255, 182, 193);
  noStroke();
  fill(75, 0, 130);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      push();
      translate(150, 150);
      //rotate(PI / 2);
      let value = noise(x / divider, y / divider, counter) * size;

      ellipse(size / 2 + x * size, size / 2 + y * size, value);
      pop();
    }
  }

  //will only draw it once
  counter += 0.1;
}
