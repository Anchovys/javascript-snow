/**
 * Snow falling
 * (C), Anchovy, 12.2019
 */

const speed = 50;		// 50 ms sleep
const snowMax = 50;     	// flakes count
const minSize = 10;		// min flake size
const maxSize = 15;     	// max flake size
const flakeSymbol = '•';  	// symbol (default - bullet (•))

var objects = [];
var documentSizes = [];

class snowObject {
	// init snow
	constructor (elementId, entity) {
		this.size = Math.floor(maxSize - minSize * Math.random()) + minSize;
		this.element = document.createElement('span');
		this.element.appendChild(document.createTextNode(entity));
		this.element.id = 'flake_' + elementId;

		this.element.style.position = 'absolute';
		this.element.style.zIndex = 100;
		this.element.style.color = '#fff';
		this.element.style.fontSize = this.size + 'px';
		this.element.style.userSelect = 'none';
		
		this.resetPosition();
		
		document.body.appendChild(this.element);
	}
	// reset position (random)
	resetPosition () {
		this.positionX = Math.floor(documentSizes[0] * Math.random());
		this.positionY = Math.random() * documentSizes[1];
		this.pos = 0;
	}
	// random move snow
	randomMove () {
		if(this.positionY > documentSizes[1] - 10 || this.positionX > (documentSizes[0] - (this.size * 2))) {
			this.resetPosition();
			this.positionY = 0;
		}
		else {
			this.pos++;
			this.positionX += 2 * Math.random() * Math.sin(this.pos);
			this.positionY += Math.random() * 10;
			
			this.element.style.left = this.positionX + 'px';
			this.element.style.top 	= this.positionY + 'px';
		}
	}
}
	// on screen resize
function resize() {
	documentSizes[0] = document.body.clientWidth;
	documentSizes[1] = document.body.scrollHeight;
}
	// move all flakes
function moveSnow() {
	for (var item in objects) {
		objects[item].randomMove();
	}

	setTimeout('moveSnow()', speed);
}
	// init snow
function init() {
	onresize(); // keep screen size
	// create all flake objects
	for (i = 0; i <= snowMax; i++) {
		objects[i] = new snowObject(i, flakeSymbol);
	}
	// starts recursive move
	moveSnow();
}

// make events
window.onresize = resize;
window.onload 	= init;
