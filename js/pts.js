var bugObj = [];
//var xGrid = [];
//var yGrid = [];

function setup() {
  //createCanvas(500,500);
  var canvas;
  canvas = createCanvas(windowWidth, windowHeight);
    // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
    // canvas.parent('sketch');
  //background(51);
  stroke(255);
  noFill();
  fill(38);
  spacing = 80;
  spacingMin = 1;
  bugSpeedCap = .3;
  intersectDist = 90;
  intersectDistMin = 10;
  intersectDistMax = 100;
  bezDis = 10;
  for (var j = 0; j < height/spacing; j++){
    for (var i = 0; i < width/spacing; i++){
      //xGrid.push(i * spacing);
      //yGrid.push(j * spacing);
      bugObj.push(new Bug(i * spacing, j * spacing, i, j, bugObj.length));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bugObj = [];
  for (var j = 0; j < height/spacing; j++){
    for (var i = 0; i < width/spacing; i++){
      //xGrid.push(i * spacing);
      //yGrid.push(j * spacing);
      bugObj.push(new Bug(i * spacing, j * spacing, i, j, bugObj.length));
    }
  }
}

function clear() {
        context.clearRect(0, 0, width, height);
    }

function draw() {
  //background(51);
  clear();

  for (var i = 0; i < bugObj.length; i++){
    bugObj[i].move();
    //bugObj[i].reset();
    for (var j = 0; j < bugObj.length; j++){
      if ( i != j && bugObj[i].intersects(bugObj[j])){
        line(bugObj[i].x, bugObj[i].y, bugObj[j].x, bugObj[j].y);
        //bezier(bugObj[i].x,bugObj[i].y,bugObj[j].x,bugObj[j].y,bugObj[i].x - bezDis, bugObj[i].y + bezDis,bugObj[j].x + bezDis, bugObj[j].y - bezDis)
        //rect(bugObj[i].x, bugObj[i].y, bugObj[j].x, bugObj[j].y);
        //ellipse(bugObj[i].x, bugObj[i].y, bugObj[j].x, bugObj[j].y);

      }
    }

    if (bugObj[i].mouseMagnet()) {
      //moveOnMouse
      /*
      bugObj[i].x = lerp(bugObj[i].x, mouseX + (bugObj[i].r/2 * Sign((mouseX - width/2))), .0125);
      bugObj[i].y = lerp(bugObj[i].y, mouseY + (bugObj[i].r/2 * Sign((mouseY - height/2))), .0125);
      */
      //increaseSizeOnMouse
      bugObj[i].ellSize = lerp(bugObj[i].ellSize, bugObj[i].ellSizeMax, .25);
    } else {
      bugObj[i].ellSize = lerp(bugObj[i].ellSize, bugObj[i].ellSizeMin, .0125);
    }

    bugObj[i].display();
  }
}

   function Sign(value) {
    if (value > 0) {
      return 1;
    } else if (value < 0) {
      return -1;
    } else {
      return 0;
    }
  }

  function Bug (homeX, homeY, bugIdI, bugIdJ, bugId) {
    this.x = homeX;
    this.y = homeY;
    var dirX = random(-bugSpeedCap, bugSpeedCap);
    var dirY = random(-bugSpeedCap, bugSpeedCap);
    this.r = intersectDist;
    this.ellSize = 4;
    this.ellSizeMin = 4;
    this.ellSizeMax = 10;
    //this.r = random(intersectDistMin, intersectDistMax);
    this.move = function() {
      this.x += dirX;
      this.y += dirY;
      if (this.x >= width) {
        this.x = 0;
      }
      if (this.y >= height) {
        this.y = 0;
      }

    }
    this.reset = function() {
      if (mouseIsPressed) {
        if (mouseButton == LEFT){
          this.x = homeX;
          this.y = homeY;
        }
      }
    }

    this.intersects = function(other) {
      if (dist(this.x, this.y, other.x, other.y) < (this.r)) {
        //line(this.x, this.y, other.x, other.y);
        return true;
      } else {
        return false;
      }
    }

    this.mouseMagnet = function() {
      if (dist(this.x, this.y, mouseX, mouseY) < (this.r)) {
        //line(this.x, this.y, other.x, other.y);
        return true;
      } else {
        return false;
      }
    }

    this.display = function() {
      point(this.x, this.y);
      ellipse(this.x, this.y, this.ellSize, this.ellSize);
    }
  }