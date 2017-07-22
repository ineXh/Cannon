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
				stageSetup();
			break;
		}
	},
	update: function(){
		background(239,232,225)
		noTint()
		imageMode(CORNER);
		image(moonBG, 0, height*0.9, width, height*0.1);

		for (var i = 0; i < boundaries.length; i++) {
			boundaries[i].display();
		}
		cannon.update()
		updateObjects();
		stageUpdate();
	},
} // end GamePlay

var stageSetup = function(){
	userInterface.time = 40;
	switch(stage){
		case 1:
			spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
		break;
		case 2:
			spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
			spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
			insertStack(3, width/2, height/2);
		break;
		case 3:
			spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
			spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
			spawnObj(width/2, ground-height*Math.sqrt(3)/4/6, constants.ObjectType.GiantTriangle)
		break;
		default:
			//gravity.y = height*baseGravity*0.5
			//world.SetGravity(gravity)
		break;
		
	}
}
var stageUpdate = function(){
	switch(stage){
		case 1:
			if(objects[constants.ObjectType.Character].length < 1) spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
		break;
		case 2:
			if(objects[constants.ObjectType.Character].length < 2) spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
		break;
		case 3:
			if(objects[constants.ObjectType.Character].length < 2) spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
		break;
		default:
			if(objects[constants.ObjectType.Character].length < 1) spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
			if(objects[constants.ObjectType.Box].length < 1) insertStack(5, width/2, height/2);
		break;
	}
} // end stageUpdate

var initTitle = function(){
	
	//spawnObj(width/2, ground - (6-i)*height/50, constants.ObjectType.Box)
	thick = width/200;
	boundaries.push(new Boundary(width/2, ground + thick, width, thick));
	/*boundaries.push(new Boundary(width/2, thick/2,width, thick));
	boundaries.push(new Boundary(width-thick/2, height/2, thick,height));
	boundaries.push(new Boundary(thick/2, height/2, thick,height));*/

	cannon = new Cannon()
	cannon.init(width*0.1, ground-height*0.01)

	/*spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
	spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
	spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)
	spawnObj(getRandomInt(cannon.pos.x + width/10, width), height/2, constants.ObjectType.Character)*/
}
function insertStack(rows, x, y0){
	var mid = x
	var rows = 5;

	for(var i = 0; i < rows; i++){
		var num = rows - i;
		var even = (num%2 == 0)
		y = y0 - (i+1)*boxSide
		//console.log('y ' + y)
		if(even){
			x0 = mid - num/2*boxSide;
			//console.log(x0)
			for(var j = 0; j < num; j++){
				x = x0 + j*boxSide;
				spawnObj(x, y, constants.ObjectType.Box)
			}
		}else{ // odd
			x0 = mid - boxSide/2 - (num-1)/2*boxSide;
			//console.log(x0)
			for(var j = 0; j < num; j++){
				x = x0 + j*boxSide;
				//if(j == 0 || j == num-1)
				spawnObj(x, y, constants.ObjectType.Box)
			}
		}
	}
}
function updateObjects(){
	for(type in objects){
		for (var i = objects[type].length - 1; i >= 0; i--) {
		    var object = objects[type][i];
		    object.update();
		    if(object.isDead()){
		    	//if(type == constants.ObjectType.Particle && object instanceof Ball) debugger;
		      //debugger;
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
			//debugger;
			pool[type].push(object)
		}
	}
}
function cleanObject(object){
	type = object.type;
	index = objects[type].indexOf(object);
	if(index <= -1) return;
	object.clean()
	objects[type].splice(index,1);
	pool[type].push(object)
}