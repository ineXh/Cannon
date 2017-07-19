var particleInput = {};
var spawnDust = function(x, y){
	type = constants.ObjectType.Particle
  	obj = pool[type].shift()
	if(obj == undefined || !obj) return;
	particleInput.x = x
	particleInput.y = y
	particleInput.ax = getRandomRange(-1, 1)*-width*0.001,
	particleInput.ay = getRandomRange(0.5, 1)*-height*0.008,
	particleInput.r = width/60,
	particleInput.lifespanS = 100,
	particleInput.lifespanD = 5,
	particleInput.image = imgDust//
	
	obj.init(particleInput)
	objects[type].push(obj);
}
function Particle(){
	this.create();
}
Particle.prototype = {
	create: function(){
		this.pos = new PVector(0,0);
		this.vel = new PVector(0, 0);
		this.accel = new PVector(0, 0);
		this.r = 0;
	}, // end create
	init: function(input){
		this.input = input;
		this.pos.x = input.x;
		this.pos.y = input.y;
		this.vel.x = (input.vx) ? input.vx : 0
		this.vel.y = (input.vy) ? input.vy : 0
		this.accel.x = (input.ax) ? input.ax : 0
		this.accel.y = (input.ay) ? input.ay : 0
		this.r = (input.r) ? input.r : width/10
		this.lifespanS = (input.lifespanS) ? input.lifespanS : 255
		this.lifespanD = (input.lifespanD) ? input.lifespanD : 5
		this.lifespan = this.lifespanS;
		this.pct = 0;
	},
	update: function() {
		this.vel.add(this.accel);
	    this.pos.add(this.vel);
		this.accel.mult(0);
		this.lifespan -= this.lifespanD;
		this.pct = this.lifespan / this.lifespanS;
		this.display()
	}, // end update

	display: function() {
		img = this.input.image[Math.round((1-this.pct)*(this.input.image.length-1))];
		push();
			translate(this.pos.x,this.pos.y);
			image(img, 0, 0, this.r, this.r);
		pop();
	},
	isDead: function(){
		return (this.lifespan <= 0)
	},
	clean: function(){

  	},
} // end Particle