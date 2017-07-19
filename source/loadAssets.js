var scoreFont
var robotoFont
var moonBG
var imgDust = []
var imgDmg = []
var imgPlay;
var soundButton;
var loadAssets = function(){
	scoreFont = loadFont('/assets/ataurusp.ttf');
	robotoFont = loadFont('/assets/Roboto-Regular.ttf');
	moonBG = loadImage("assets/surface1.png");
	imgPlay = loadImage("assets/play_196.png");
	for(var i = 0; i <= 4; i++) imgDust[i] = loadImage("assets/dust/" + i + ".png");
	for(var i = 1; i <= 4; i++) imgDmg[i-1] = loadImage("assets/dmg1/" + i + ".png");

	soundButton = loadSound('assets/gamestart.wav');
	soundButton.setVolume(0.5);
} // end loadAssets