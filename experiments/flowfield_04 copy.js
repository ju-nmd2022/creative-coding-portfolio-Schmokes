const colors = ["227,152,7,255", "57,156,250,255", "26,27,76,255"];

class Agent {
  constructor(x, y, maxSpeed, maxForce, color) {  // Added color parameter
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.color = color;  // Store the color for this agent
    this.stepCount = 0;  // Added: Track how many steps the agent has taken
    this.maxSteps = 100; // Added: Maximum steps before resetting the agent
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
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.stepCount++;  // Added: Increment step count
    if (this.stepCount > this.maxSteps) {  // Added: Reset agent if maxSteps is exceeded
      this.reset();
    }
  }

  reset() {  // Added: Reset function for the agent
    this.position.set(Math.random() * innerWidth, Math.random() * innerHeight);
    this.lastPosition = this.position.copy();
    this.stepCount = 0;  // Reset step count
  }

  checkBorders() {
    if (this.position.x < 0 || this.position.x > innerWidth || this.position.y < 0 || this.position.y > innerHeight) {
      this.reset();  // Modified: Reset agent when it goes out of bounds
    }
  }

  draw() {
    push();
    stroke(this.color);  // Modified: Use the stored color for the agent
    strokeWeight(2);
    line(this.lastPosition.x, this.lastPosition.y, this.position.x, this.position.y);
    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);

  field = generateField();
  generateAgents();
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
  for (let i = 0; i < 200; i++) {
    let color = random(colors).split(',').map(Number);  // Added: Randomly pick and parse color
    let agentColor = color.slice(0, 3); // Extract RGB values
    let alpha = color[3]; // Extract alpha value
    let agent = new Agent(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      4,
      0.4,
      `rgba(${agentColor[0]},${agentColor[1]},${agentColor[2]},${alpha / 255})`  // Modified: Pass color to agent
    );
    agents.push(agent);
  }
}

const fieldSize = 30;  // Modified: Reduce the field size for a finer flow field
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 100;  // Modified: Adjust the divider to change the flow pattern
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
}