

function Ball(){
	this.create();
}
Ball.prototype = {
	create: function(){
		this.history = [];
		this.pos = new PVector(0,0);
		this.vel = new PVector(0, 0);
		this.accel = new PVector(0, 0);
		this.clr = color(255, 204, 0)
		//this.maxSpeed = width/1;

		this.r = height/120;
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
	    fixtureDef.friction = 100000;//0.5;//0.5;
	    fixtureDef.restitution = 0.2;//0.2;
	    

	    // Create the body
	    this.body = world.CreateBody(bd);
	    // Attach the fixture
	    this.body.CreateFixture(fixtureDef);
	    this.body.SetActive(false)
	    this.body.type = constants.ObjectType.Ball;
	    this.body.parent = this;
	    //this.body.SetUserData(this);
	}, // end create
	init: function(x, y){
		/*this.pos.x = x;
		this.pos.y = y;
		this.vel.x = this.vel.y = this.accel.x = this.accel.y = 0*/
		tempb2Vec2.x = x/scaleFactor;
	    tempb2Vec2.y = y/scaleFactor
	    this.body.SetPosition(tempb2Vec2);
	    tempb2Vec2.x = tempb2Vec2.y = 0
	    this.body.SetLinearVelocity(tempb2Vec2)
	    this.body.SetActive(false)
		this.fired = false
	},
	update: function() {
		/*if(this.fired) this.applyForce(gravity)
		this.vel.add(this.accel);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.accel.mult(0);

		this.history.push(this.pos.clone());
		if (this.history.length > 100) {
			this.history.splice(0,1);
		}*/
		//console.log(this.body.GetTangentSpeed())
		//console.log(this.body.GetLinearVelocity())
		//console.log(this.body.GetAngularVelocity())
		var angularVelocity = this.body.GetAngularVelocity();
		this.body.SetAngularVelocity(angularVelocity*0.95)
		this.display()
	}, // end update
	applyForce: function(force) {
		this.body.SetActive(true)
		this.body.ApplyLinearImpulse( force, this.body.GetWorldCenter())
		//this.body.applyForce( force, this.body.GetWorldCenter())
		//this.accel.add(force);
	},
	display: function() {
		/*beginShape();
		stroke(0);
		strokeWeight(2);
		noFill();
		for(var i = 0; i < this.history.length; i++){
			v = this.history[i];
			vertex(v.x,v.y);
		}
		endShape();*/
		// Draw a triangle rotated in the direction of velocity
		//if(this.fired) console.log("display")
		//imageMode(CENTER);
		this.pos.x = this.body.GetPosition().x*scaleFactor
	    this.pos.y = this.body.GetPosition().y*scaleFactor
	    //console.log(this.pos.x)
	    // Get its angle of rotation
	    //var a = this.body.GetAngleRadians();
		push();
			translate(this.pos.x,this.pos.y);
			//rotate(theta-PI/2);
			fill(this.clr)
			ellipse(0, 0, this.r*2, this.r*2)
			//image(carImage, 0, 0, carImage.width/2, carImage.height/2);
		pop();

	},
	isDead: function(){
		if(this.pos.x < 0 || this.pos.x > width) return true;
		if(this.pos.y < 0 || this.pos.y > height) return true;
		return false;
	},
	clean: function(){
    	this.body.SetActive(false);
    	//world.DestroyBody(this.body);
  	},
} // end Ball
