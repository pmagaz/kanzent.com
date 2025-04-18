// Simple, direct parallax effects with no dependencies
// This script guarantees parallax effects will work

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initParallax);
window.addEventListener('load', initParallax);

// If the document is already loaded, init immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initParallax, 1);
}

// Make the function globally accessible
window.initParallax = initParallax;

function initParallax() {
  // Select all elements that need parallax effects
  const zoomBg = document.querySelector('.parallax-zoom-bg');
  const sectionBgs = document.querySelectorAll('.section-background');
  
  // Apply initial styles to ensure transitions work properly
  if (zoomBg) {
    zoomBg.style.willChange = 'transform';
    zoomBg.style.transition = 'transform 0.2s ease-out'; // Medium transition speed
    zoomBg.style.transformOrigin = 'center center';
  }
  
  // Apply styles to section backgrounds for smoother movement
  sectionBgs.forEach(function(bg) {
    bg.style.transition = 'transform 0.2s ease-out'; // Smooth movement
    
    // Start with a slight scale to ensure full coverage
    bg.style.transform = 'scale(1.1)';
    
    // Set transform origin to center
    bg.style.transformOrigin = 'center center';
  });
  
  // Set up scroll event listener with more conservative throttling for smoother motion
  let lastScrollPosition = 0;
  let ticking = false;
  let lastUpdateTime = 0;
  const throttleInterval = 30; // Update more frequently for smoother effect
  
  window.addEventListener('scroll', function() {
    lastScrollPosition = window.scrollY;
    
    const now = Date.now();
    
    // Check if enough time has passed since last update
    if (!ticking && now - lastUpdateTime > throttleInterval) {
      window.requestAnimationFrame(function() {
        updateParallaxEffects(lastScrollPosition);
        ticking = false;
        lastUpdateTime = now;
      });
      
      ticking = true;
    }
  });
  
  // Initial update
  updateParallaxEffects(window.scrollY);
  
  // Handle resize events to recalculate dimensions
  window.addEventListener('resize', function() {
    updateParallaxEffects(window.scrollY);
  });
  
  function updateParallaxEffects(scrollY) {
    // 1. Hero Section Zoom Effect
    if (zoomBg) {
      // Find the hero section to determine when it's out of view
      const heroSection = document.getElementById('hero');
      
      if (heroSection) {
        // Get section boundaries
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        
        // Get max zoom from data attribute or default to 1.5
        const maxZoom = zoomBg.getAttribute('data-zoom') || 1.5;
        
        // Calculate how far the hero has scrolled out of view (as a percentage)
        // Reduced denominator for faster zoom effect
        const viewportHeight = window.innerHeight;
        const heroScrollProgress = Math.min(scrollY / (viewportHeight * 0.8), 1);
        
        // Apply zoom effect - enhanced calculation with full multiplier for maximum effect
        // This ensures zoom continues until the section is completely off-screen
        const scale = 1 + (heroScrollProgress * (maxZoom - 1) * 1.0);
        zoomBg.style.transform = `scale(${scale})`;
      } else {
        // Fallback if hero section not found (matching the faster speed)
        const zoomFactor = Math.min(scrollY / (window.innerHeight * 0.8), 1);
        const maxZoom = zoomBg.getAttribute('data-zoom') || 1.5;
        const scale = 1 + (zoomFactor * (maxZoom - 1) * 1.0);
        zoomBg.style.transform = `scale(${scale})`;
      }
    }
    
    // 2. Section Background Horizontal Parallax
    sectionBgs.forEach(function(bg) {
      // Find the section containing this background
      const section = bg.closest('section');
      if (!section) return;
      
      // Check if section is in view
      const rect = section.getBoundingClientRect();
      const isInView = (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      );
      
      if (isInView) {
        // Calculate how far the section is through the viewport (from -1 to 1)
        // -1 = section is at the bottom of viewport
        // 0 = section is centered in viewport 
        // 1 = section is at the top of viewport
        const viewportMid = window.innerHeight / 2;
        const sectionMid = rect.top + (rect.height / 2);
        const distanceFromMid = (viewportMid - sectionMid) / window.innerHeight;
        
        // Get direction and speed
        const direction = bg.getAttribute('data-direction') || 'right';
        const speed = parseFloat(bg.getAttribute('data-speed') || 1.0);
        
        // Calculate offset (pixels to move)
        // Reduced by 25% to limit movement
        const maxOffset = 60; // Reduced maximum offset (25% less than 80px)
        let offsetX = distanceFromMid * maxOffset * speed;
        
        // Apply opposite direction if needed
        if (direction === 'left') {
          offsetX = -offsetX;
        }
        
        // Apply the transform - using translateX and scale for better coverage
        // Scale is slightly larger to avoid seeing edges during movement
        bg.style.transform = `translateX(${offsetX}px) scale(1.1)`;
      }
    });
  }
}

// Force an update when route changes (for SPA/React/Gatsby)
if (typeof window !== 'undefined') {
  // Handle any history API usage
  const originalPushState = window.history.pushState;
  window.history.pushState = function() {
    originalPushState.apply(this, arguments);
    initParallax();
  };
}