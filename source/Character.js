function Character(){
    this.create();
}
Character.prototype = Object.create(Ball.prototype);
Character.prototype.constructor = Ball;
Character.prototype.create = function(){

    this.r = width/6;

    this.pos = new PVector(0,0);
    this.vel = new PVector(0, 0);
    this.accel = new PVector(0, 0);
    this.clr = color(219, 139, 239)//(209, 66, 244)
    //this.maxSpeed = width/1;

    this.r = height/30;
    // Define a body
    var bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(0,0);

    // Define a fixture
    var fixtureDef = new box2d.b2FixtureDef();
    // Fixture holds shape
    fixtureDef.shape = new box2d.b2CircleShape();
    fixtureDef.shape.m_radius = scaleToWorld(this.r);

    // Some physics
    fixtureDef.density = 1.0;
    fixtureDef.friction = 1;//0.5;//0.5;
    fixtureDef.restitution = 0.2;//0.2;


    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fixtureDef);
    this.body.SetActive(false)
    this.type = constants.ObjectType.Character;
    this.body.parent = this;
}
Character.prototype.init = function(x, y){
    tempb2Vec2.x = x/scaleFactor;
    tempb2Vec2.y = y/scaleFactor
    this.body.SetPosition(tempb2Vec2);
    this.body.SetActive(true)
    this.Dead = false;
}
Character.prototype.getShot = function(ball){
    //console.log('getShot')
    spawnDmg(this.pos.x, this.pos.y)
    userInterface.score++;
    this.Dead = true;
    ball.Dead = true;
}
Character.prototype.display = function(){
	this.pos.x = this.body.GetPosition().x*scaleFactor
    this.pos.y = this.body.GetPosition().y*scaleFactor
    // Get its angle of rotation
    //var a = this.body.GetAngleRadians();

    var img = imgCharacter1[0]
    imageMode(CENTER);
    tint(this.clr)
    push();
        translate(this.pos.x,this.pos.y);
        //println(pos.x + " " + pos.y);
        //rotate(a);
        fill(127);
        image(img, 0, 0, this.r*2, this.r*2);
    pop();
}