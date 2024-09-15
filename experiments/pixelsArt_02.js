class Particle {
  constructor() {
    this.pos = createVector(innerWidth / 2, innerHeight / 2);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D()
      .normalize()
      .mult(0.1);

    //!for some reason the color does not work correctly
    /*this.r = map(this.pos.x, 0, width, 255, 0);
    this.g = map(this.pos.y, 0, height, 0, 255);
    this.b = map(dist(width / 2, height / 2, this.pos.x, this.pos.y, 0, width, 0, 255)); */

    this.alpha = 255;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    /* this.r = map(this.pos.x, 0, width, 255, 0);
    this.g = map(this.pos.y, 0, height, 0, 255);
    this.b = map(dist(width / 2, height / 2, this.pos.x, this.pos.y, 0, width, 0, 255)); */

    //fades out the particles
    this.alpha -= 2;
  }

  show() {
    // The next 4 lines of code are form the video: https://www.youtube.com/watch?v=MceZFeV2jhE
    /* let r = map(sin(frameCount), -1, 1, 0, 255) + random(-50, 50);
    let g = map(sin(frameCount / 2), -1, 1, 255, 0) + random(-50, 50);
    let b = map(cos(frameCount / 4), -1, 1, 0, 255) + random(-50, 50); */
    
//The next 3 lines of code are used from the video https://www.youtube.com/watch?v=ktPnruyC6cc&list=PLwUlLzAS3RYow0T9ZXB0IomwB-DyBRTfm&index=11
    let r = map(sin(frameCount), -1, 1, 50, 255);
    let g = map(sin(frameCount / 7), -1, 1, 50, 255);
    let b = map(sin(frameCount / 4), -1, 1, 50, 255);
    let c = color(r, g, b); 

    noStroke();
    fill(c, this.alpha);
    ellipse(this.pos.x, this.pos.y, 10);
  }
}

let particles = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(30);

  //changeing the number -> the amount of particles change

  for (let i = 0; i < 3; i++) {
    p = new Particle();
    particles.push(p);
  }

  for (let i = 0; i < particles.length; i++) {
    //limits the particles shown, if they faded out, they are removed
    if (particles[i].alpha > 0) {
      particles[i].update();
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
}
