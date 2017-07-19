function GamePlay(){
	this.create();
}
GamePlay.prototype = {
	create: function(){
	},
	init: function(){
		switch(gameState){
			case constants.GameState.Title:
				initTitle();
			break;
			case constants.GameState.GetReady:
				cleanObjects();
				cannon.load();
			break;
		}
	},
	update: function(){
		background(239,232,225)
		imageMode(CORNER);
		image(moonBG, 0, height*0.9, width, height*0.1);

		for (var i = 0; i < boundaries.length; i++) {
			boundaries[i].display();
		}
		cannon.update()
		updateObjects();
	},
} // end GamePlay

var initTitle = function(){
	var side = width/60;
	//for(var i = 0; i < 20; i++) spawnObj(width/2, ground - i*height/50, constants.ObjectType.Box)
	thick = width/200;
	boundaries.push(new Boundary(width/2, ground + thick, width, thick));
	/*boundaries.push(new Boundary(width/2, thick/2,width, thick));
	boundaries.push(new Boundary(width-thick/2, height/2, thick,height));
	boundaries.push(new Boundary(thick/2, height/2, thick,height));*/

	cannon = new Cannon()
	cannon.init(width*0.15, ground-height*0.01)
}

function updateObjects(){
	for(type in objects){
		for (var i = objects[type].length - 1; i >= 0; i--) {
		    var object = objects[type][i];
		    object.update();
		    if(object.isDead()){
		      object.clean()
		      objects[type].splice(i,1);
		      pool[type].push(object)
		    }
		  }
	}
} // end updateObjects

function cleanObjects(){
	for(type in objects){
		for (var i = objects[type].length - 1; i >= 0; i--) {
		    var object = objects[type][i];
			object.clean()
			objects[type].splice(i,1);
			pool[type].push(object)
		}
	}
}