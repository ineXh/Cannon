function Cannon(){
	this.create();
}
Cannon.prototype = {
	create: function(){
		this.pos = new PVector(0,0);
		this.target = new PVector(0,0);
		this.angle = -PI/4
		this.width = width/30
		this.length = width/20
		// cannon base
		this.baseRadius = width/50
		this.baseWidth  = width/30
		// target
		this.dotRadius = width/100;
	}, // end create
	init: function(x, y){
		this.pos.x = x;
		this.pos.y = y;

		this.load();
	},
	seek: function(x, y){
		this.target.x = x;
		this.target.y = y;
		this.dist = PVector.dist(this.pos, this.target)
		this.angle = Math.atan2(y - this.pos.y, x- this.pos.x)
		//console.log(this.angle)
		if(this.angle >= -PI/6 && this.angle <= PI/2) this.angle = -PI/6
		if(this.angle <= -PI*5/6 || this.angle >= PI/2) this.angle = -PI*5/6
	},
	load: function(){
		this.ball = pool[constants.ObjectType.Ball].shift()
		//console.log(this.ball)
		if(this.ball == undefined || !this.ball) return;
		this.ball.init(this.pos.x, this.pos.y)
		objects[constants.ObjectType.Ball].push(this.ball);
		this.fired = false;
	},
	fire: function(){
		if(!this.ball){
			this.load();
			return
		}
		console.log('fire')

		force = PVector.fromAngle(this.angle);
		force.mult(this.dist*height/50000*scaleFactor)
		tempb2Vec2.x = force.x;
	    tempb2Vec2.y = force.y;
		//new box2d.b2Vec2(10,-10)
		this.ball.applyForce(tempb2Vec2);
		this.ball.fired = true;
		this.ball = null;
		spawnDust(this.pos.x + this.length*Math.cos(this.angle),
				  this.pos.y + this.length*Math.sin(this.angle))
		this.load()

	},
	update: function() {
		this.seek(mouseX, mouseY)
		this.display()
		this.displayTarget();

	}, // end update

	display: function() {
		rectMode(CENTER);
		push();
			translate(this.pos.x,this.pos.y);
			strokeWeight(4);
			push();
				rotate(this.angle);
				rectMode(CORNER);
				fill(200)
				rect(0, -this.width/2, this.length, this.width, this.baseRadius,this.baseRadius/4,this.baseRadius/4,this.baseRadius)
				ellipse(0, 0, this.dotRadius, this.dotRadius)
				ellipse(this.dist/4, 0, this.dotRadius, this.dotRadius)
				ellipse(this.dist*2/4, 0, this.dotRadius, this.dotRadius)
				ellipse(this.dist*3/4, 0, this.dotRadius, this.dotRadius)

			pop();
			fill(255)
			rect(0, 0, this.baseWidth, this.baseWidth, this.baseRadius, this.baseRadius, this.baseRadius/4, this.baseRadius/4);
		pop();

	},
	displayTarget: function(){
		fill(220);
		stroke(0)
		strokeWeight(2)
		ellipse(mouseX, mouseY, width/60, width/60)
		line(mouseX-width/80, mouseY, mouseX+width/80, mouseY)
		line(mouseX, mouseY-width/80, mouseX, mouseY+width/80)
	}
} // end Cannon
