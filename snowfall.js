/**
 * Snow falling
 * (C), Anchovy, 12.2019
 */

const snowMax = 50;
var snowEntity = "•";

var objects = [];
var documentSizes = [];

class snowObject {
	// init snow
	constructor (elementId, entity) {
		this.size = Math.floor(5 * Math.random()) + 10;
		this.element = document.createElement("span");
		this.element.appendChild(document.createTextNode(entity));
		this.element.id = "flake_" + elementId;

		this.element.style.position = 'absolute';
		this.element.style.zIndex = 100;
		this.element.style.color = "#fff";
		this.element.style.fontSize = this.size + "px";

		this.resetPosition();

		document.body.appendChild(this.element);
	}

	resetPosition () {
		this.positionX = Math.floor(documentSizes[0] * Math.random());
		this.positionY = Math.random() * documentSizes[1];
		this.pos = 0;
	}

	randomMove () {

		this.pos++;
		this.positionX += 2 * Math.random() * Math.sin(this.pos);
		this.positionY += Math.random() * 10;

		this.element.style.left = this.positionX + "px";
		this.element.style.top 	= this.positionY + "px";

		if(this.positionY > documentSizes[1] - 100 || this.positionX < 0 || this.positionX > (documentSizes[0] - (this.size * 2))) {
			this.pos = 0;
			this.positionY = 0;
		}
	}
}

function resize() {

	documentSizes[0] = document.body.clientWidth;
	documentSizes[1] = document.body.scrollHeight;

}

function moveSnow() {
	for (var item in objects) {
			objects[item].randomMove();
	}

	setTimeout("moveSnow()", 50);
}

function init() {
	onresize();

	for (i = 0; i <= snowMax; i++) {
		objects[i] = new snowObject(i, '•');

	}

	moveSnow();
}


window.onresize = resize;
window.onload 	= init;
