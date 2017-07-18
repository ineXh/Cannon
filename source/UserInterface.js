function UserInterface(){
	this.create();
}
UserInterface.prototype = {
	create: function(){
	},
	update: function(){
		this.displayTitle();
	},
	displayTitle: function(){
		fill('#ED225D');
		textAlign(CENTER);
		textFont(scoreFont);
		textSize(height/8);
		text('Cannon Fight', width/2, height*0.2);
	}
} // end UserInterface