function GamePlay(){
	this.create();
}
GamePlay.prototype = {
	create: function(){
	},
	update: function(){
		background(239,232,225)
		image(moonBG, 0, height*0.9, width, height*0.1);

		for (var i = 0; i < boundaries.length; i++) {
			boundaries[i].display();
		}
		cannon.update()
		updateObjects();
	},
} // end GamePlay