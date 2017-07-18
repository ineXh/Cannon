function Box(){
  this.create();
}
Box.prototype = {
  create: function(){
    this.w = width/60;
    this.h = width/60;

    this.pos = new PVector(0, 0)
    // Define a body
    var bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(0,0);

    // Define a fixture
    var fixtureDef = new box2d.b2FixtureDef();
    // Fixture holds shape
    fixtureDef.shape = new box2d.b2PolygonShape();
    fixtureDef.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

    // Some physics
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0;//0.5;
    fixtureDef.restitution = 0;//0.2;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fixtureDef);
    this.body.SetActive(false)
  },
  init: function(x,y){
    //this.body.SetTrans
    tempb2Vec2.x = x/scaleFactor;
    tempb2Vec2.y = y/scaleFactor
    this.body.SetPosition(tempb2Vec2);
    this.body.SetActive(true)
    //if(this.body)
      //this.body.SetTransform(tempb2Vec2, this.body.GetAngle());

    //this.body.ApplyForce(new box2d.b2Vec2(1000, -1000), this.body.GetWorldCenter())
    //this.body.ApplyLinearImpulse( new box2d.b2Vec2(10,0), this.body.GetWorldCenter())
    //this.body.SetActive(false)
  },
  update: function(){
    this.display()

  },
  isDead: function(){
    if(this.pos.x < 0 || this.pos.x > width) return true;
    if(this.pos.y < 0 || this.pos.y > height) return true;
    return false;
  },
  clean: function(){
    this.body.SetActive(false);
  },
  display: function(){
    // Get the body's position
    //var pos = scaleToPixels(this.body.GetPosition());
    this.pos.x = this.body.GetPosition().x*scaleFactor
    this.pos.y = this.body.GetPosition().y*scaleFactor
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();
    // Draw it!
    rectMode(CENTER);
    push();
      translate(this.pos.x,this.pos.y);
      rotate(a);
      fill(127);
      stroke(200);
      strokeWeight(2);
      rect(0, 0, this.w, this.h);
    pop();
  },
} // end Box

var spawnBox = function(x, y){
  box = pool[constants.ObjectType.Box].shift()
  if(box == undefined || !box) return;
  box.init(x, y)
  objects[constants.ObjectType.Box].push(box);
}