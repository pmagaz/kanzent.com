import * as React from "react"
import { useEffect } from "react"
import Layout from "../components/Layout"
import AnimatedBackground from "../components/AnimatedBackground"
import { Link as ScrollLink, Element } from "react-scroll"
import { COLORS } from "../const/colors"

// Lorem ipsum paragraphs for sections
const loremIpsum = {
  short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  medium: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

const IndexPage = () => {
  // Handle parallax and animation initialization
  useEffect(() => {
    // Make sure the script is loaded
    if (typeof window !== 'undefined') {
      // Force a scroll event to initialize parallax
      window.dispatchEvent(new Event('scroll'));
      
      // Initialize animations immediately 
      if (typeof window.initAnimations === 'function') {
        window.initAnimations();
      }
      
      // Also initialize on load for good measure
      window.addEventListener('load', () => {
        window.dispatchEvent(new Event('scroll'));
        
        // Force another update after a short delay to catch any React rendering delays
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
          
          // Initialize animations again to ensure they work
          if (typeof window.initAnimations === 'function') {
            window.initAnimations();
          }
        }, 200);
      });
    }
    
    // Add animation trigger with slight delay for Gatsby rendering
    const animationTimer = setTimeout(() => {
      if (typeof window.initAnimations === 'function') {
        window.initAnimations();
      }
    }, 100);
    
    return () => clearTimeout(animationTimer);
  }, []);
  
  return (
    <Layout>
      {/* Hero Section with Zooming Background */}
      <section 
        id="hero" 
        className="relative h-screen flex items-center overflow-hidden z-10"
      >
        {/* Background image with parallax zoom effect */}
        <div 
          className="parallax-zoom-bg absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover z-[1] origin-center backface-hidden"
          style={{
            backgroundImage: 'url("/images/hero-background.png")',
            backgroundPosition: 'center 75px' /* Offset by 75px from the top */
          }}
          data-zoom="1.5"
          id="hero-bg"
        />
        
        {/* No dark overlay as per requirement */}
        
        <div className="relative z-10 max-w-7xl mx-auto px-16 flex items-center w-full -mt-[200px]">
          <img 
            src="/images/KaizensLogo.svg" 
            alt="Kaizens Logo" 
            className="hero-logo-animation h-[275px] w-auto mr-[70px]"
            style={{ opacity: 0, transform: 'translateY(-80px)' }}
          />
          <div>
            <h1
              className="hero-title-animation text-primary text-[58px] font-bold mb-6 leading-none"
              style={{ opacity: 0, transform: 'translateX(50px)' }}
            >
              Continuous<br />
              <span className="-mt-2 inline-block">Innovation</span>
            </h1>
            <p
              className="hero-slogan-animation text-primary text-[19px] mb-10 max-w-[600px] font-normal"
              style={{ opacity: 0 }}
            >
              Engineering Crafted with Excellence
            </p>
            {/* Get Started button removed as per requirement */}
          </div>
        </div>
        <div className="absolute bottom-[30px] left-0 right-0 text-center z-10">
          <ScrollLink 
            to="history"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            className="inline-block cursor-pointer animate-bounce"
            onMouseEnter={(e) => {
              const path = e.currentTarget.querySelector('path');
              if (path) path.setAttribute('stroke', COLORS.accent);
            }}
            onMouseLeave={(e) => {
              const path = e.currentTarget.querySelector('path');
              if (path) path.setAttribute('stroke', COLORS.primary);
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ScrollLink>
        </div>
      </section>

      {/* Story Section with Parallax - Dark background with network image */}
      <Element name="history" id="history">
        <section className="py-24 bg-primary relative overflow-hidden text-white border-b-4 border-accent">
          {/* Parallax Background */}
          <div 
            className="parallax-bg absolute top-0 left-0 right-0 h-full bg-transparent z-[1]"
            data-speed="0.15"
          />

          <div className="max-w-7xl mx-auto px-16 relative z-[2]">
            <h2 className="text-[60px] text-background mb-10 font-bold">
              Our Story
            </h2>
            
            <div className="flex flex-col mb-16 max-w-[600px]">
              <p className="text-white/90 leading-relaxed text-lg mb-5">
                {loremIpsum.medium}
              </p>
              <p className="text-white/90 leading-relaxed text-lg">
                {loremIpsum.short}
              </p>
            </div>
            
            <div className="flex flex-wrap items-stretch gap-8 pt-8">
              {/* Content box with image background */}
              <div className="flex-1 min-w-[300px] max-w-full relative flex overflow-hidden">
                {/* Content wrapper */}
                <div className="grid grid-cols-2 gap-[50px] w-full">
                  {/* Image box */}
                  <div className="w-full aspect-square relative rounded overflow-hidden border-2 border-white/50">
                    {/* Background with horizontal parallax */}
                    <div 
                      className="section-background absolute top-0 left-[-5%] w-[110%] h-full bg-no-repeat bg-center bg-cover origin-center will-change-transform"
                      style={{
                        backgroundImage: 'url("/images/section-background.png")',
                      }}
                      data-speed="1.0"
                      data-direction="left"
                    />
                    {/* Title overlay - centered */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
                      <h3 className="text-[36px] text-accent font-bold m-0 text-center">
                        Our Story
                      </h3>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="py-5 flex flex-col justify-center">
                    <p className="text-white/90 leading-relaxed text-base mb-5">
                      {loremIpsum.medium}
                    </p>
                    <p className="text-white/70 leading-relaxed text-base">
                      {loremIpsum.short}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Vision Section with Parallax - Dark background with network image */}
      <Element name="vision" id="vision">
        <section className="py-24 bg-white relative overflow-hidden border-b-4 border-primary">
          {/* Parallax Background */}
          <div 
            className="parallax-bg absolute top-0 left-0 right-0 h-full z-[1]"
            style={{
              background: `linear-gradient(135deg, rgba(${parseInt(COLORS.primary.substring(1, 3), 16)}, ${parseInt(COLORS.primary.substring(3, 5), 16)}, ${parseInt(COLORS.primary.substring(5, 7), 16)}, 0.03), rgba(255, 255, 255, 0.95))`,
            }}
            data-speed="0.2"
          />

          <div className="max-w-7xl mx-auto px-16 relative z-[2]">
            <h2 className="text-[60px] text-primary mb-10 font-bold">
              Our Vision
            </h2>
            
            <div className="flex flex-col mb-16 max-w-[600px]">
              <p className="text-gray-700 leading-relaxed text-lg mb-5">
                {loremIpsum.medium}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                {loremIpsum.short}
              </p>
            </div>

            <div className="flex flex-wrap items-stretch gap-8 pt-8">
              {/* Content wrapper */}
              <div className="grid grid-cols-2 gap-[50px] w-full">
                {/* Text content */}
                <div className="py-5 flex flex-col justify-center">
                  <p className="text-gray-700 leading-relaxed text-base mb-5">
                    {loremIpsum.medium}
                  </p>
                  <p className="text-gray-500 leading-relaxed text-base">
                    {loremIpsum.short}
                  </p>
                </div>
                
                {/* Image box */}
                <div className="w-full aspect-square relative rounded overflow-hidden border-2 border-primary/50">
                  {/* Background with horizontal parallax */}
                  <div 
                    className="section-background absolute top-0 left-[-5%] w-[140%] h-full bg-no-repeat bg-center bg-cover origin-center will-change-transform"
                    style={{
                      backgroundImage: 'url("/images/section-background-02.png")',
                    }}
                    data-speed="1.0"
                    data-direction="right" /* Alternating direction */
                  />
                  {/* Title overlay - centered */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
                    <h3 className="text-[36px] text-accent font-bold m-0 text-center">
                      Our Approach
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Developments Section with Parallax - Dark background */}
      <Element name="programs" id="programs">
        <section className="py-24 bg-[#053A5E] relative overflow-hidden text-white border-b-4 border-accent">
          {/* Parallax Background */}
          <div 
            className="parallax-bg absolute top-0 left-0 right-0 h-full bg-transparent z-[1]"
            data-speed="0.12"
          />

          <div className="max-w-7xl mx-auto px-16 relative z-[2]">
            <h2 className="text-[60px] text-white mb-10 font-bold">
              Our Developments
            </h2>
            
            <div className="flex flex-col mb-16 max-w-[600px]">
              <p className="text-white/90 leading-relaxed text-lg mb-5">
                {loremIpsum.medium}
              </p>
              <p className="text-white/90 leading-relaxed text-lg">
                {loremIpsum.short}
              </p>
            </div>
            
            <div className="flex flex-wrap items-stretch gap-8 pt-8">
              {/* Content box with image background */}
              <div className="flex-1 min-w-[300px] max-w-full relative flex overflow-hidden">
                {/* Content wrapper */}
                <div className="grid grid-cols-2 gap-[50px] w-full">
                  {/* Image box */}
                  <div className="w-full aspect-square relative rounded overflow-hidden border-2 border-white/50">
                    {/* Background with horizontal parallax */}
                    <div 
                      className="section-background absolute top-0 left-[-5%] w-[110%] h-full bg-no-repeat bg-center bg-cover origin-center will-change-transform"
                      style={{
                        backgroundImage: 'url("/images/section-background-03.png")',
                      }}
                      data-speed="1.0"
                      data-direction="left"
                    />
                    {/* Title overlay - centered */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
                      <h3 className="text-[36px] text-accent font-bold m-0 text-center">
                        Our Focus
                      </h3>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="py-5 flex flex-col justify-center">
                    <p className="text-white/90 leading-relaxed text-base mb-5">
                      {loremIpsum.medium}
                    </p>
                    <p className="text-white/70 leading-relaxed text-base">
                      {loremIpsum.short}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Contact Section */}
      <Element name="contact" id="contact">
        <section className="py-24 px-16 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-4xl text-primary mb-16 text-center font-bold">
              Get In Touch
            </h2>
            
            <div className="flex flex-wrap gap-10 justify-center">
              <div className="flex-1 min-w-[300px] max-w-[500px]">
                <h3 className="text-2xl text-primary mb-5">
                  Contact Us
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {loremIpsum.medium}
                </p>
                <div className="p-5 bg-gray-50 rounded-lg">
                  <p className="mb-2.5"><strong>Email:</strong> info@kaizens.com</p>
                  <p className="mb-2.5"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Innovation St, Tech City, TC 12345</p>
                </div>
              </div>
              
              <div className="flex-1 min-w-[300px] max-w-[500px] bg-white rounded-lg p-8 shadow-lg">
                <form className="flex flex-col gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="px-4 py-3 rounded border border-gray-200 text-base"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="px-4 py-3 rounded border border-gray-200 text-base"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={5}
                    className="px-4 py-3 rounded border border-gray-200 text-base resize-y"
                  />
                  <button 
                    type="submit"
                    className="bg-tertiary hover:bg-accent text-white border-none py-3.5 px-5 rounded text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Element>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Kaizens - Continuous Improvement</title>