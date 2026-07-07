class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    
    this.init();
    this.animate();
    this.events();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    // Adjust density based on screen size
    const density = window.innerWidth < 768 ? 40 : 100;
    
    for (let i = 0; i < density; i++) {
      const size = Math.random() * 2 + 1; // particle size (1px to 3px)
      const x = Math.random() * (this.canvas.width - size * 2) + size;
      const y = Math.random() * (this.canvas.height - size * 2) + size;
      const directionX = (Math.random() * 0.4) - 0.2; // Slow movement
      const directionY = (Math.random() * 0.4) - 0.2;
      const color = 'rgba(0, 240, 255, ' + (Math.random() * 0.3 + 0.1) + ')'; // Neon blue with random opacity
      
      this.particles.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.canvas, this.mouse);
      this.particles[i].draw(this.ctx);
    }
    this.connectParticles();
  }

  connectParticles() {
    let opacityValue = 1;
    const maxDistance = window.innerWidth < 768 ? 80 : 120;
    
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        let dx = this.particles[a].x - this.particles[b].x;
        let dy = this.particles[a].y - this.particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          opacityValue = 1 - (distance / maxDistance);
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue * 0.08})`; // connection lines
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }

  events() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createParticles();
    });
  }
}

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.originalX = x;
    this.originalY = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00f0ff';
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow for lines
  }

  update(canvas, mouse) {
    // Check boundary collisions
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Mouse interactive effect (slow repulsion)
    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxForce = 1;
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = forceDirectionX * force * maxForce;
        const directionY = forceDirectionY * force * maxForce;
        
        this.x -= directionX;
        this.y -= directionY;
      }
    }

    // Float drift
    this.x += this.directionX;
    this.y += this.directionY;
  }
}

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});
