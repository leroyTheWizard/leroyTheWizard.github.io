let n, r;
let t;
function setup() {
    createCanvas(250, 250);
    smooth();
    noStroke();
    
    n = 20;
    r = 40;
}

function draw() {
	background(0)
    t = -(millis()/500);
    
    for (let i = 0; i < n; i++) {
        fill(255, 255-(i/n)*128, 0);
        
        let x = (width/2)+sin((sin(t+((i/n)*PI))/2)+t)*r;
        let y = (height/2)+cos((sin(t+((i/n)*PI))/2)+t)*r;
        let d = (sin((i/n)*PI))*4;
        ellipse(x, y, d, d);
    }
}