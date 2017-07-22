function Boundary(x_,y_, w_, h_){
  this.create(x_,y_, w_, h_);
}
Boundary.prototype = {
  	create: function(x_,y_, w_, h_){
	    this.x = x_;
		this.y = y_;
		this.w = w_;
		this.h = h_;

	    var fixtureDef = new box2d.b2FixtureDef();
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.5;//0.5;
		fixtureDef.restitution = 0.2;
		

		var bd = new box2d.b2BodyDef();

		bd.type = box2d.b2BodyType.b2_staticBody;//b2_staticBody; //b2_dynamicBody;
		bd.position.x = scaleToWorld(this.x);
		bd.position.y = scaleToWorld(this.y);
		fixtureDef.shape = new box2d.b2PolygonShape();

		fixtureDef.shape.SetAsBox(this.w/(scaleFactor*2), this.h/(scaleFactor*2));

		this.body = world.CreateBody(bd)
		this.body.CreateFixture(fixtureDef);
		this.type = constants.ObjectType.Boundary;
		this.body.parent = this;
		//this.body.SetUserData(this);
	},
	display: function(){
		fill(127);
	    stroke(127);
	    rectMode(CENTER);
	    rect(this.x,this.y,this.w,this.h);
	}
} // end Boundary