let letters;
let lightSwitch;
let bulb;
let text;
let bulbTexture;
let brickTexture;
let mainSwitch = false;


function preload(){
	letters = loadModel('IAD.obj');
	lightSwitch = loadModel('lightSwitch.obj');
	bulb = loadModel('finalBulb.obj');
	pictureFrame = loadModel('pictureFrame.obj');
	searchPicture = loadImage('searchPicture.png');
	bricks = loadImage('brickwall.jpg');
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);	
	
	//Text find Switch
	text = createGraphics(400, 200);
  text.background(255); // White background
  text.fill(0); // Black text
  text.textAlign(CENTER, CENTER);
  text.textSize(20);
  text.text("Search the Switch", text.width / 2, text.height / 2);

	//Bulb Textur
	bulbTexture = createGraphics(50, 50);
  bulbTexture.background(255,255,0); // yellow
}
function draw() {
  background(0);
	
	
	if (mouseX >= 0.9 * width && mouseY <= 0.3 * height){
		mainSwitch = true;
	} else {
		mainSwitch = false;
	}

	
	//Location of the Mouse
	let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
	
	// Light Source
	//directionalLight(250, 250, 250, 0, 0, -1);
	
	// Flash Light
	if (frameCount > 120){
  spotLight(255, 250, 255, locX, locY, 1000, 0, 0, -1, Math.PI*3);
	}
	
	// Hint Light
	if (frameCount <= 120){
	spotLight(255, 250, 255, -0.5*width, -250, 1000, 0, 0, -1, Math.PI*3);
	}
	
	// Final Light
	if (mainSwitch == true){
		//directionalLight(250, 250, 250, 0, 1, 0)
		pointLight(250, 250, 0, 0, -(height/2)*0.7, 120)
	}

	//Bulb
	angleMode(DEGREES);
	noStroke();
	
	push();
		translate(0, -(height/2)*0.7, 100);
		rotateZ(90)
		rotateY(180)
		scale(1)
		//texture(bulbTexture)
		if (mainSwitch == true){
			emissiveMaterial(255,240,0)
		}
		model(bulb);
	pop();
	
	//Letters
	push();
		translate(-400, 150, 0);
		rotateX(180);
		//rotateY(30)
		scale(13);
		specularMaterial(250)
		shininess(100)
		model(letters);
	pop();
	
	//Switch
	push();
		translate(width/2, -height/4,-200);
		//rotateZ(180);
		//rotateX(180);
		scale(2);
		if (mainSwitch == true){
			rotateZ(180);
			translate(-50,-1,0)
		}
		model(lightSwitch);
	pop();
	
	//Picture Frame
	push();
		translate(-width/2, -height/4,-200);
		ambientMaterial(255)
		//rotateX(180);
		//rotateY(30)
		scale(4);
		model(pictureFrame);
	pop();
	
	push();
		texture(searchPicture)
		translate(-width/2, -height/3,-197);
		scale(0.35)
		plane(1000, 800)
	pop();

	//Background
	push();
		translate(0, 0,-200);
		texture(bricks)
		plane(2*width, 2*height)
	pop();

	//Floor
	push();
		translate(0, 200,-50);
		rotateX(-90);
		plane(100, 100)
	pop();
}
