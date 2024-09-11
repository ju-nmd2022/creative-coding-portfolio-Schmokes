class Particle {
  constructor() {
    this.pos = createVector(innerWidth / 2, innerHeight / 2);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D().normalize().mult(0.2);

    this.r = map(this.pos.x, 0, width, 255, 0);
    this.g = map(this.pos.y, 0, height, 0, 255);
    this.b = map(
      dist(width / 2, height / 2, this.pos.x, this.pos.y, 0, width, 0, 255)
    );

    this.alpha = 255;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.r = map(this.pos.x, 0, width, 255, 0);
    this.g = map(this.pos.y, 0, height, 0, 255);
    this.b = map(
      dist(width / 2, height / 2, this.pos.x, this.pos.y, 0, width, 0, 255)
    );

    //fades out the particles
    this.alpha -= 2;
  }

  show() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);

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
  if (frameCount % 3 === 0) {
    for (let i = 0; i < 3; i++) {
      p = new Particle();
      particles.push(p);
    }
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
