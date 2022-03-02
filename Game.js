function Game(){}

Game.prototype.init = function(fp, canvasWidth, canvasHeight, imageManager, soundManager){
	this.fp = fp;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.imageManager = imageManager;
	this.soundManager = soundManager;

	this.initGame();
}

Game.prototype.initGame = function() {
	this.bgHeight = this.canvasHeight *4/5;
	this.drawables = [];
	this.particles = [];
	this.drawables.push(this.particles);
	this.wallX = this.canvasWidth/9;

	this.bullets = [];
	this.enemies = [];
	this.hero = new Hero(this.fp, this.bullets, this.enemies, this.wallX, this.canvasWidth/15, this.bgHeight/2);
	this.wall = new Wall(this.fp, this.wallX, this.bgHeight);
	
	this.uiBoard = new UIBoard(this.fp, this.hero, this.canvasWidth, this.canvasHeight, this.bgHeight);

	/// layers
	this.drawables.push([this.wall]);
	this.drawables.push(this.enemies);
	this.drawables.push(this.bullets);
	this.drawables.push([this.hero]);
	this.drawables.push([this.uiBoard]);

	this.timer = 0;
}

Game.prototype.update = function() {
	++this.timer;
	if (this.timer%90 == 0) {
		this.enemies.push(new Enemy(this.fp, this.canvasWidth * 1.01, Math.random() * this.bgHeight * 0.9 + this.bgHeight * 0.05));
	}
	for (var i = this.enemies.length - 1; i >= 0; i--) {
		this.enemies[i].update();
	}

	this.hero.update();
	for (var i = this.bullets.length - 1; i >= 0; i--) {
		this.bullets[i].update();
	}
	this.uiBoard.update();
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}

Game.prototype.inputDownListener = function(touchX, touchY) {
	this.hero.updateAim({x: touchX, y: touchY});

	// if(Math.random()>0.5){
	// 	this.particles.push(new SimpleSquareParticle(this.fp, touchX, touchY));
	// }else{
	// 	this.particles.push(new SimpleImageParticle(this.fp, touchX, touchY, imageManager.get("flightImage")));
	// }
	// this.soundManager.play("failedSound");
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
}

Game.prototype.inputUpListener = function(touchX, touchY) {
}