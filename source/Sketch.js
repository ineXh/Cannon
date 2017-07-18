var scribble = new Scribble();              // global mode
var boundaries = [];

function preload() {
  loadAssets();
}
function setup() {
  window.scrollTo(0,1);
  document.body.style.overflow = 'hidden';
  //carImage = loadImage("assets/car.png");
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);



  userInterface = new UserInterface();
  //g = scaleToWorld(0,0.2)
  world = createWorld(new box2d.b2Vec2(0,20)); //
  tempb2Vec2 = new box2d.b2Vec2(0, 0)
  //scribble.bowing    = 0.1;
  //scribble.roughness = 1.5;
  //scribble.maxOffset = 2
  //var scribble = new Scribble( p5Instance );  // instance mode
  ground = height*0.7
  for(var i = 0; i < 50; i++) pool[constants.ObjectType.Ball].push(new Ball());
  for(var i = 0; i < 50; i++) pool[constants.ObjectType.Box].push(new Box());
  for(var i = 0; i < 20; i++) spawnBox(width/2, ground - i*height/50)

  thick = width/200;
  boundaries.push(new Boundary(width/2, ground + thick, width, thick));
  /*boundaries.push(new Boundary(width/2, thick/2,width, thick));
  boundaries.push(new Boundary(width-thick/2, height/2, thick,height));
  boundaries.push(new Boundary(thick/2, height/2, thick,height));*/

  cannon = new Cannon()
  cannon.init(width*0.15, ground)
} // end setup


function draw() {
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  background(239,232,225)
  image(moonBG, 0, height*0.9, width, height*0.1);

  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }
  cannon.update()
  updateObjects();
  userInterface.update();


} // end draw

function mouseClicked() {
  if(cannon) cannon.fire()

}