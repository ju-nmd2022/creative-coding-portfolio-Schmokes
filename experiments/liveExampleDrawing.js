function setup() {
  createCanvas(1000, 1000);
}

const size = 100;
const layers = 15;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  noFill();
  const variance = size / layers;

  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.6) {
      continue;   
    }

    const s = (size / layers) * i;      
    const half = s / 2;

    //rect(x - half, y - half, s, s);

    beginShape();
    vertex(getRandomValue(x - half, variance), getRandomValue(y - half, variance));
    vertex(getRandomValue(x + half, variance), getRandomValue(y - half, variance));
    vertex(getRandomValue(x + half, variance), getRandomValue(y + half, variance));
    vertex(getRandomValue(x - half, variance), getRandomValue(y + half, variance));
    endShape(CLOSE);
  }
}

function draw() {
  background(255);

  //drawLayers(100, 100, size, layers);

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }

  noLoop();
}
