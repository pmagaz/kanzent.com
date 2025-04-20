// utils/device.js
export const isMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768; // Common breakpoint for mobile
  }
  return false; // Default to desktop on server-side
};