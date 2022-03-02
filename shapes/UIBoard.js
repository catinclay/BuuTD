// Simple class example

function UIBoard(fp, hero, canvasWidth, canvasHeight, bgHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.bgHeight = bgHeight;
	this.height = this.canvasHeight - this.bgHeight;
	this.hpHeight = this.height/15;
	this.hpWidth = this.canvasWidth*29/30;
	this.hero = hero;
}

UIBoard.prototype.update = function() {

}


//A function for drawing the particle.
UIBoard.prototype.drawToContext = function(theContext) {
	theContext.save();
	/// draw boarder
	theContext.beginPath()
	theContext.strokeStyle = "#000000";
	theContext.lineWidth = 2 * this.fp;
	theContext.rect(0, this.bgHeight, this.canvasWidth, this.height);
	theContext.fillStyle = "#FFFFFF";
	theContext.fill();
	theContext.stroke();
	theContext.closePath();
	
	/// draw hp
	theContext.fillStyle = "#FF0000";
	theContext.fillRect((this.canvasWidth - this.hpWidth)/2, this.bgHeight + this.height/10, this.hpWidth * this.hero.hp/this.hero.maxHp, this.hpHeight);

	/// draw hp box
	theContext.beginPath()
	theContext.strokeStyle = "#000000";
	theContext.lineWidth = 2 * this.fp;
	theContext.rect((this.canvasWidth - this.hpWidth)/2, this.bgHeight + this.height/10, this.hpWidth, this.hpHeight);
	theContext.stroke();
	theContext.closePath();



	theContext.restore();
}

UIBoard.prototype.shouldDestroy = function(theContext) {
	return false;
}