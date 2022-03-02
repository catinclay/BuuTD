// Simple class example

function Wall(fp, posX, height) {
	this.fp = fp;
	this.x = posX;
	this.height = height;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.color = "#000000";
	this.radius = 1;
}

//A function for drawing the particle.
Wall.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.color;
	theContext.fillRect((this.x - this.radius) * this.fp, 0, 2*this.radius*this.fp, this.height*this.fp);
}

Wall.prototype.shouldDestroy = function(theContext) {
	return false;
}