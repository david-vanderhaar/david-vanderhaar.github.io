var bugObj = [];
//var xGrid = [];
//var yGrid = [];

function setup() {
  //createCanvas(500,500);
  var canvas;
  canvas = createCanvas(windowWidth, windowHeight);
  //background(51);
  stroke(38);
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
    /*
  console.log(spacing);
  if (mouseIsPressed) {
    if (mouseButton == LEFT){
      //spacing += 1;
      intersectDist += 1;
    }
    if (mouseButton == RIGHT){
      intersectDist -= 1;
    }
  }

  if (spacing <= spacingMin) {
    spacing = spacingMin;
  }

  if (intersectDist < intersectDistMin) {
    intersectDist = intersectDistMin;
  }
  if (intersectDist > intersectDistMax) {
    intersectDist = intersectDistMax;
  }
  */
  /*
  for (var j = 0; j < height/spacing; j++){
    for (var i = 0; i < width/spacing; i++){
      point(i * spacing, j * spacing);
    }
  }
  */

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
    bugObj[i].display();
  }
}

  function Bug (homeX, homeY, bugIdI, bugIdJ, bugId) {
    this.x = homeX;
    this.y = homeY;
    var dirX = random(-bugSpeedCap, bugSpeedCap);
    var dirY = random(-bugSpeedCap, bugSpeedCap);
    this.r = intersectDist;
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
      /*
      for (var j = 0; j < height/spacing; j++){
        for (var i = 0; i < width/spacing; i++){
          if (bugIdI == i && bugIdJ == j){
          this.x = i * spacing;
          this.y = j * spacing;
          }
          //point(i * spacing, j * spacing);
        }
      }
      */
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

    this.display = function() {
      point(this.x, this.y);
      ellipse(this.x, this.y, 4, 4);
    }
  }
