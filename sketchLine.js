


function setup() {
  var canvas;
  canvas = createCanvas(windowWidth, windowHeight);
//  canvas.parent('sketchHolder');
  x = 0;
  y = height;
  lineCount =  1;
  lineSpacing = 1;
  rectMode(CENTER);
  rectX = (windowWidth/2);
  rectSize = 50;
  rectLeft = 1;
  stroke('#AEAEAE');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background (52);
    if (mouseIsPressed) {
      if (mouseButton == LEFT) {
        lineCount += 1;
      }
      if (mouseButton == RIGHT) {
        lineSpacing += lineSpacing / lineCount;
      }
      if (mouseButton == CENTER){
        if (lineCount > 1) {
          lineCount -= 1;
        }
        if (lineSpacing > 2) {
          lineSpacing -= lineSpacing / lineCount;
        }
      }
    }
    y -= 1;
    /*
    if (y <= 0) {
      y = height;
    }
    */
    //line(0,y,width,y);
    //ellipse((windowWidth/2) - 20, y - 10, 5, 5);
    //ellipse((windowWidth/2) + 20, y + 10, 5, 5);
    fill('rgba(0,255,0, 0)');
    rect(rectX, y, rectSize, rectSize);


    if (rectLeft == 1) {
      rectX -= 1;
    } else if (rectLeft == 0) {
      rectX += 1;
    }

    if (rectX <= 0) {
      rectLeft = 0;
    } else if (rectX >= windowWidth ) {
      rectLeft = 1;
    }

    for (var i = 1; i <= lineCount; i++) {
       line(0,y + (i * lineSpacing),width,y + (i * lineSpacing));
       if (y + (i * lineSpacing) <= 0 - (lineCount * lineSpacing)) {
         y = height;
       }
    }
}
