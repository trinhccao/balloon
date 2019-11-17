'use strict';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const colors = [
  '#e67e22',
  '#e74c3c',
  '#34495e',
  '#1abc9c',
  '#27ae60',
  '#16a085',
  '#ecf0f1'
];
var balloons = [];

function Balloon(dx, dy, radius, color) {
  this.context = ctx;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.maxRadius = 15;
  this.increaseStep = 1;
  this.render = function() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.dx, this.dy, this.radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
  };
  this.update = function() {
    this.radius += this.increaseStep;
    if (this.radius > this.maxRadius) {
      if (this.radius - this.increaseStep < this.maxRadius) this.radius = this.maxRadius;
      else balloons.splice(balloons.indexOf(this), 1);
    }
  };
}

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function addBalloon(evt) {
  let dx = evt.clientX - canvas.offsetLeft;
  let dy = evt.clientY - canvas.offsetTop;
  balloons.push(new Balloon(dx, dy, 0, randomColor()));
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balloons.length; i++) {
    balloons[i].render();
    balloons[i].update();
  }
  requestAnimationFrame(animate);
}

window.onload = function() {
  canvas.style = 'background-color: #95a5a6';
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  canvas.addEventListener('mousemove', addBalloon);
  canvas.addEventListener('click', addBalloon);
  canvas.oncontextmenu = function() {return false};
  animate();
};