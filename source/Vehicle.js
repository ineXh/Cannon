function Vehicle(x,y){
	this.create(x, y);
}
Vehicle.prototype = {
	create: function(x,y){
		this.history = [];
		this.pos = new PVector(x,y);
		this.vel = new PVector(0, -2);
		this.accel = new PVector(0, 0);
		this.target = new PVector(0, 0);
		this.r = 6;
		this.maxSpeed = width/100;
		this.maxForce = width/800;
	}, // end create
	update: function() {
		this.vel.add(this.accel);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.accel.mult(0);

		this.history.push(this.pos.clone());
		if (this.history.length > 100) {
			this.history.splice(0,1);
		}
	}, // end update

	applyForce: function(force) {
		this.accel.add(force);
	},

	seek: function(x, y) {
		this.target.x = x;
		this.target.y = y;
		var desired = PVector.sub(this.target,this.pos); 

		desired.normalize();
		desired.mult(this.maxSpeed);
		var steer = PVector.sub(desired,this.vel);
		steer.limit(this.maxForce); 

		this.applyForce(steer);
	},

	display: function() {
		beginShape();
		stroke(0);
		strokeWeight(1);
		noFill();
		for(var i = 0; i < this.history.length; i++){
			v = this.history[i];
			vertex(v.x,v.y);
		}
		endShape();


		// Draw a triangle rotated in the direction of velocity
		
		var theta = this.vel.heading() + PI/2;

		imageMode(CENTER);
		push();
			translate(this.pos.x,this.pos.y);
			rotate(theta-PI/2);
			image(carImage, 0, 0, carImage.width/2, carImage.height/2);
		pop();
		/*
		fill(127);
		stroke(0);
		strokeWeight(1);
		push();
			translate(this.pos.x,this.pos.y);
			rotate(theta);
			beginShape();
			vertex(0, -this.r*2);
			vertex(-this.r, this.r*2);
			vertex(this.r, this.r*2);
			endShape(CLOSE);
		pop();*/
	}
} // end Vehicle
