// Simple class example

function Enemy(fp, posX, posY) {
	this.fp = fp;
	this.x = posX;
	this.y = posY;
	this.color = "#22FF22";
	this.radius = 12;

	this.maxHp = 3;
	this.hp = this.maxHp;
	this.speed = 0.2;
}

Enemy.prototype.update = function() {
	this.x -= this.speed;
}

//A function for drawing the particle.
Enemy.prototype.drawToContext = function(theContext) {
	theContext.save();
	theContext.beginPath()
	theContext.fillStyle = this.color;
	theContext.strokeStyle = "#000000";
	theContext.lineWidth = 0.5 * this.fp;
	theContext.rect((this.x - this.radius) * this.fp, (this.y - this.radius) * this.fp, 2*this.radius*this.fp, 2*this.radius*this.fp);
	theContext.fill();
	theContext.stroke();
	theContext.closePath();
	theContext.restore();
}

Enemy.prototype.shouldDestroy = function(theContext) {
	if (this.x <= -100 * this.fp) return true;
	if (this.hp <= 0) return true;
	return false;
}