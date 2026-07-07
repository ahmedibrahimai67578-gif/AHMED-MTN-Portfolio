class Lightbox {
  constructor() {
    this.createLightboxElements();
    this.events();
  }

  createLightboxElements() {
    // Create DOM structure
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.id = 'lightbox-modal';
    
    this.content = document.createElement('div');
    this.content.className = 'lightbox-content';
    
    this.img = document.createElement('img');
    this.img.className = 'lightbox-img';
    this.img.alt = 'Enlarged visual';
    
    this.closeBtn = document.createElement('button');
    this.closeBtn.className = 'lightbox-close';
    this.closeBtn.innerHTML = '&times;';
    this.closeBtn.ariaLabel = 'Close lightbox';
    
    this.content.appendChild(this.img);
    this.content.appendChild(this.closeBtn);
    this.lightbox.appendChild(this.content);
    document.body.appendChild(this.lightbox);
  }

  open(src) {
    this.img.src = src;
    document.body.style.overflow = 'hidden';
    this.lightbox.classList.add('active');
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Clear src after fade transition
    setTimeout(() => {
      this.img.src = '';
    }, 500);
  }

  events() {
    // Select all elements that can trigger lightbox
    const triggers = document.querySelectorAll('[data-lightbox]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const src = trigger.getAttribute('src') || trigger.getAttribute('href') || trigger.querySelector('img')?.getAttribute('src');
        if (src) {
          this.open(src);
        }
      });
      // Add visual hover hint helper classes
      trigger.addEventListener('mouseenter', () => {
        document.body.classList.add('hover-view');
      });
      trigger.addEventListener('mouseleave', () => {
        document.body.classList.remove('hover-view');
      });
    });

    // Close on overlay click (but not content click)
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox || e.target === this.closeBtn) {
        this.close();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
        this.close();
      }
    });
  }
}

// Instantiate lightbox when page is ready
document.addEventListener('DOMContentLoaded', () => {
  new Lightbox();
});
