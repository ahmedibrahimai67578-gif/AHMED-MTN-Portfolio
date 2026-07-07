document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileNav();
  initCustomCursor();
  initMagneticElements();
  initScrollReveals();
  initBackToTop();
  initHoverVideoPreviews();
  initPortfolioFilters();
  initThemeToggle();
});

// 1. Page Preloader
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 600); // Small grace period for visual load
    });
  }
}

// 2. Sticky Navigation Header
function initStickyHeader() {
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// 3. Mobile Navigation Menu
function initMobileNav() {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      if (mobileNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
      });
    });
  }
}

// 4. Custom Cursor with Lerp Smoothing
function initCustomCursor() {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  
  dot.className = 'custom-cursor-dot';
  ring.className = 'custom-cursor-ring';
  
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0; // Current mouse coords
  let ringX = 0, ringY = 0;   // Lerped ring coords
  
  const speed = 0.15; // Speed multiplier for lag-behind feeling

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Set variables on document for mouse-interactive grids and gradients
    document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    
    // Position dot instantly
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  // Lerp loop for the cursor ring
  function animateRing() {
    ringX += (mouseX - ringX) * speed;
    ringY += (mouseY - ringY) * speed;
    
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Add hover effects for buttons, links and select cards
  const interactiveSelector = 'a, button, .filter-btn, .project-card, .glass-card, [data-lightbox]';
  
  document.body.addEventListener('mouseenter', (e) => {
    if (e.target.matches && e.target.matches(interactiveSelector)) {
      document.body.classList.add('hover-link');
    }
  }, true);

  document.body.addEventListener('mouseleave', (e) => {
    if (e.target.matches && e.target.matches(interactiveSelector)) {
      document.body.classList.remove('hover-link');
      document.body.classList.remove('hover-view'); // Clean up any lingering lightbox hover
    }
  }, true);

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

// 5. Magnetic Button / Link Interaction
function initMagneticElements() {
  const magnetics = document.querySelectorAll('.magnetic');
  
  if (window.innerWidth > 1024) { // Only enable on desktop
    magnetics.forEach(elem => {
      elem.addEventListener('mousemove', function(e) {
        const bound = elem.getBoundingClientRect();
        
        // Calculate relative mouse position inside the element bounds
        const x = e.clientX - bound.left - (bound.width / 2);
        const y = e.clientY - bound.top - (bound.height / 2);
        
        // Pull strength (adjustable)
        const strength = 18;
        
        elem.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
        // Slightly pull text or inner icon
        const child = elem.querySelector('.btn-icon, .magnetic-inner');
        if (child) {
          child.style.transform = `translate(${x / (strength * 0.5)}px, ${y / (strength * 0.5)}px)`;
        }
      });

      elem.addEventListener('mouseleave', function() {
        elem.style.transform = 'translate(0px, 0px)';
        const child = elem.querySelector('.btn-icon, .magnetic-inner');
        if (child) {
          child.style.transform = 'translate(0px, 0px)';
        }
      });
    });
  }
}

// 6. Scroll Trigger Reveals using Intersection Observer
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed to keep layout performant
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Reveal when 15% of target is visible
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  reveals.forEach(element => {
    observer.observe(element);
  });
}

// 7. Back To Top with Circular Scroll Progress
function initBackToTop() {
  const progressWrap = document.querySelector('.scroll-progress-wrap');
  const progressPath = document.querySelector('.scroll-progress-wrap path');
  
  if (progressWrap && progressPath) {
    const pathLength = progressPath.getTotalLength();
    
    // Set up SVG circle dashes
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    
    // Function to calculate and update stroke progress
    const updateProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      
      if (scrollPos > 150) {
        progressWrap.classList.add('active');
      } else {
        progressWrap.classList.remove('active');
      }
      
      if (scrollTotal > 0) {
        const offset = pathLength - (scrollPos * pathLength / scrollTotal);
        progressPath.style.strokeDashoffset = offset;
      }
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Run once in case page loads down scrolled
    
    progressWrap.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 8. Auto-Play Video Previews on Hover
function initHoverVideoPreviews() {
  const videoCards = document.querySelectorAll('.project-video-wrapper');
  
  videoCards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;
    
    card.addEventListener('mouseenter', () => {
      video.play().catch(error => {
        console.log("Muted video autoplay blocked: ", error);
      });
    });
    
    card.addEventListener('mouseleave', () => {
      video.pause();
      // Reset play time so it starts from beginning on next hover
      video.currentTime = 0;
    });
  });
}

// 9.5 Dark / Light Mode Toggle
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle');
  if (!toggleBtns.length) return;

  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  };

  // Sync with whatever the no-flash inline script already applied
  let currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
      try {
        localStorage.setItem('theme', currentTheme);
      } catch (e) {
        // localStorage unavailable, theme just won't persist across reloads
      }
    });
  });
}

// 9. Portfolio Filter Logic
function initPortfolioFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-grid .project-card');
  
  if (filters.length > 0 && cards.length > 0) {
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Toggle active button
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.getAttribute('data-filter');
        
        cards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 400); // Match CSS transition timing
          }
        });
      });
    });
  }
}
