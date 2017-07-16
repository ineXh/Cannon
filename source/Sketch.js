var scribble = new Scribble();              // global mode
var world;

// A list for all of our boxes
var boxes = [];

function setup() {
  window.scrollTo(0,1);
  document.body.style.overflow = 'hidden';
  //carImage = loadImage("assets/car.png");
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);
  gravity = new PVector(0, 0.2)
  pool[constants.ObjectType.Ball].push(new Ball());
  pool[constants.ObjectType.Ball].push(new Ball());
  pool[constants.ObjectType.Ball].push(new Ball());

  ground = window.innerHeight*0.8
  cannon = new Cannon()
  cannon.init(window.innerWidth*0.2, ground)
  //g = scaleToWorld(0,0.2)
  world = createWorld(new box2d.b2Vec2(0,20)); //

  //scribble.bowing    = 0.1;
  //scribble.roughness = 1.5;
  //scribble.maxOffset = 2
  //var scribble = new Scribble( p5Instance );  // instance mode
}


function draw() {
  background(255)
  fill(220);
  stroke(0)
  strokeWeight(2)
  ellipse(mouseX, mouseY, width/60, width/60)
  line(mouseX-width/80, mouseY, mouseX+width/80, mouseY)
  line(mouseX, mouseY-width/80, mouseX, mouseY+width/80)
  cannon.seek(mouseX, mouseY)
  cannon.update()
  updateBalls();
  fill(220,0,0);
//strokeWeight( 10 );
  //scribble.scribbleRoundedRect( 200, 200, 100, 100, 25 );
  //scribble.scribbleRect( 200, 200, 100, 100 );
  /*var xCoords = [ 150, 250, 250, 150 ];
  var yCoords = [ 150, 150, 250, 250 ];
   strokeWeight( 1 );
  stroke( 0, 50, 180 );
  scribble.scribbleFilling( xCoords, yCoords , 3, 250 );*/

  // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  // Boxes fall from the top every so often
  if (mouseIsPressed) {
    var b = new Box(mouseX,mouseY);
    boxes.push(b);
    ball = new Ball()
    ball.init(mouseX + 50, mouseY)
    balls.push(ball);
    ball.fired = true;
  }
  // Display all the boxes
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
} // end draw

function mouseClicked() {
  cannon.fire()
}