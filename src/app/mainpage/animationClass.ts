export class Effect {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  particles: Particle[];
  numberOfParticles: number;
  mouse: {
    x: number;
    y: number;
    pressed: boolean;
    radius: number;
  };
  maxDistance: number;
  debug: boolean;
  element: DOMRect;
  canvasSize: DOMRect;
  heading: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  constructor(canvas: any, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 400;
    this.createParticles();
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      pressed: false,
      radius: 120,
    };
    this.maxDistance = 80;
    this.debug = false;
    this.element = document
      .getElementById('caption')
      ?.getBoundingClientRect() as DOMRect;
    this.canvasSize = this.canvas.getBoundingClientRect();
    this.heading = {
      x: this.element.x - this.canvasSize.x,
      y: this.element.y - this.canvasSize.y + 60,
      width: this.element.width,
      height: this.element.height,
    };

    window.addEventListener('keydown', (e) => {
      if (e.key === 'd') {
        this.debug = !this.debug;
      }
    });
    window.addEventListener('resize', (e: any) => {
      if (e.target) {
        this.resize(e.target.innerWidth, e.target.innerHeight);
      }
    });
    window.addEventListener('mousemove', (e) => {
      if (this.mouse.pressed) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }
    });
    window.addEventListener('mousedown', (e) => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    window.addEventListener('mouseup', () => {
      this.mouse.pressed = false;
    });
  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles() {
    this.connectParticles();
    this.particles.forEach((particle) => {
      particle.draw(this.context);
      particle.update();
    });
    if (this.debug) {
      this.context.strokeRect(
        this.heading.x + 5,
        this.heading.y,
        this.heading.width + 5,
        this.heading.height
      );
    }
  }

  connectParticles() {
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < this.maxDistance) {
          this.context.save();
          const opacity = 1 - distance / this.maxDistance;
          this.context.globalAlpha = opacity;
          this.context.beginPath();
          this.context.moveTo(this.particles[a].x, this.particles[a].y);
          this.context.lineTo(this.particles[b].x, this.particles[b].y);
          this.context.stroke();
          this.context.restore();
        }
      }
    }
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.element = document
      .getElementById('caption')
      ?.getBoundingClientRect() as DOMRect;
    this.canvasSize = this.canvas.getBoundingClientRect();
    this.heading = {
      x: this.element.x - this.canvasSize.x,
      y: this.element.y - this.canvasSize.y + 60,
      width: this.element.width,
      height: this.element.height,
    };
    const gradient = this.context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'darkblue');
    gradient.addColorStop(0.5, 'blue');
    gradient.addColorStop(1, 'orangered');
    this.context.fillStyle = gradient;
    this.context.strokeStyle = gradient;
    this.particles.forEach((particle) => {
      particle.reset();
    });
  }
}

export class Particle {
  effect: any;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  friction: number;
  width: number;
  height: number;
  pushX: number;
  pushY: number;

  constructor(effect: any) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 7 + 1);
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = -610 + Math.random() * this.effect.height * 0.5;
    this.vx = Math.random() * 2 - 1;
    this.vy = 0;
    this.gravity = this.radius * 0.001;
    this.friction = 0.8;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.pushX = 0;
    this.pushY = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    if (this.effect.debug) {
      context.strokeRect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
    }
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.y > this.effect.height + this.radius + this.effect.maxDistance ||
      this.x < -this.radius - this.effect.maxDistance ||
      this.x > this.effect.width + this.radius + this.effect.maxDistance
    ) {
      this.reset();
    }
    // collision detection
    if (
      this.x - this.radius <
        this.effect.heading.x + this.effect.heading.width &&
      this.x - this.radius + this.width > this.effect.heading.x &&
      this.y - this.radius < this.effect.heading.y + 5 &&
      this.height + this.y - this.radius > this.effect.heading.y
    ) {
      this.vy *= -0.9;
      this.y = this.effect.heading.y - this.radius;
    }
    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = this.effect.mouse.radius / distance;
      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;
      }
    }
    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;


  }

  reset() {
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      -this.radius -
      this.effect.maxDistance -
      Math.random() * this.effect.height * 0.2;
    this.vy = 0;
    this.vx = Math.random() * 2 - 1;
  }
}
