// Simple class example

function Bullet(fp, posX, posY, toPos, enemies) {
	this.fp = fp;
	this.x = posX;
	this.y = posY;
	this.color = "#999900";
	this.radius = 3;
	this.enemies = enemies;
	this.damage = 2;

	this.speed = 6;
	this.durable = 5;
	this.bounceable = true;

	this.toPos = toPos;
	this.calculateDirection();
	this.touchedEnemies = new Set();
}

Bullet.prototype.calculateDirection = function() {
	var dx = this.toPos.x - this.x;
	var dy = this.toPos.y - this.y;
	var factor = Math.sqrt((this.speed * this.speed) / (dx * dx + dy * dy));
	this.vel = {x: dx * factor, y: dy * factor};
}

Bullet.prototype.update = function() {
	this.x = this.x + this.vel.x;
	this.y = this.y + this.vel.y;

	/// check hit
	for (var i = this.enemies.length - 1; i >= 0; i--) {
		var en = this.enemies[i];
		var dx = this.enemies[i].x - this.x;
		var dy = this.enemies[i].y - this.y;
		var enemyRadiusSq = this.enemies[i].radius * this.enemies[i].radius;
		if (dx*dx <= enemyRadiusSq && dy*dy <= enemyRadiusSq) {
			if (this.touchedEnemies.has(en)) { continue; }
			this.touchedEnemies.add(en);
			this.enemies[i].hp -= this.damage;
			--this.durable;
			if (this.durable > 0 && this.bounceable) {
				var nextEn = this.enemies[Math.floor(Math.random()*this.enemies.length)];
				this.toPos = {x: nextEn.x, y: nextEn.y};
				this.calculateDirection();
			}
			break;
		}
	}


}

//A function for drawing the particle.
Bullet.prototype.drawToContext = function(theContext) {
	theContext.save();
	theContext.beginPath()
	theContext.fillStyle = this.color;
	theContext.strokeStyle = "#222200";
	theContext.lineWidth = 0.2 * this.fp;
	theContext.rect((this.x - this.radius) * this.fp, (this.y - this.radius) * this.fp, 2*this.radius*this.fp, 2*this.radius*this.fp);
	theContext.fill();
	theContext.stroke();
	theContext.closePath();
	theContext.restore();
}

Bullet.prototype.shouldDestroy = function(theContext) {
	if (this.durable <= 0) return true;
	if (this.x <= -100 * this.fp) return true;
	if (this.x >= 2000 * this.fp) return true;
	return false;
}