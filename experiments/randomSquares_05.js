function setup() {
  createCanvas(600, 500);
}

const amount = 300;

function draw() {
  background(255);

  for (i = 0; i < amount; i++) {
    let x = Math.random() * 470 + 40;
    let y = Math.random() * 350 + 50;

    let thickness = Math.random() * 1.5;
    //strokeWeight(thickness);

    //random Color
    let r = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    stroke(r, g, b, 50);
    fill(r, g, b,120);    


    //*ChatGPT for selective sizes
    let s;
    if (Math.random() < 0.9) {
      // Small square
      s = Math.random() * 20 + 30;
    } else {
      // Big square
      s = Math.random() * 80 + 50;
    }

    const value = noise(x, y) * s;

    rect(x, y, value, value);
  }
  noLoop();
}

//! Contains:
//* 90% smaller squares & 10% bigger squares
//* random placement & size
//* random stroke width
//* random colors for the fill & no stroke
