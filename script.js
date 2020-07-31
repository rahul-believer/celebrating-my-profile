var fireworks = [];
var gravity;

function Firework() {
  this.hu = random(255);
  this.firework = new Particle(random(width), height, this.hu, true);
  this.exploded = false;
  this.particles = [];
  
  
  this.done = function() {
    if (this.exploded && this.particles.length === 0){
  return true;
  }else {
    return false;
  }
  }
  this.update = function() { 
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
 for (var i = this.particles.length-1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
   if (this.particles[i].done()){
     this.particles.splice(i, 1);
   }
    }
  }
  
  this.explode = function() {
    for (var i = 0; i < 100; i++) {
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
      this.particles.push(p);
    }     
  }
  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = this.particles.length-1; i >= 0; i--) {
      this.particles[i].show();
    }
  }
}

function setup() {
  createCanvas(1800, 700);
  gravity = createVector(0, 0.2);
  colorMode(HSB);
  stroke(255);
  strokeWeight(4);
  background(0);
  

}

function draw() {
  fill(0, 102, 153);
  textAlign(CENTER);
  textSize(50);
  textFont('Helvetica');
  text('CELEBRATING MY GITHUB', 900, 50);
  colorMode(RGB);
  background(0, 0, 0, 25);
  if (random(1) < 0.03) {
    fireworks.push(new Firework());
  }

  for (var i = fireworks.length-1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done())
      fireworks.splice(i, 1);
  }

}

function Particle(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;

  if (this.firework){
   this.vel = createVector(0, random(-17, -8));
 }else {
   this.vel = p5.Vector.random2D();
   this.vel.mult(random(2, 10));
 }
  
  this.acc = createVector(0, 0);
 
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() { 
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  this.done = function(){
    if(this.lifespan < 0){
      return true;
    }else {
      return false;
    }
  }
  this.show = function() {
   colorMode(HSB);
    if (!this.firework) {
     strokeWeight(2);
     stroke(hu, 255, 255, this.lifespan);
   }else {
     strokeWeight(4);
     stroke(hu, 255, 255);
   }
    point(this.pos.x, this.pos.y);
   
  }
}
