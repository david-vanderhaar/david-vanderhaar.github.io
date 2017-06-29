//Init Canvas object
var cnv;

//init array of pt objs
var ptsObj = [];

//init Title text vars
var title = "Coder + Learner",
font,
pts,
bounds,
fontsize = 40,
fontRatio = 10,
x, y;

function preload() {
  font = loadFont('../assets/Montserrat-Black.ttf');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight/2);
  cnv.parent('p5-canvas');
  // background(51);
  textFont(font);
  textSize(width/fontRatio);

  positionText();
  console.log(pts);

}

function draw () {
  clear();
  // write the text in black and get its bounding box
  fill(255);
  stroke(255);
  // text(title, x, y);
  drawText();
}

function clear() {
        context.clearRect(0, 0, width, height);
    }

function windowResized () {
  resizeCanvas(windowWidth, windowHeight/2);
  textSize(width/fontRatio);
  positionText();
}

function positionText() {
  pts = font.textToPoints(title, x, y);
  x = width / 8;
  y = height / 2;
}

function drawText() {
    pts = font.textToPoints(title,x,y);
    for (var i = 0; i < pts.length; i++) {
    ellipse(pts[i].x, pts[i].y, 2, 2);
  }
}

//-----------------------------------------------------------


