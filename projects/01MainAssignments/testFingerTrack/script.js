let handpose;
let detections = [];

let canvas;
let video;

let webcamW; //the position of the hand tracking is based on the webcams size.
let webcamH;

let posX = 0;
let posY = 0;
let fingerX = 0;
let fingerY = 0;
let threshold = 0;

let itsReady = false;


function preload(){
	indexFinger = loadImage('indexFinger1.png')
	// loadingGif = createImg('giphy.gif');
}

function setup(){
  
	canvas = createCanvas(windowWidth, windowHeight);//3D mode!!!
  canvas.id("canvas");

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
    //console.log(detections);
  });

  select('#status').html('Model Loaded');

}


function draw(){
	if (itsReady == true){
		background(0)
	}
	
	webcamW = video.width
	webcamH = video.height
	
  clear();

  if(detections.length > 0){
   let position = drawLandmarks([5, 9], 120); //index finger
		//Hand Position maping on full Screen
		posX = map(position[0], 0, webcamW * 0.65, 0, width-70, true); //ml5 cant detect the right hand on the 1/4 of the right Screen
		posY = map(position[1], 50, webcamH * 0.5, 0, height-70, true); //below the half of the webcamH ml5 cant detect the hand anymore.
		console.log(height)
		console.log(posY)
		
		tint(255, 255);
		threshold = 0
		
		} else {
			threshold += 1
			
			if (threshold > 30){
				posX = 200;
				posY = height/2;
				tint(255, 127);
				}
			}
	
	//Smooth motion
	let differenceX = posX - fingerX;
	let differenceY = posY - fingerY;

	fingerX += differenceX * 0.1;
	fingerY += differenceY * 0.1; 
	
	if (itsReady == true){
		indexFinger.resize(70,70);
  	image(indexFinger,fingerX,fingerY);
		//console.log(webcamW,webcamH)
		} else {
			//loadingGif.resize(70,70);
			//loadingGif.position(200, height/2);
		}
  
	
}

function drawLandmarks(indexArray, hue){
    noFill();
    strokeWeight(10);
        let x = detections[0].landmarks[8][0];
        let y = detections[0].landmarks[8][1];
        //let z = detections[0].landmarks[8][2];
        stroke(hue, 40, 255);
      	point(x, y);
      return([x, y])
  }