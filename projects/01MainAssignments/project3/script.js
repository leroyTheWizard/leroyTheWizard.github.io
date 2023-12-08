let handpose;
let detections = [];

let canvas;
let video;

let webcamW; //the position of the hand tracking is based on the webcams size.
let webcamH;

let fingerX = 0;
let fingerY = 0;
let threshold = 0;

let posX = 0;
let posY = 0;

var itsReady = false;


function preload(){
	indexFinger = loadImage('indexFinger.png')
	normalFont = loadFont('Montserrat-Regular.ttf')
	// loadingGif = createImg('giphy.gif');
}

function setup(){
  
	canvas = createCanvas(windowWidth, windowHeight);//3D mode!!!
  	canvas.id("canvas");

	posX = 200;
	posY = height/2;

  	video = createCapture(VIDEO);
  	video.id("video");
	video.hide();

  	const options = {
    	flipHorizontal: true, // boolean value for if the video should be flipped, defaults to false
    	maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
    	detectionConfidence: 0.8, // Threshold for discarding a prediction. Defaults to 0.8.
    	scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
    	iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
  	}

  	handpose = ml5.handpose(video, options, modelReady);
}

function modelReady() {
  	console.log("Model ready!");
	itsReady = true;
	
  	handpose.on('predict', results => {
    	detections = results;
	});

  	select('#status').html('Model Loaded');

}


function draw(){

	clear();
	background(255);

	//InfoText
	push();
	rectMode(CENTER);
	fill('black');
	textAlign(CENTER, CENTER);
	textFont(normalFont);
	textSize(80);
	text('self build Hand tracking prototype', width / 2, height / 2, 800);
	pop();
	
	webcamW = video.width
	webcamH = video.height
	


  	if(detections.length > 0){
   		let position = drawLandmarks([5, 9], 120); //index finger
		//Hand Position maping on full Screen
		posX = map(position[0], 0, webcamW * 0.65, 0, width-70, true); //ml5 cant detect the right hand on the 1/4 of the right Screen
		posY = map(position[1], 50, webcamH * 0.5, 0, height-70, true); //below the half of the webcamH ml5 cant detect the hand anymore.
		
		tint(255, 255);
		threshold = 0
		
		} else {
			threshold += 1
			
			if (threshold > 30){
				posX = 200;
				posY = height/2;
				imageMode(CENTER);
				tint(255, 127);
			}
	}
	
	//Smooth motion
	let differenceX = posX - fingerX;
	let differenceY = posY - fingerY;

	fingerX += differenceX * 0.1;
	fingerY += differenceY * 0.1; 
	
	//finger draw and loading animation
	if (itsReady == true){
  		image(indexFinger,fingerX,fingerY);
		} else {
			smooth();
			noStroke();
			
			let n = 10;
			let r = 30;
			let s = 10;
			let t = -(millis()/400);
    
			for (let i = 0; i < n; i++) {
				// translate(fingerX,fingerY);
				fill(255, 255-(i/n)*128, 0);
				
				let x = posX+sin((sin(t+((i/n)*PI))/2)+t)*r;
				let y = posY+cos((sin(t+((i/n)*PI))/2)+t)*r;
				let d = (sin((i/n)*PI))*s;
				ellipse(x, y, d, d);
			}
	}
  
	
}

function drawLandmarks(indexArray, hue){
    noFill();
    strokeWeight(10);
    let x = detections[0].landmarks[8][0];
    let y = detections[0].landmarks[8][1];
    return([x, y])
}