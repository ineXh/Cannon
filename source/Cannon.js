function Cannon(){
	this.create();
}
Cannon.prototype = {
	create: function(){
		this.pos = new PVector(0,0);
		this.angle = -PI/4
		this.width = height/20
		this.length = width/15
	}, // end create
	init: function(x, y){
		this.pos.x = x;
		this.pos.y = y;
		
		this.load();
	},
	seek: function(x, y){
		this.angle = Math.atan2(y - this.pos.y, x- this.pos.x)
	},
	load: function(){
		this.ball = pool[constants.ObjectType.Ball].shift()
		if(this.ball == undefined || !this.ball) return;
		this.ball.init(this.pos.x, this.pos.y)
		balls.push(this.ball);
		this.fired = false;
	},
	fire: function(){
		if(!this.ball) return
		force = PVector.fromAngle(this.angle);
		force.mult(height/20)
		this.ball.applyForce(force);
		this.ball.fired = true;
		this.ball = null;
		this.load();
	},
	update: function() {
		this.display()
	}, // end update

	display: function() {
		rectMode(CORNER);
		push();
			translate(this.pos.x,this.pos.y);
			rotate(this.angle);
			rect(0, -this.width/2, this.length, this.width)
		pop();

	}
} // end Cannon
