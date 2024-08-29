function setup() {
  createCanvas(600, 500);
}

const amount = 300;

function draw() {
  noFill();
  background(255);

  for (i = 0; i < amount; i++) {
    let x = Math.random() * 470 + 40;
    let y = Math.random() * 350 + 50;

    //let s = Math.random() * 50 + 30;
    //*ChatGPT for selective sizes
    let s;
    if (Math.random() < 0.8) {
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
//* 80% smaller squares & 20% bigger squares
//* random placement & size
 