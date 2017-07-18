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
  gamePlay = new GamePlay();
  //g = scaleToWorld(0,0.2)
  world = createWorld(new box2d.b2Vec2(0,20)); //
  tempb2Vec2 = new box2d.b2Vec2(0, 0)

  ground = height*0.7
  for(var i = 0; i < 50; i++) pool[constants.ObjectType.Ball].push(new Ball());
  for(var i = 0; i < 50; i++) pool[constants.ObjectType.Box].push(new Box());
  for(var i = 0; i < 50; i++) pool[constants.ObjectType.Particle].push(new Particle());

  for(var i = 0; i < 20; i++) spawnObj(width/2, ground - i*height/50, constants.ObjectType.Box)

  thick = width/200;
  boundaries.push(new Boundary(width/2, ground + thick, width, thick));
  /*boundaries.push(new Boundary(width/2, thick/2,width, thick));
  boundaries.push(new Boundary(width-thick/2, height/2, thick,height));
  boundaries.push(new Boundary(thick/2, height/2, thick,height));*/

  cannon = new Cannon()
  cannon.init(width*0.15, ground)
} // end setup


function draw() {
  count++;
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);


  gamePlay.update();
  userInterface.update();

} // end draw

function mouseClicked() {
  if(cannon) cannon.fire()
    

}