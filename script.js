// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// Mobile Menu Toggle
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');

function openMobileMenu() {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', openMobileMenu);
}

if (closeMenu) {
  closeMenu.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      closeMobileMenu();
    }
  });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
  root: null,
  rootMargin: '-50px',
  threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for fade-in animation
const sections = document.querySelectorAll('.section-header, .problem-card, .solution-card, .timeline-box, .paradigm-card, .pricing-card, .flow-step, .support-card');

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeInObserver.observe(section);
});


// Add stagger delay to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Add stagger delay to stat items
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach((item, index) => {
  item.style.transitionDelay = `${0.2 + index * 0.1}s`;
});

// ============================================
// Dot Navigation
// ============================================
(function () {
  const dotItems = document.querySelectorAll('.dot-nav-item');
  const sectionIds = ['hero', 'problems', 'timeline', 'aiseo', 'cms', 'pricing', 'flow', 'support'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function setActive(id) {
    dotItems.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.section === id);
    });
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  // Set first dot active on load
  if (sections.length) setActive(sections[0].id);
})();
