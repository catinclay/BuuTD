// Simple class example

function Hero(fp, bullets, enemies, wallX, posX, posY) {
	this.fp = fp;
	this.x = posX;
	this.y = posY;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.color = "#FF0000";
	this.radius = 15;

	this.wallX = wallX;
	this.bullets = bullets;
	this.enemies = enemies;

	this.maxHp = 1000;
	this.hp = 1000;

	this.aimPos = {x: this.x + 200, y: this.y};
	this.aimRaduis = 10;

	this.fireTimer = 0;
	this.fireRate = 90;
}

Hero.prototype.updateAim = function(pos) {
	if (pos.x >= this.wallX) {
		this.aimPos.x = pos.x;
	} else {
		this.aimPos.x = this.wallX;
	}

	this.aimPos.y = pos.y;
}


Hero.prototype.update = function() {
	++this.fireTimer;
	if (this.fireTimer >= this.fireRate) {
		this.fireTimer = 0;
		this.bullets.push(new Bullet(this.fp, this.x, this.y, this.aimPos, this.enemies));
	}
}

//A function for drawing the particle.
Hero.prototype.drawToContext = function(theContext) {
	theContext.save();
	/// draw hero
	
	theContext.beginPath();
	theContext.arc(this.x, this.y, this.radius * this.fp, 0, 2 * Math.PI);
	theContext.fillStyle = this.color;
	theContext.fill();
	theContext.strokeStyle = "#000000";
	theContext.lineWidth = 1 * this.fp;
	theContext.stroke();
  	

  	/// draw aim
  	theContext.strokeStyle = "#666600";
  	theContext.lineWidth = 4;
  	theContext.beginPath();
  	theContext.moveTo((this.aimPos.x - this.aimRaduis) * this.fp, (this.aimPos.y - this.aimRaduis) * this.fp);
  	theContext.lineTo((this.aimPos.x + this.aimRaduis) * this.fp, (this.aimPos.y + this.aimRaduis) * this.fp);
  	theContext.moveTo((this.aimPos.x - this.aimRaduis) * this.fp, (this.aimPos.y + this.aimRaduis) * this.fp);
  	theContext.lineTo((this.aimPos.x + this.aimRaduis) * this.fp, (this.aimPos.y - this.aimRaduis) * this.fp);
  	theContext.stroke();
  	theContext.closePath();

  	theContext.restore();

}

Hero.prototype.shouldDestroy = function(theContext) {
	return false;
}