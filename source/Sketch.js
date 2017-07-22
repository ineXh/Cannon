var scribble = new Scribble();              // global mode
var boundaries = [];

function preload() {
  loadAssets();
}
function setup() {
  window.scrollTo(0,1);
  document.body.style.overflow = 'hidden';

  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(fr);



  userInterface = new UserInterface();
  gamePlay = new GamePlay();
  //g = scaleToWorld(0,0.2)
  gravity = new box2d.b2Vec2(0, height*baseGravity);
  world = createWorld(gravity);
  world.SetContactListener(new ContactListener());
  tempb2Vec2 = new box2d.b2Vec2(0, 0)

  ground = height*0.7
  for(var i = 0; i < 50; i++) pool[constants.ObjectType.Ball].push(new Ball());
  for(var i = 0; i < 50; i++) pool[constants.ObjectType.Box].push(new Box());
  for(var i = 0; i < 5; i++) pool[constants.ObjectType.GiantTriangle].push(new GiantTriangle());
  for(var i = 0; i < 5; i++) pool[constants.ObjectType.Character].push(new Character());
  for(var i = 0; i < 10; i++) pool[constants.ObjectType.Particle].push(new Particle());

  gamePlay.init();
} // end setup


function draw() {

  count++;
  //console.log(count)
  var timeStep = 1.0/fr;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);


  gamePlay.update();
  userInterface.update();
  
} // end draw

function mouseClicked() {
  if(cannon) cannon.fire()
    userInterface.pressed();
  //spawnObj(mouseX, mouseY, constants.ObjectType.Box)
  //spawnObj(mouseX, mouseY, constants.ObjectType.Ball)
  //spawnObj(mouseX, mouseY, constants.ObjectType.GiantTriangle)
  //spawnObj(mouseX, mouseY, constants.ObjectType.Character)
  //spawnDmg(mouseX, mouseY)

}