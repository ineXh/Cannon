var scoreFont
var moonBG
var imgDust = []
var imgDmg = []
var loadAssets = function(){
	scoreFont = loadFont('/assets/ataurusp.ttf');
	moonBG = loadImage("assets/surface1.png");
	for(var i = 0; i <= 4; i++) imgDust[i] = loadImage("assets/dust/" + i + ".png");
	for(var i = 1; i <= 4; i++) imgDmg[i-1] = loadImage("assets/dmg1/" + i + ".png");
} // end loadAssets