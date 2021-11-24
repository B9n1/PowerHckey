function distance(x1, y1, x2, y2) {
  let dx = x1 - x2;
  let dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

window.onload = function () {
  let canvas = document.getElementById("canvas"); // HTML-Element
  canvas.width = window.innerWidth; // Vollbild
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d"); // Grafik-Objekt

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

  function createPuck(x, y, radius) {
    this.radius = radius;
    this.speed = 1;
    this.x = x;
    this.y = y;
    this.update = function () {
      ctx = myGameArea.context;
      ctx.save();
      drawPuck(x, y);
      ctx.restore();
    };
    this.newPos = function () {
      this.x += this.speed * Math.sin(this.angle);
      this.y -= this.speed * Math.cos(this.angle);
    };
  }
  function drawRect(x, y, width, height, color, health) {
    ctx.beginPath();
    ctx.fillStyle = "#2C2C2E";
    ctx.textAlign = "center";
    ctx.fillRect(x, y, width, height);
    ctx.fill();
    let fontSize = height * 0.5;
    ctx.font = (fontSize | 0) + "px Arial";
    ctx.fillStyle = color;
    ctx.fillText(health, x + width / 2, y + height / 2 + fontSize / 3);
    ctx.fill();
    ctx.resetTransform();
    ctx.closePath();
  }
  function drawWall(x, y, width, height, health) {
    let color;
    if (health > 50) {
      color = "#2AA146";
      drawRect(x, y, width, height, color, health);
    } else if (health <= 50 && health > 25) {
      color = "#F8D034";
      drawRect(x, y, width, height, color, health);
    } else if (health <= 25 && health > 0) {
      color = "#E40027";
      drawRect(x, y, width, height, color, health);
    } else {
      return 0;
    }
  }
  /////////////////////////////////////////////////////
  // Mulit Touch Event Listener
  let fingers = [];

  canvas.addEventListener(
    "touchstart",
    (evt) => {
      evt.preventDefault();
    },
    true
  );
  canvas.addEventListener(
    "touchmove",
    (evt) => {
      evt.preventDefault();
    },
    true
  );
  canvas.addEventListener(
    "touchend",
    (evt) => {
      evt.preventDefault();
    },
    true
  );
  ///////////////////////////////////////
  // Zeichen-Funktion
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(400, 400, "blue");
    drawWall(30, 90, 200, 100, 20);
    createPuck(600, 600, 50);
    Puck = new component(30, 30, "red", 225, 225);
    requestAnimationFrame(draw);
  }
  draw();
};
