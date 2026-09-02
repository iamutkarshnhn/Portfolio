/**
 * KUMAR UTKARSH - EXECUTIVE ENTERPRISE PORTFOLIO JAVASCRIPT
 * High-Precision, Zero External Dependencies, 60fps Native Performance
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DYNAMIC MOUSE SPOTLIGHT EFFECT
  // ------------------------------------------------------------------------
  const glassCards = document.querySelectorAll('.glass-card');

  const handleSpotlight = (e) => {
    glassCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });
  };

  window.addEventListener('mousemove', handleSpotlight, { passive: true });

  // ------------------------------------------------------------------------
  // 1B. THEME TOGGLE (LIGHT MODE & DARK MODE)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light';
      const targetTheme = isCurrentlyLight ? 'dark' : 'light';
      
      applyTheme(targetTheme);
      try {
        localStorage.setItem('theme', targetTheme);
      } catch (e) {}

      // Tactile animation click feedback
      themeToggleBtn.style.transform = 'scale(0.85) rotate(15deg)';
      setTimeout(() => {
        themeToggleBtn.style.transform = '';
      }, 200);
    });
  }

  // ------------------------------------------------------------------------
  // 2. CERTIFICATES LIGHTBOX DATABASE (5 ORIGINAL VERIFIED PNG IMAGES)
  // ------------------------------------------------------------------------
  const CERTIFICATES_DATA = {
    'deloitte-analytics': {
      title: 'Deloitte • Data Analytics Job Simulation',
      imageSrc: 'assets/certificates/deloitte-data-analytics.png',
      alt: 'Deloitte Data Analytics Job Simulation Certificate - Kumar Utkarsh',
      verifyUrl: 'https://www.theforage.com',
      verifyCode: 'tXpZryiWPA7vsLEX4'
    },
    'tata-genai': {
      title: 'TATA • GenAI Powered Data Analytics Job Simulation',
      imageSrc: 'assets/certificates/tata-genai-analytics.png',
      alt: 'TATA GenAI Powered Data Analytics Job Simulation Certificate - Kumar Utkarsh',
      verifyUrl: 'https://www.theforage.com',
      verifyCode: '6a53c49d622c48f2807113fc'
    },
    'infosys-python-1': {
      title: 'Infosys Springboard • Programming Fundamentals using Python - Part 1',
      imageSrc: 'assets/certificates/infosys-python-1.png',
      alt: 'Infosys Springboard Python Part 1 Certificate - Kumar Utkarsh',
      verifyUrl: 'https://verify.onwingspan.com',
      verifyCode: 'Wingspan Verified (July 17, 2026)'
    },
    'infosys-python-2': {
      title: 'Infosys Springboard • Programming Fundamentals using Python - Part 2',
      imageSrc: 'assets/certificates/infosys-python-2.png',
      alt: 'Infosys Springboard Python Part 2 Certificate - Kumar Utkarsh',
      verifyUrl: 'https://verify.onwingspan.com',
      verifyCode: 'Wingspan Verified (July 18, 2026)'
    },
    'infosys-cybersecurity': {
      title: 'Infosys Springboard • Introduction to Cyber Security',
      imageSrc: 'assets/certificates/infosys-cyber-security.png',
      alt: 'Infosys Springboard Cyber Security Certificate - Kumar Utkarsh',
      verifyUrl: 'https://verify.onwingspan.com',
      verifyCode: 'Wingspan Verified (March 24, 2026)'
    }
  };

  const certLightbox = document.getElementById('cert-lightbox');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxDismissBtn = document.getElementById('lightbox-dismiss-btn');
  const lightboxPrintBtn = document.getElementById('lightbox-print-btn');
  const lightboxVerifyBtn = document.getElementById('lightbox-verify-btn');
  const lightboxFullLink = document.getElementById('lightbox-full-link');
  const lightboxTitle = document.getElementById('lightbox-cert-title');
  const lightboxImg = document.getElementById('lightbox-cert-img');

  const openCertLightbox = (certKey) => {
    const cert = CERTIFICATES_DATA[certKey];
    if (!cert || !certLightbox) return;

    if (lightboxTitle) lightboxTitle.textContent = cert.title;
    if (lightboxImg) {
      lightboxImg.src = cert.imageSrc;
      lightboxImg.alt = cert.alt;
    }
    if (lightboxVerifyBtn) lightboxVerifyBtn.setAttribute('href', cert.verifyUrl);
    if (lightboxFullLink) lightboxFullLink.setAttribute('href', cert.imageSrc);

    certLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCertLightbox = () => {
    if (certLightbox) {
      certLightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Delegated click listener for certificate buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.view-cert-trigger');
    if (trigger) {
      e.preventDefault();
      const certId = trigger.getAttribute('data-cert-id');
      if (certId) openCertLightbox(certId);
    }
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeCertLightbox);
  if (lightboxDismissBtn) lightboxDismissBtn.addEventListener('click', closeCertLightbox);
  if (certLightbox) {
    certLightbox.addEventListener('click', (e) => {
      if (e.target === certLightbox) closeCertLightbox();
    });
  }

  if (lightboxPrintBtn) {
    lightboxPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certLightbox && certLightbox.classList.contains('active')) {
      closeCertLightbox();
    }
  });

  // ------------------------------------------------------------------------
  // 3. INTERACTIVE SKILLS FILTERING
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-interactive-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 4. ASTRATUNE AUDIO PLAYBACK SIMULATION
  // ------------------------------------------------------------------------
  const demoPlayBtn = document.getElementById('demo-play-btn');
  const waveformBars = document.querySelectorAll('.wave-bar');
  let isPlaying = true;

  if (demoPlayBtn) {
    demoPlayBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        demoPlayBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
        waveformBars.forEach(b => {
          b.style.animationPlayState = 'running';
        });
      } else {
        demoPlayBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
        waveformBars.forEach(b => {
          b.style.animationPlayState = 'paused';
        });
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. NAVBAR SCROLL EFFECT & ACTIVE SECTION TRACKING
  // ------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const floatingTopBtn = document.getElementById('floating-top-btn');

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Header background blur on scroll
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Floating Back to Top Button
    if (floatingTopBtn) {
      if (scrollY > 400) {
        floatingTopBtn.classList.add('visible');
      } else {
        floatingTopBtn.classList.remove('visible');
      }
    }

    // Active Section Link Tracker
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  if (floatingTopBtn) {
    floatingTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 6. MOBILE NAVIGATION MENU TOGGLE
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    const toggleNav = () => {
      const isOpen = navMenu.classList.toggle('is-open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    };

    mobileToggle.addEventListener('click', toggleNav);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) toggleNav();
      });
    });
  }

  // ------------------------------------------------------------------------
  // 7. ROTATING TYPEWRITER SPECIALIZATIONS (CLOUD ENGINEER)
  // ------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Cloud Engineer',
      'UI/UX & Figma Designer',
      'Python & C Programmer',
      'IoT & Systems Builder',
      'B.Tech CSE Undergraduate'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 100;

    const typeLoop = () => {
      const current = roles[roleIdx];

      if (isDeleting) {
        typingElement.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typeDelay = 40;
      } else {
        typingElement.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typeDelay = 90;
      }

      if (!isDeleting && charIdx === current.length) {
        typeDelay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 400;
      }

      setTimeout(typeLoop, typeDelay);
    };

    typeLoop();
  }

  // ------------------------------------------------------------------------
  // 8. 1-CLICK COPY TO CLIPBOARD
  // ------------------------------------------------------------------------
  const copyBtns = document.querySelectorAll('.copy-mini-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.color = '#34d399';
          btn.style.borderColor = '#10b981';

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        }).catch(() => {
          btn.textContent = 'Failed';
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 9. DIRECT CONTACT FORM HANDLER
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const msgInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const message = msgInput ? msgInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please complete all required fields.');
        return;
      }

      const bodyText = `Hi Kumar Utkarsh,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
      const mailtoUrl = `mailto:iamutkarshnhn@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.textContent = '✔ Launching email client to send message...';
      }

      window.location.href = mailtoUrl;

      setTimeout(() => {
        contactForm.reset();
        if (formFeedback) {
          formFeedback.textContent = '✔ Message prepared. Thank you for reaching out!';
          setTimeout(() => {
            formFeedback.style.display = 'none';
          }, 5000);
        }
      }, 1500);
    });
  }

  // ------------------------------------------------------------------------
  // 10. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ------------------------------------------------------------------------
  // 11. AMBIENT PARTICLES CANVAS (60FPS NATIVE CANVAS)
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    const numParticles = Math.min(Math.floor(window.innerWidth / 25), 45);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = (Math.random() - 0.5) * 0.35;
        this.alpha = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        ctx.fillStyle = isLight
          ? `rgba(37, 99, 235, ${this.alpha * 0.45})`
          : `rgba(56, 189, 248, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }
});
