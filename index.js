/**
 * 
 * 
 * Task #1
 * 
 * 
 */
const doc = document;

function getLastAddedCanvas() {
  const canvas = doc.querySelector('.container > canvas:first-child');
  return canvas ? canvas : null;
}

function getAllCanvases() {
  return doc.querySelectorAll('.container > canvas');
}


function addImage() {
  const container = doc.querySelector('.container');
  const canvas = doc.createElement('canvas');
  const canvasSize = 100;
  /** hide before have no iamge*/
  canvas.setAttribute("style", "display:none;")

  canvas.classList = 'canvasDiv';
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  canvas.onclick = selectImage;

  const ctx = canvas.getContext('2d');

  /** add new canvas to list*/
  container.insertBefore(canvas, getLastAddedCanvas());

  const imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(imageObj, 0, 0);
    /** show after have image */
    canvas.setAttribute("style", "display:block;")
  };
  imageObj.src = doc.querySelector("input[name='image']").value;
}

function deleteImage() {
  const element = doc.querySelector('.container > canvas.selected');
  if (confirm('Are you shure that you want to delete?')) {
    element.parentNode.removeChild(element);
  }
};

function removeSelectedClassFromAll() {
  const canvasList = getAllCanvases();
  [...canvasList].forEach((canvas) => {
    canvas.classList.remove('selected')
  })
}

function selectImage(event) {
  removeSelectedClassFromAll();
  event.target.classList.add('selected');
}

/**
 * 
 * 
 * Task #2
 * 
 * 
 */

class Figure {
  constructor() {
    this.canvasSize = 400;
    this.createNewCanvas();
  }

  renderFigure() {
    // abstract method for children
  }

  createNewCanvas() {
    this.canvas = doc.createElement('canvas');
    this.canvas.classList = 'figureDiv';
    this.canvas.width = this.canvasSize;
    this.canvas.height = this.canvasSize;
  }

  renderCanvas() {
    const figureContainer = doc.getElementById('figureContainer');

    figureContainer.appendChild(this.canvas);
  }

  getCanvasCtx() {
    return this.canvas.getContext('2d');
  }

  draw() {
    this.renderCanvas();
    this.renderFigure();
  }
}

/**
 * 
 * Rectangle
 * 
 */

class Rectangle extends Figure {
  constructor(
    positionX,
    positionY,
    style,
    width,
    height
  ) {
    super();
    // set config logic
    this.config = {
      positionX, positionY, style, width, height
    }
  }

  renderFigure() {
    const {
      positionX, positionY, style, width, height
    } = this.config;

    /** place for custom logic */
    this.renderRectangle(positionX, positionY, style, width, height);
  }

  renderRectangle(positionX, positionY, style, width, height) {
    const ctx = this.getCanvasCtx();

    ctx.strokeStyle = style;
    ctx.strokeRect(positionX, positionY, width, height)
  }
}

class FillRectangle extends Rectangle {
  renderRectangle(positionX, positionY, style, width, height) {
    const ctx = this.getCanvasCtx();

    ctx.fillStyle = style;
    ctx.fillRect(positionX, positionY, width, height)
  }
}
/**
 * 
 * Circle
 * 
 */
class Circle extends Figure {
  constructor(
    centerPositionX,
    centerPositionY,
    radius,
    style,
    start,
    end
  ) {
    super();
    // set config logic
    this.config = {
      centerPositionX, centerPositionY, radius, style, start, end
    }
  }

  renderFigure() {
    const {
      centerPositionX, centerPositionY, radius, style, start, end
    } = this.config;
    /**
     * place for custom logic 
     */
    this.renderCircle(centerPositionX, centerPositionY, radius, style, start, end);
  }

  renderCircle(centerPositionX, centerPositionY, radius, style, start, end) {
    const ctx = this.getCanvasCtx();

    ctx.fillStyle = style;
    ctx.arc(centerPositionX, centerPositionY, radius, start, end);
    ctx.stroke();
  }
}

class FilledCircle extends Circle {
  renderCircle(centerPositionX, centerPositionY, radius, style, start, end) {
    const ctx = this.getCanvasCtx();

    ctx.fillStyle = style;
    ctx.arc(centerPositionX, centerPositionY, radius, start, end)
    ctx.fill();
  }
}
/**
 * 
 * Line
 * 
 */
class Line extends Figure {
  constructor(
    beginX,
    beginY,
    style,
    lineWidth,
    closeX,
    closeY,
  ) {
    super();
    // set config logic
    this.config = {
      beginX, beginY, style, lineWidth, closeX, closeY
    }
  }

  renderFigure() {
    const {
      beginX, beginY, style, lineWidth, closeX, closeY
    } = this.config;
    /** place for custom logic  */
    this.renderLine(beginX, beginY, style, lineWidth, closeX, closeY);
  }

  renderLine(beginX, beginY, style, lineWidth, closeX, closeY) {
    const ctx = this.getCanvasCtx();
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth
    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(closeX, closeY);
    ctx.closePath();
    ctx.stroke();
  }
}



//alternative way for extends
// Object.setPrototypeOf(Rectangle.prototype, Figure.prototype);


const fillRect = new FillRectangle(10, 50, 'red', 300, 100)
fillRect.draw();
const rectangle = new Rectangle(50, 50, 'blue', 200, 200)
rectangle.draw();

const circle = new Circle(150, 150, 50, 'blue', 0, Math.PI * 2)
circle.draw();
const filledCircle = new FilledCircle(150, 150, 50, 'blue', 0, Math.PI * 2)
filledCircle.draw();

const line = new Line(150, 150, 'orange', 10, 350, 150);
line.draw();