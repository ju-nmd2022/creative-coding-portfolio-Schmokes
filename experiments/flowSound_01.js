class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();
    //!Change here
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    //!Change this
    push();
    stroke(248, 50, 130, 40);
    strokeWeight(1);
    line(this.lastPosition.x, this.lastPosition.y, this.position.x, this.position.y);
    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255, 0);
  field = generateField();
  generateAgents();

  //loadPixels();
}

function generateField() {
  let field = [];
  noiseSeed(Math.random() * 10);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 2;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}

function generateAgents() {
  for (let i = 0; i < 300; i++) {
    let agent = new Agent(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      //!Change these
      2,
      0.3
    );
    agents.push(agent);
  }
}

const fieldSize = 30;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 3;
let field;
let agents = [];

function draw() {
  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);
    const desiredDirection = field[x][y];
    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();
    agent.draw();
  }

  loadPixels();
}

function mouseDragged() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let x = mouseX;
    let y = mouseY;

    let d = pixelDensity(); // pixel density can vary depending on the device
    let index = 4 * (y * d * width * d + x * d);

    // The array contains RGBA values. So index + 3 gives the alpha (A) value
    let alphaValue = pixels[index + 3];

    console.log(alphaValue);

    synth = new Tone.PolySynth().toDestination();

    if (alphaValue <= 50) {
      synth.triggerAttackRelease("C4", "8n");
      //then this sound
    } else if (50 < alphaValue > 150) {
      synth.triggerAttackRelease("E4", "8n");
      //then this sound
    } else if (alphaValue > 150) {
      synth.triggerAttackRelease("G4", "8n");
      //then this sound
    }
  }

  if (!mouseDragged) {
    
  }
}
