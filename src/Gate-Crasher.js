(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.GateCrasher = function() {
	this.initialize();

	// Layer 4
	this.colissionDetector = new lib.ColissionDetector();
	this.colissionDetector.setTransform(10.1,250,1,1,0,0,0,-129.2,0);

	this.doorRight = new lib.DoorRight();
	this.doorRight.setTransform(310,250,1,1,0,0,0,69.5,0);

	this.doorLeft = new lib.DoorLeft();
	this.doorLeft.setTransform(10.1,250,1,1,0,0,0,-69.4,0);

	this.player = new lib.Player();
	this.player.setTransform(160,520);

	this.addChild(this.player,this.doorLeft,this.doorRight,this.colissionDetector);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(10,240.5,300,304.5);


// symbols:
(lib.WaitingSpot = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Player = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,0,0,0.898)").s().de(-24.9,-24.9,49.9,49.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,204,0,0.898)").s().de(-24.9,-24.9,49.9,49.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.9,-24.9,49.9,49.9);


(lib.DoorRight = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,0,0,0.898)").s().dr(-69.5,-9.5,139,19);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-69.4,-9.4,139,19);


(lib.DoorLeft = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,0,0,0.898)").s().dr(-69.5,-9.5,139,19);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-69.4,-9.4,139,19);


(lib.ColissionDetector = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,153,0.898)").s().dr(-69.5,-9.5,139,19);
	this.shape.setTransform(-129.2,0,0.14,1,0,0,0,-923.4,0);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-9.6,-9.4,19.5,19);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;