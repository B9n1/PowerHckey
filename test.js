var myGamePiece;

function startGame() {
  myGamePiece = new Puck(30, 225, 225, 2);
  myWalls = new Walls("green");
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};
function Walls(color) {
  this.width = 100;
  this.height = 10;
  this.x = 0;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, this.width, this.height);
  };
  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}

function drawPlayer(x, y, color, scale = 15) {
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 6);
  ctx.lineTo(1, 6);
  ctx.lineTo(1, 1);
  ctx.lineTo(5, 1);
  ctx.lineTo(5, 6);
  ctx.lineTo(6, 6);
  ctx.lineTo(6, 0);
  ctx.fill();
  ctx.resetTransform();
  ctx.closePath();
}
function drawPuck(x, y, radius) {
  const startAngle = 0;
  ctx.fillStyle = "#2C2C2E";
  let endAngle = Math.PI * 2;
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, radius, startAngle, endAngle, true);
  ctx.fill();
  ctx.resetTransform();
  ctx.closePath();
}
function Puck(radius, x, y, speed, type) {
  this.type = type;
  this.radius = radius;
  this.speed = speed;
  this.angle = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.save();
    drawPuck(this.x, this.y, this.radius);
    /*
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    */
    ctx.restore();
  };

  this.newPos = function () {
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  };
  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.radius;
    var mytop = this.y;
    var mybottom = this.y + this.radius;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}

function updateGameArea() {
  if (myGamePiece.crashWith(myObstacle)) {
    myGameArea.stop();
  } else {
    myGame;
    myGameArea.clear();
    myWalls.update();
    myGamePiece.newPos();
    myGamePiece.update();
  }
}
