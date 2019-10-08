function preload(){
  // put preload code here
}

var yoff = 0;
var xoff = 0;

var myBall;
var ballArray = [];
var counter = 100;

var cursorBall;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  noCursor();

  for (var i = 0; i < counter; i++){
  var myBall = new bouncingBalls (random()*width, random()*height, 30);
  ballArray.push(myBall);
  }

//istanza per nuovo cerchio indipendente che "sostituisce" il cursore
  cursorBall = new bouncingBalls (mouseX, mouseY, 10);
  cursorBall.color= 51;
  cursorBall.weight = 1;
}

function draw() {
  // generazione di un'onda tramite noise
    push();
    background(51);
    fill(51);
    beginShape();
    stroke('white');
    strokeWeight(3);
    // map gestisce la frequenza dell'onda in base al movimento deò cursore sull'asse x
    var a = map(mouseX, 0, width, 320, 0);
    var b = map(mouseX, 0, width, 300, 1000);

    for (var x = 0; x <= width; x += 10) {
      var y = map(noise(xoff, yoff), 0, 1, a, b);
      vertex(x, y);
      xoff += 0.05;
    }
    yoff += 0.01;
    vertex(width+100, height);
    vertex(-100, height);
    endShape(CLOSE);
    pop();


    push();
    for( var i = 0; i < ballArray.length; i++){
      var j = ballArray[i];
   	j.move();
   	j.display();
    }
    pop();

    push();
    cursorBall.command();
    cursorBall.display();
    pop();
}

function bouncingBalls (bx, by, bd)  {
  this.x = bx;
  this.y = by;
  this.size = bd;
  this.color = 'white';
  this.stroke = 'white';
  this.weight = 0;

//gestisce il movimento dei cerchi tutti
  this.move = function() {
  var a = map(mouseX, 0, width, 0.5, 10)
  var q = map(mouseX, mouseY, width, a , a);
   this.x = this.x + random(-q, q);
   this.y = this.y + random(-q, q);
 }

//command gestisce il movimento del cursorBall
  this.command = function() {
   this.x = mouseX;
   this.y = mouseY;
  }

//display
  this.display = function () {
    fill(this.color);
    stroke(this.stroke);
    strokeWeight(this.weight);
    ellipse(this.x, this.y, this.size);
  }
}
