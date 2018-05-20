function Cannon(){
	this.create();
}
Cannon.prototype = {
	create: function(){
		this.pos = new PVector(0,0);
		this.target = new PVector(0,0);
		this.fireForce = new PVector(0,0);
		this.fireVel = new PVector(0,0);
		this.angle = -PI/4
		this.angleLimit = PI*1/16;
		this.width = height/30
		this.length = height/20
		// cannon base
		this.baseRadius = height/50
		this.baseWidth  = height/30
		// target
		this.dotRadius = height/100;
		this.trajectory = true;

		this.delay = 30;
		this.lastFireCount = 0;
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
		if(this.angle >= -this.angleLimit && this.angle <= PI/2) this.angle = -this.angleLimit
		if(this.angle <= (-PI + this.angleLimit) || this.angle >= PI/2) this.angle = -PI + this.angleLimit
	},
	load: function(){
		this.ball = pool[constants.ObjectType.Ball].shift()
		//console.log(this.ball)
		if(this.ball == undefined || !this.ball) return;
		this.ball.init(this.pos.x, this.pos.y)
		objects[constants.ObjectType.Ball].push(this.ball);
		this.fired = false;
		this.trajectory = true;
	},
	fire: function(){
		if(gameState == constants.GameState.GetReady) return;
		if(gameState == constants.GameState.GameOver) return;
		if(gameState == constants.GameState.InPlay){
			if(count - this.lastFireCount < this.delay) return;
		}
		if(!this.ball){
			this.load();
			return
		}
		this.trajectory = false;
		//console.log('fire')

		tempb2Vec2.x = this.fireForce.x;
	    tempb2Vec2.y = this.fireForce.y;
	    //console.log(tempb2Vec2)
	    timeFire = time;
	    //console.log("f x: "  + tempb2Vec2.x)
		//console.log("f y: "  + tempb2Vec2.y)
		//new box2d.b2Vec2(10,-10)
		this.ball.applyForce(tempb2Vec2);

		//console.log("vel x: "  + this.ball.body.GetLinearVelocity().x)
		//console.log("fireVel x: "  + this.fireVel.x)
		//console.log("vel y: "  + this.ball.body.GetLinearVelocity().y)
		this.ball.fired = true;
		this.ball = null;
		this.lastFireCount = count;
		spawnDust(this.pos.x + this.length*Math.cos(this.angle),
				  this.pos.y + this.length*Math.sin(this.angle))
		this.load()
	},
	calculateFireForce: function(){
		this.fireForce = PVector.fromAngle(this.angle);
		factor = (width > height*1.5) ? 1/10000 : 1/50000;
		this.fireForce.mult(this.dist*height*factor*scaleFactor)
		this.fireVel.x = this.fireForce.x/this.ball.body.m_mass
		this.fireVel.y = this.fireForce.y/this.ball.body.m_mass
	},
	update: function() {
		this.seek(mouseX, mouseY)
		this.display()
		//this.displayTarget();
		this.calculateFireForce();
		if(this.trajectory) this.displayTrajectory();

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

				/*ellipse(0, 0, this.dotRadius, this.dotRadius)
				ellipse(this.dist/4, 0, this.dotRadius, this.dotRadius)
				ellipse(this.dist*2/4, 0, this.dotRadius, this.dotRadius)
				ellipse(this.dist*3/4, 0, this.dotRadius, this.dotRadius)*/

				rect(0, -this.width/2, this.length, this.width, this.baseRadius,this.baseRadius/4,this.baseRadius/4,this.baseRadius)
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
	},
	displayTrajectory: function(){
		fill(220);
		stroke(0)
		strokeWeight(2)
		var dt = 0.5;
		var t = 0.5;
		var n = 0
		var x = this.pos.x;
		var y = this.pos.y;
		while(y < ground && n < 20){
			x += dt*this.fireVel.x*scaleFactor
			y = this.pos.y + 0.5*gravity.y*scaleFactor*t*t
			+ t*this.fireVel.y*scaleFactor
			if(y > ground) break;
			//x = this.pos.x + t*this.fireVel.x*scaleFactor
			ellipse(x, y, this.dotRadius, this.dotRadius)
			t+= dt;
			n++;
		}

		/*var time = -2*this.fireVel.y/gravity.y;
		var x = this.pos.x + time*this.fireVel.x*scaleFactor
		ellipse(x, this.pos.y, width/20, width/20)*/
	}
} // end Cannon
