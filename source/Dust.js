function Ball(){
	this.create();
}
Ball.prototype = {
	create: function(){
		this.history = [];
		this.pos = new PVector(0,0);
		this.vel = new PVector(0, 0);
		this.accel = new PVector(0, 0);

	}, // end create
	init: function(x, y){

	},
	update: function() {

		this.display()
	}, // end update

	display: function() {

		push();
			translate(this.pos.x,this.pos.y);

			//image(carImage, 0, 0, carImage.width/2, carImage.height/2);
		pop();

	},
	isDead: function(){
		if(this.pos.x < 0 || this.pos.x > width) return true;
		if(this.pos.y < 0 || this.pos.y > height) return true;
		return false;
	},
	clean: function(){

  	},
} // end Ball