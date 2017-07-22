function GiantTriangle(){
    this.create();
}
GiantTriangle.prototype = Object.create(Box.prototype);
GiantTriangle.prototype.constructor = Box;
GiantTriangle.prototype.create = function(){

    this.r = height/6;

    this.pos = new PVector(0, 0)
    // Define a body
    var bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_staticBody; //b2_dynamicBody
    bd.position = scaleToWorld(0,0);

    // Define a fixture
    var fixtureDef = new box2d.b2FixtureDef();

    var vertices = [];
    var numVerts = 3;
    
	for (var i = 0; i < numVerts; i++) {
        var angle = i / numVerts * 360.0 * Math.PI / 180;
        scaleToWorld(-15, 25);
        vertices.push(scaleToWorld(this.r * Math.sin(angle), this.r * -Math.cos(angle)))
    }
    // Fixture holds shape
    fixtureDef.shape = new box2d.b2PolygonShape();
    fixtureDef.shape.SetAsArray(vertices,vertices.length);
    //fixtureDef.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

    // Some physics
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;//0.5;
    fixtureDef.restitution = 0.2;//0.2;
    
    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fixtureDef);
    this.body.SetActive(false)
    this.type = constants.ObjectType.Box;
    this.body.parent = this;
}
GiantTriangle.prototype.display = function(){
	this.pos.x = this.body.GetPosition().x*scaleFactor
    this.pos.y = this.body.GetPosition().y*scaleFactor
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();
    var f = this.body.GetFixtureList();
    var ps = f.GetShape();

    rectMode(CENTER);
    push();
    translate(this.pos.x,this.pos.y);
    //println(pos.x + " " + pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(0,0,20,20);
    beginShape();
    // For every vertex, convert to pixel vector
    for (var i = 0; i < ps.m_count; i++) {
      var v = scaleToPixels(ps.m_vertices[i]);
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
}
GiantTriangle.prototype.isDead = function(){
    if(this.Dead) return true;
    if(this.pos.x < -this.r || this.pos.x > width + this.r) return true;
    if(this.pos.y < -height || this.pos.y > height) return true;
    return false;
}