function updateBalls(){
	for (var i = balls.length - 1; i >= 0; i--) {
    var ball = balls[i];
    ball.update();
    if(ball.isDead()){
      ball.clean()
      balls.splice(i,1);
      pool[constants.ObjectType.Ball].push(ball)
    }
  }
} // end updateBalls

function Ball(){
	this.create();
}
Ball.prototype = {
	create: function(){
		this.history = [];
		this.pos = new PVector(0,0);
		this.vel = new PVector(0, 0);
		this.accel = new PVector(0, 0);

		this.r = 8;
		this.maxSpeed = width/1;
	}, // end create
	init: function(x, y){
		this.pos.x = x;
		this.pos.y = y;
		this.vel.x = this.vel.y = this.accel.x = this.accel.y = 0
		this.fired = false
	},
	update: function() {
		if(this.fired) this.applyForce(gravity)
		this.vel.add(this.accel);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.accel.mult(0);

		this.history.push(this.pos.clone());
		if (this.history.length > 100) {
			this.history.splice(0,1);
		}
		this.display()
	}, // end update
	applyForce: function(force) {
		this.accel.add(force);
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

		//imageMode(CENTER);
		push();
			translate(this.pos.x,this.pos.y);
			//rotate(theta-PI/2);
			ellipse(0, 0, this.r*2, this.r*2)
			//image(carImage, 0, 0, carImage.width/2, carImage.height/2);
		pop();

	},
	isDead: function(){
		if(this.pos.x < 0 || this.pos.x > width) return true;
		if(this.pos.y < 0 || this.pos.y > height) return true;
	},
	clean: function(){

	}
} // end Ball
