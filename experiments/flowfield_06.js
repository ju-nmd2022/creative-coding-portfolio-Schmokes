//The next lines of code where conducted with the help if this video: https://www.youtube.com/watch?v=ktPnruyC6cc&list=PLwUlLzAS3RYow0T9ZXB0IomwB-DyBRTfm&index=11
//Values have been changed by me
function setup() {
  createCanvas(innerWidth, innerHeight);

  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(10, 20, 30);
  noFill();

  translate(innerWidth / 2, innerHeight / 2);

  for (let i = 0; i < 200; i++) {
    push();

    rotate(sin(frameCount + i * 4) * 100);

    let r = map(sin(frameCount), -1, 1, 50, 255);
    let g = map(sin(frameCount / 7), -1, 1, 50, 255);
    let b = map(sin(frameCount / 4), -1, 1, 50, 255);

    stroke(r, g, b);

    rect(0, 0, 400 - i * 3, 700 - i * 3, 300 - i);
    pop();
  }
}
