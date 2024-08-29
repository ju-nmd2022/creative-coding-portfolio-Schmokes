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

    let thickness = Math.random() * 2;
    strokeWeight(thickness);
    stroke(0,0,255, 120);

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

    ellipse(x, y, value); 
    //rect(x, y, value, value);
  }
  noLoop();
}

//! Contains:
//* bubbles  
//* 90% smaller ellipses & 10% bigger ellipses
//* random placement & size
//* random stroke width
