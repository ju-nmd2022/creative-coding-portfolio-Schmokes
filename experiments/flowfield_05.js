let stars = [];
let speed = 0;
let maxSpeed = 10;

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.position = createVector(random(-innerWidth / 2, innerWidth / 2), random(-innerHeight / 2, innerHeight / 2));
    this.lastPosition = this.position.copy();
    this.z = random(innerWidth);
    //stores the pervious value of z before it moves
    //determin where the star was before z changed
    this.pz = this.z;
  }

  update() {
    this.lastPosition = this.position.copy();
    // decreased the closer the star comes to the person
    this.z -= speed;
    if (this.z < 1) {
      this.reset();
    }

    let starX = map(this.position.x / this.z, 0, 1, 0, innerWidth / 2);
    let starY = map(this.position.y / this.z, 0, 1, 0, innerHeight / 2);
    this.position.set(starX, starY);
  }

  draw() {
    push();

    strokeWeight(map(this.z, 0, innerWidth, 3, 0));
    stroke(255);
    line(this.lastPosition.x, this.lastPosition.y, this.position.x, this.position.y);

    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < 700; i++) {
    stars.push(new Star());
  }
}

function draw() {
  translate(innerWidth / 2, innerHeight / 2);
  background(0);

  speed = lerp(speed, maxSpeed, 0.05);

  for (let star of stars) {
    star.update();
    star.draw();
  }
}
