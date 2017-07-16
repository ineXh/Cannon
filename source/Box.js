// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

function Box(x, y) {
  this.w = 16;
  this.h = 16;

   // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define a fixture
  var fd = new box2d.b2FixtureDef();
  // Fixture holds shape
  fd.shape = new box2d.b2PolygonShape();
  fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

  // Some physics
  fd.density = 1.0;
  fd.friction = 0;//0.5;
  fd.restitution = 0;//0.2;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  //this.body.ApplyForce(new box2d.b2Vec2(1000, -1000), this.body.GetWorldCenter())
  this.body.ApplyLinearImpulse( new box2d.b2Vec2(10,0), this.body.GetWorldCenter())

  // Drawing the box
  this.display = function() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
      translate(pos.x,pos.y);
      rotate(a);
      fill(127);
      stroke(200);
      strokeWeight(2);
      rect(0, 0, this.w, this.h);
    pop();
  };
}
