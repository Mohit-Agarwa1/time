var u;
var u2;
var count;
var Mohit_AGARWALcanvas;
var mods = [];
var darkbg = true;

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function setup() {
  Mohit_AGARWALcanvas = createCanvas(windowWidth, windowHeight);
  background('#0E334A');
  u = 50;
  u2 = 25*sqrt(3);
  var highCount = (height/50)+3;
  var wideCount = (width/50)+3;
  count = int(highCount * wideCount);
  var index = 0;
  for (var xc = 0; xc < wideCount; xc++) {
    for (var yc = 0; yc < highCount; yc++) {
      mods[index++] = new Module((int(xc)*u2*2),int(yc)*u);
    }
   }
}

function draw() {
  noStroke();
  for (var i = 0; i <= count; i++) {
    mods[i].draw1();
    mods[i].Over1();
  }
  translate(u2,25);
  for (var i = 0; i <= count; i++) {
    mods[i].draw2();
    mods[i].Over2();
  }
}

function mousePressed() {
  for (var i = 0; i <= count; i++) {
    mods[i].Pressed();
  }
}


function keyTyped() {
  if(darkbg === false){
    background('#0E334A');
    darkbg = true;
  } else {
    background('#F0DAC9');
    darkbg = false;
  }
}

function Module(_x, _y) {
  this.x1 = _x;
  this.y1 = _y;
  this.x2 = _x;
  this.y2 = _y;
  this.b1 = false;
  this.b2 = false;
  this.isOverRectangle1 = false;
  this.isOverRectangle2 = false;
  this.s = 25;

  this.c1 = randomChoice(['#0E334A','#F0DAC9',]);
  this.c2 = randomChoice(['#0E334A','#F0DAC9']);
}

Module.prototype.Pressed = function() {
    if (this.isOverRectangle1 === true){
      if(this.b1 === false){
      this.c1 = '#F0DAC9';
      this.b1 = true;
      } else {
      this.c1 = '#0E334A';
      this.b1 = false;
      }
    }
    if (this.isOverRectangle2 === true){
      if(this.b2 === false){
      this.c2 = '#F0DAC9';
      this.b2 = true;
      } else {
      this.c2 = '#0E334A';
      this.b2 = false;
      }
    }
}


Module.prototype.Over1 = function() {
  if (mouseX>(this.x1)-(this.s) && mouseX<(this.x1)+((sqrt(3)*this.s)-this.s)
  && mouseY>(this.y1)-(this.s) && mouseY<(this.y1)+(this.s)){
    this.isOverRectangle1 = true;
  } else {
    this.isOverRectangle1 = false;
  }
}

Module.prototype.Over2 = function() {
  if (mouseX>(this.x1)+(sqrt(3)*this.s)-this.s && mouseX<(this.x1)+((sqrt(3)*this.s)-this.s)+this.s+((sqrt(3)*this.s)-this.s)
  && mouseY>(this.y1) && mouseY<(this.y1)+(this.s*2)){
    this.isOverRectangle2 = true;
  } else {
    this.isOverRectangle2 = false;
  }
}

Module.prototype.draw1 = function() {
  push();
  translate(this.x1, this.y1);
  rectMode(CENTER);
  noStroke();
  fill(randomChoice(['#0E334A','#F0DAC9']));
  triangle(-this.s,-this.s,-this.s,this.s,(sqrt(3)*this.s)-this.s,0);
  if(this.isOverRectangle1 === true)
  {
    fill('rgba(255, 255, 255, 0.2)');
    triangle(-this.s,-this.s,-this.s,this.s,(sqrt(3)*this.s)-this.s,0);
  } else {
	  noFill();
  }
  pop();
}

Module.prototype.draw2 = function() {
  push();
  translate(this.x2, this.y2);
  rectMode(CENTER);
  noStroke();
  fill(randomChoice(['#0E334A','#F0DAC9']));
  triangle(-this.s,-this.s,-this.s,this.s,(sqrt(3)*this.s)-this.s,0);

  if(this.isOverRectangle2 === true)
  {
    fill('rgba(255, 255, 255, 0.2)');
    triangle(-this.s,-this.s,-this.s,this.s,(sqrt(3)*this.s)-this.s,0);
  } else {
	  noFill();
  }
  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
