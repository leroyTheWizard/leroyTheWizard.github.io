/*
Prague triangle

Tried to re-create the loading screen from Deus Ex: Mankind Divided.

Inspired by Andor Saga's Hexcellent, as I used it for some reference to figure out how to cheat this effect! 
(https://www.openprocessing.org/sketch/189138)

Author:
	Jason Labbe

Site:
	jasonlabbe3d.com
*/

let pieceWidth = 40;
let pieceHeight = 40;
let widthHalf = pieceWidth/2;
let heightHalf = pieceHeight/2;

let allScale = 3;
let innerScale = 0;
let timeScale = 0; // Cycles from 0.0 to 1.0

let pieces = [];


class Triangle {


  constructor(_x, _y, _up) {

    this.pos = createVector(_x, _y);
    this.up = _up;
  }

   show() {

    if (this.up) {
      triangle(-widthHalf, heightHalf, 0, -heightHalf, widthHalf, heightHalf);
    } else {
      triangle(-widthHalf, -heightHalf, 0, heightHalf, widthHalf, -heightHalf);
    }
  }
}


function addTriangle(_x, _y, _up) {
  pieces.push(new Triangle(_x, _y, _up));
}


function setupLoading() {
  
  // Generates a big triangle made out of little triangles
  
  // 1st row
  addTriangle(-widthHalf*3, pieceHeight, true);
  addTriangle(-widthHalf*2, pieceHeight, false);
  addTriangle(-widthHalf, pieceHeight, true);
  addTriangle(0, pieceHeight, false);
  addTriangle(widthHalf, pieceHeight, true);
  addTriangle(widthHalf*2, pieceHeight, false);
  addTriangle(widthHalf*3, pieceHeight, true);

  // 2nd row
  addTriangle(-widthHalf*2, 0, true);
  addTriangle(-widthHalf, 0, false);
  addTriangle(widthHalf, 0, false);
  addTriangle(widthHalf*2, 0, true);

  // 3rd row
  addTriangle(-widthHalf, -pieceHeight, true);
  addTriangle(0, -pieceHeight, false);
  addTriangle(widthHalf, -pieceHeight, true);

  // 4th row
  addTriangle(0, -pieceHeight*2, true);
}


function drawLoading() {
  background(0);
  
  translate(width/2, height/2);
  rotate(radians(frameCount*0.35));
  scale(0.4);

  push();
  
  scale(allScale);
  allScale -= 0.01;
  if (allScale <= 1) {
    allScale = 3;
  }

  timeScale = constrain(map(allScale, 3, 1, 0, 1), 0, 1);

  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];

    push();

    translate(piece.pos.x, piece.pos.y);
    
    // Draw individual white piece
    push();
    
    let pieceScale = constrain(-0.05*i+timeScale*2, 0, 1);
    scale(pieceScale);
    
    strokeWeight(2); // Can see the shapes if it's too thin
    stroke(255, 200, 0, pieceScale*255);
    fill(255, 200, 0, pieceScale*255);
    piece.show();
    strokeWeight(1);
    
    pop();
    
    // Draw black piece to mimic outline
    push();
    
    let innerPieceScale = constrain(1.0-(-0.2*i+timeScale*4), 0, 1);
    scale(innerPieceScale);
    noStroke();
    fill(0);
    piece.show();
    
    pop();
    push();
  }

  pop();

  // Inner white
  push();
  
  innerScale = map(timeScale, 0, 1, 1, 0);

  scale(innerScale);
  
  // Big hack so that it scales at the right pivot
  if (innerScale < 0.9) {
    translate(0, (0.9-innerScale)*25);
  }
  
  noStroke();
  fill(255, 200, 0);
  triangle(-widthHalf*4, heightHalf*3, 0, -heightHalf*5, widthHalf*4, heightHalf*3);
  
  pop();

  // Inner black
  noStroke();
  fill(0);
  triangle(-widthHalf, heightHalf, 0, -heightHalf, widthHalf, heightHalf);
}