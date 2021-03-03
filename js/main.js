console.log("Hello world");


function GameObject(props) {
  this.x = props.x;
  this.y = props.y;
  this.w = props.w;
  this.h = props.h;

  this.gravity = props.gravity || 0;
  this.speedX = 0;
  this.speedY = 0;

  this.render = (ctx) => {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fill();
  }

  this.update = () => {
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedY += this.gravity;
  }
}

function Game(props) {
  this.ctx = props.ctx;
  this.width = props.width;
  this.height = props.height;
  this.gameObjects = [];

  this.run = () => {

    setInterval(() => {
      this.render(this.ctx);
      this.update();
    }, 1000 / 60);

  }

  this.update = () => {
    this.gameObjects.forEach(gameObject => gameObject.update());
  }

  this.render = (ctx) => {
    ctx.clearRect(0,0,this.width,this.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.width, this.height);
    this.gameObjects.forEach(gameObject => gameObject.render(ctx));
  }

  this.addGameObject = (gameObject) => {
    this.gameObjects.push(gameObject);
  }
}

const init = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let ship = new GameObject({
    x: 100,
    y: 40,
    w: 40,
    h: 70,
    gravity: 0.05,
  });

  let game = new Game({ctx: ctx, width: canvas.width, height: canvas.height});

  game.addGameObject(ship);

  game.run();
}

init();