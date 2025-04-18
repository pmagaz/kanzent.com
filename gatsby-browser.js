// Import the CSS file
import './src/styles/global.css';

// Import main JavaScript file for animations and effects
import './src/assets/main.js';

// Force parallax initialization on every route change
export const onRouteUpdate = () => {
  if (typeof window !== 'undefined') {
    // Check if our initParallax function exists
    if (typeof window.initParallax === 'function') {
      // Call it directly for immediate effect
      window.initParallax();
    }
    
    // Also trigger scroll events at different times to ensure the effect is applied
    window.dispatchEvent(new Event('scroll'));
    
    // Schedule additional updates to catch any delayed rendering
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
      if (typeof window.initParallax === 'function') {
        window.initParallax();
      }
    }, 100);
    
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 500);
  }
};
