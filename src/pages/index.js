import * as React from "react"
import { useEffect } from "react"
import Layout from "../components/Layout"
import AnimatedBackground from "../components/AnimatedBackground"
import { Link as ScrollLink, Element } from "react-scroll"

// Define color constants
const COLORS = {
  primary: '#03304ffe',
  secondary: '#64CFFF',
  tertiary: '#0E37C0',
  accent: '#FF499E',
  background: '#F8FAFB',
};

// Lorem ipsum paragraphs for sections
const loremIpsum = {
  short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  medium: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

const IndexPage = () => {
  // Handle parallax initialization
  useEffect(() => {
    // Make sure the script is loaded
    if (typeof window !== 'undefined') {
      // Force a scroll event to initialize parallax
      window.dispatchEvent(new Event('scroll'));
      
      // Also initialize on load for good measure
      window.addEventListener('load', () => {
        window.dispatchEvent(new Event('scroll'));
        
        // Force another update after a short delay to catch any React rendering delays
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 200);
      });
    }
  }, []);
  
  return (
    <Layout>
      {/* Hero Section with Zooming Background */}
      <section 
        id="hero" 
        style={{ 
          position: 'relative', 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center',
          overflow: 'hidden',
          zIndex: 5 /* Ensure proper stacking context */
        }}
      >
        {/* Background image with parallax zoom effect */}
        <div 
          className="parallax-zoom-bg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("/images/hero-background.png")',
            backgroundPosition: 'center 50px', /* Offset by 100px from the top */
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            zIndex: 1,
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden'
          }}
          data-zoom="1.5"
        />
        
        {/* No dark overlay as per requirement */}
        
        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 64px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginTop: '-200px' /* Move up by 100px */
        }}>
          <img 
            src="/images/KaizensLogo.svg" 
            alt="Kaizens Logo" 
            className="hero-logo-animation"
            style={{ 
              height: '275px', 
              width: 'auto', 
              marginRight: '60px'
            }} 
          />
          <div>
            <h1
              className="hero-title-animation"
              style={{ 
                color: COLORS.primary, 
                fontSize: '60px', 
                fontWeight: 'bold', 
                marginBottom: '24px',
                lineHeight: '1.1',
                fontWeight: "bold"
              }}
            >
              The Power<br />of Evolution
            </h1>
            <p
              className="hero-slogan-animation"
              style={{ 
                color: COLORS.primary, 
                fontSize: '22px', 
                marginBottom: '40px',
                maxWidth: '600px',
                fontWeight: "normal"
              }}
            >
              Continuous Improvement
            </p>
            {/* Get Started button removed as per requirement */}
          </div>
        </div>
        <div style={{ 
          position: 'absolute', 
          bottom: '30px', 
          left: '0', 
          right: '0', 
          textAlign: 'center',
          zIndex: 10
        }}>
          <ScrollLink 
            to="solutions"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            style={{ 
              display: 'inline-block',
              cursor: 'pointer',
              animation: 'bounce 2s infinite'
            }}
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

      {/* Solutions Section with Parallax - Dark background with network image */}
      <Element name="solutions">
        <section style={{ 
          padding: '100px 0', 
          background: COLORS.primary,
          position: 'relative',
          overflow: 'hidden',
          color: 'white'
        }}>
          {/* Parallax Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'transparent',
            zIndex: 1
          }} 
          className="parallax-bg"
          data-speed="0.15"
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}>
            <h2 style={{ 
              fontSize: '60px', 
              color: COLORS.background, 
              marginBottom: '40px',
              fontWeight: 'bold',
              fontWeight: "bold"
            }}>
              Our Mission
            </h2>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              marginBottom: '60px',
              maxWidth: '600px'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '18px', marginBottom: '20px' }}>
                {loremIpsum.medium}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '18px' }}>
                {loremIpsum.short}
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              alignItems: 'stretch',
              gap: '30px',
              paddingTop: '30px'
            }}>
              {/* Content box with image background */}
              <div style={{ 
                flex: '1', 
                minWidth: '300px',
                maxWidth: '100%',
                position: 'relative',
                display: 'flex',
                overflow: 'hidden'
              }}>
                {/* Content wrapper */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  width: '100%'
                }}>
                  {/* Image box */}
                  <div style={{ 
                    width: '100%',
                    aspectRatio: '1/1',
                    position: 'relative',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '2px solid rgba(255, 255, 255, 0.5)'
                  }}
                  >
                    {/* Background with horizontal parallax */}
                    <div 
                      className="section-background"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-5%', /* Percentage-based offset for better proportions */
                        width: '110%', /* Slightly wider for parallax effect */
                        height: '100%',
                        backgroundImage: 'url("/images/section-background.png")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center', /* Center position works better with the left offset */
                        backgroundSize: 'cover', /* Ensures the image covers the entire container */
                        transformOrigin: 'center center',
                        willChange: 'transform'
                      }}
                      data-speed="1.0"
                      data-direction="left"
                    />
                    {/* Title overlay - centered */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent'
                    }}>
                      <h3 style={{ 
                        fontSize: '36px', 
                        color: COLORS.accent,
                        fontWeight: 'bold',
                        margin: 0,
                        textAlign: 'center',
                        fontWeight: "bold"
                      }}>
                        Our Story
                      </h3>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div style={{
                    padding: '20px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
                      {loremIpsum.medium}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '16px' }}>
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
      <Element name="vision">
        <section style={{ 
          padding: '100px 0', 
          background: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Parallax Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: `linear-gradient(135deg, rgba(${parseInt(COLORS.primary.substring(1, 3), 16)}, ${parseInt(COLORS.primary.substring(3, 5), 16)}, ${parseInt(COLORS.primary.substring(5, 7), 16)}, 0.03), rgba(255, 255, 255, 0.95))`,
            zIndex: 1
          }} 
          className="parallax-bg"
          data-speed="0.2"
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}>
            <h2 style={{ 
              fontSize: '60px', 
              color: COLORS.primary, 
              marginBottom: '40px',
              fontWeight: 'bold',
              fontWeight: "bold"
            }}>
              Our Vision
            </h2>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              marginBottom: '60px',
              maxWidth: '600px'
            }}>
              <p style={{ color: '#444', lineHeight: '1.8', fontSize: '18px', marginBottom: '20px' }}>
                {loremIpsum.medium}
              </p>
              <p style={{ color: '#444', lineHeight: '1.8', fontSize: '18px' }}>
                {loremIpsum.short}
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              alignItems: 'stretch',
              gap: '30px',
              paddingTop: '30px'
            }}>
              {/* Content wrapper */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
                width: '100%'
              }}>
                {/* Text content */}
                <div style={{
                  padding: '20px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <p style={{ color: '#444', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
                    {loremIpsum.medium}
                  </p>
                  <p style={{ color: '#666', lineHeight: '1.8', fontSize: '16px' }}>
                    {loremIpsum.short}
                  </p>
                </div>
                
                {/* Image box */}
                <div style={{ 
                  width: '100%',
                  aspectRatio: '1/1',
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '2px solid rgba(3, 57, 93, 0.5)'
                }}
                >
                  {/* Background with horizontal parallax */}
                  <div 
                    className="section-background"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-5%', /* Start 5% to the left */
                      width: '140%', /* Extra width for horizontal parallax */
                      height: '100%',
                      backgroundImage: 'url("/images/section-background-02.png")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                      transformOrigin: 'center center',
                      willChange: 'transform'
                    }}
                    data-speed="1.0"
                    data-direction="right" /* Alternating direction */
                  />
                  {/* Title overlay - centered */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent'
                  }}>
                    <h3 style={{ 
                      fontSize: '36px', 
                      color: COLORS.accent,
                      fontWeight: 'bold',
                      margin: 0,
                      textAlign: 'center',
                      fontWeight: "bold"
                    }}>
                      Our Approach
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Programs Section with Parallax - Dark background */}
      <Element name="programs">
        <section style={{ 
          padding: '100px 0', 
          background: '#053A5E',
          position: 'relative',
          overflow: 'hidden',
          color: 'white'
        }}>
          {/* Parallax Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'transparent',
            zIndex: 1
          }} 
          className="parallax-bg"
          data-speed="0.12"
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}>
            <h2 style={{ 
              fontSize: '60px', 
              color: 'white', 
              marginBottom: '40px',
              fontWeight: 'bold',
              fontWeight: "bold"
            }}>
              Our Programs
            </h2>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              marginBottom: '60px',
              maxWidth: '600px'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '18px', marginBottom: '20px' }}>
                {loremIpsum.medium}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '18px' }}>
                {loremIpsum.short}
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              alignItems: 'stretch',
              gap: '30px',
              paddingTop: '30px'
            }}>
              {/* Content box with image background */}
              <div style={{ 
                flex: '1', 
                minWidth: '300px',
                maxWidth: '100%',
                position: 'relative',
                display: 'flex',
                overflow: 'hidden'
              }}>
                {/* Content wrapper */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  width: '100%'
                }}>
                  {/* Image box */}
                  <div style={{ 
                    width: '100%',
                    aspectRatio: '1/1',
                    position: 'relative',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '2px solid rgba(255, 255, 255, 0.5)'
                  }}
                  >
                    {/* Background with horizontal parallax */}
                    <div 
                      className="section-background"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-5%', /* Percentage-based offset for better proportions */
                        width: '110%', /* Slightly wider for parallax effect */
                        height: '100%',
                        backgroundImage: 'url("/images/section-background-03.png")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center', /* Center position works better with the left offset */
                        backgroundSize: 'cover', /* Ensures the image covers the entire container */
                        transformOrigin: 'center center',
                        willChange: 'transform'
                      }}
                      data-speed="1.0"
                      data-direction="left"
                    />
                    {/* Title overlay - centered */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent'
                    }}>
                      <h3 style={{ 
                        fontSize: '36px', 
                        color: COLORS.accent,
                        fontWeight: 'bold',
                        margin: 0,
                        textAlign: 'center',
                        fontWeight: "bold"
                      }}>
                        Our Focus
                      </h3>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div style={{
                    padding: '20px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
                      {loremIpsum.medium}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '16px' }}>
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
      <Element name="contact">
        <section style={{ 
          padding: '100px 64px', 
          background: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
            <h2 style={{ 
              fontSize: '40px', 
              color: COLORS.primary, 
              marginBottom: '60px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              Get In Touch
            </h2>
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '40px',
              justifyContent: 'center'
            }}>
              <div style={{ 
                flex: '1',
                minWidth: '300px',
                maxWidth: '500px'
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  color: COLORS.primary,
                  marginBottom: '20px'
                }}>
                  Contact Us
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '30px' }}>
                  {loremIpsum.medium}
                </p>
                <div style={{ 
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <p style={{ marginBottom: '10px' }}><strong>Email:</strong> info@kaizens.com</p>
                  <p style={{ marginBottom: '10px' }}><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Innovation St, Tech City, TC 12345</p>
                </div>
              </div>
              
              <div style={{ 
                flex: '1',
                minWidth: '300px',
                maxWidth: '500px',
                background: 'white',
                borderRadius: '8px',
                padding: '30px',
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
              }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    style={{ 
                      padding: '12px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }} 
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    style={{ 
                      padding: '12px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }} 
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={5}
                    style={{ 
                      padding: '12px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      fontSize: '16px',
                      resize: 'vertical'
                    }} 
                  />
                  <button 
                    type="submit"
                    style={{ 
                      background: COLORS.tertiary,
                      color: 'white',
                      border: 'none',
                      padding: '14px 20px',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = COLORS.accent}
                    onMouseLeave={(e) => e.target.style.background = COLORS.primary}
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