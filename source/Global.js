var count = 0;
var stage = 0;

var bg = null;
var gameState = constants.GameState.Title;
var userInterface = null;
var gamePlay = null;
var gravity = null;
var cannon = null;
var world;
var tempb2Vec2 =  null;

//var balls = [];
var pool = {}
pool[constants.ObjectType.Ball] = [];
pool[constants.ObjectType.Box] = [];
pool[constants.ObjectType.Particle] = [];

var objects = {}
objects[constants.ObjectType.Ball] = [];
objects[constants.ObjectType.Box] = [];
objects[constants.ObjectType.Particle] = [];