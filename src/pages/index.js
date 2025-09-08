import * as React from "react"
import { useEffect, useRef, useState } from "react"
import Layout from "../components/Layout"
import Section from "../components/Section"
import SectionNumbers from "../components/SectionNumbers"
import CaseStudies from "../components/CaseStudies"
import { Link as ScrollLink, Element, Events, scrollSpy } from "react-scroll"
import { COLORS } from "../const/colors"
import { isMobile } from "../utils/device"

// Lorem ipsum paragraphs for sections
const loremIpsum = {
  short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  medium: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

const IndexPage = () => {
  const heroRef = useRef(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Set up mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(isMobile());
    };
    
    // Set initial value
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

      // Register react-scroll events to handle active state
      Events.scrollEvent.register('begin', function() {
        // Check if user is in hero section and deactivate all menu items
        const heroElement = document.getElementById('hero');
        const rect = heroElement?.getBoundingClientRect();
        if (rect && rect.top >= -100 && rect.bottom >= window.innerHeight / 2) {
          // We're in hero section, deactivate all menu items
          document.querySelectorAll('.active-nav-link').forEach(el => {
            el.classList.remove('active-nav-link');
          });
        }
      });

      // Update scrollSpy
      scrollSpy.update();
    }
    
    // Add animation trigger with slight delay for Gatsby rendering
    const animationTimer = setTimeout(() => {
      if (typeof window.initAnimations === 'function') {
        window.initAnimations();
      }
    }, 100);
    
    return () => {
      clearTimeout(animationTimer);
      // Clean up event listeners
      if (typeof window !== 'undefined') {
        Events.scrollEvent.remove('begin');
      }
    };
  }, []);
  
  return (
    <Layout>
      {/* Hero Section with Zooming Background */}
      <section 
        id="hero" 
        className="relative h-screen flex items-center overflow-hidden z-10 border-t-4 border-b-4 border-accent"
        ref={heroRef}
      >
        {/* Background image with parallax zoom effect */}
        <div 
          className="parallax-zoom-bg absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover z-[1] origin-center backface-hidden"
          style={{
            backgroundImage: 'url("/images/hero-background.png")',
            backgroundPosition: 'center center',
            top: '20%'  
          }}
          data-zoom="1.5"
          id="hero-bg"
        />
        
        {/* No dark overlay as per requirement */}
        
        <div className={`relative z-10 max-w-7xl mx-auto px-10 ${isMobileDevice ? 'flex flex-col items-center justify-center w-full' : 'flex items-center w-full -mt-[200px]'}`}>
          {isMobileDevice ? (
            /* Mobile Layout */
            <div className="flex flex-col items-center text-center" style={{ marginTop: "-90px" }}>
              <img 
                src="/images/KanzentVertical.svg" 
                alt="Kanzent Logo Icon" 
                className="hero-logo-animation w-[180px] h-auto mb-5"
                style={{ opacity: 0, transform: 'translateY(-80px)' }}
              />
              <h1
                className="hero-title-animation text-tertiary text-[40px] font-bold mb-2 leading-none text-center"
                style={{ opacity: 0, transform: 'translateX(50px)' }}
              >
                Continuous<br />
                <span className="-mt-2 inline-block">Innovation</span>
              </h1>
              <p
                className="hero-slogan-animation text-quaternary text-[16px] mb-10 max-w-[90%] font-normal text-center"
                style={{ opacity: 0 }}
              >
                Engineering Crafted with Excellence
              </p>
            </div>
          ) : (
            /* Desktop Layout */
            <>
              <div className="flex flex-col items-center mr-[75px]">
                <img 
                  src="/images/KanzentVertical.svg" 
                  alt="Kanzent Logo Icon" 
                  className="hero-logo-animation w-[200px] h-auto mb-3"
                  style={{ opacity: 0, transform: 'translateY(-80px)' }}
                />
              </div>
              <div>
                <h1
                  className="hero-title-animation text-tertiary text-[48px] font-bold mb-2 leading-none"
                  style={{ opacity: 0, transform: 'translateX(50px)' }}
                >
                  Continuous<br />
                  <span className="-mt-2 inline-block">Innovation</span>
                </h1>
                <p
                  className="hero-slogan-animation text-quaternary text-[19px] mb-20 max-w-[600px] font-normal"
                  style={{ opacity: 0 }}
                >
                  Engineering Crafted with Excellence
                </p>
              </div>
            </>
          )}
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

      {/* Story Section with Parallax */}
      <Section 
        id="history"
        name="history"
        title="Our Story"
        backgroundColor="primary"
        textColor="text-white"
        paragraphs={[
          "Kanzent was established in Zurich, Switzerland in 2025, with origins tracing back to Madrid, Spain. Founded by Spanish entrepreneurs with extensive experience in software development across SaaS companies and international enterprise consultancy services in E-commerce, Financial Services, Media, and Healthcare across many countries."
        ]}
        boxParagraphs={["Our extensive background in the fast-paced SaaS ecosystem has cultivated a culture of product design, agility and scalable thinking, that product development requires. Furthermore, our consulting prowess has enabled us to develop nuanced client awareness, effective project orchestration, and fulfillment of business imperatives through tailored implementations."]} 
        boxTitle="Story"
        boxImage="/images/section-background.png"
        imageDirection="left"
        parallaxSpeed="0.15"
      />

      {/* Vision Section with Parallax */}
      <Section 
        id="vision"
        name="vision"
        title="Our Vision"
        backgroundColor="white"
        textColor=""
        paragraphs={[
          "At Kanzent, we have internalized the fundamental value of excellence in software engineering. We operate with a rigorous quality approach that combines exceptional talent with processes created in the AI era, free from the constraints of outdated methodologies or organizational structures. This commitment to modern engineering precision enables us to deliver solutions that consistently exceed industry standards."
        ]}
        boxParagraphs={[
          "Our mission is to deliver to our clients the same level of passion, innovation, and engineering precision that we apply to our products. We believe in building lasting partnerships, not just delivering solutions and moving on. Our relentless pursuit of excellence results in delivering clients enduring solutions engineered to last, providing continuous value rather than solutions that gradually reveal their limitations" 
        ]}
        boxTitle="Vision"
        boxImage="/images/section-background-02.png"
        imageDirection="right"
        parallaxSpeed="0.2"
        gradientBackground={{
          background: `linear-gradient(135deg, rgba(${parseInt(COLORS.primary.substring(1, 3), 16)}, ${parseInt(COLORS.primary.substring(3, 5), 16)}, ${parseInt(COLORS.primary.substring(5, 7), 16)}, 0.03), rgba(255, 255, 255, 0.95))`,
        }}
      />
      
      {/* Technology Section with Parallax */}
    <Section 
      id="technology"
      name="technology"
      title="Technology"
      backgroundColor="primary"
      textColor="text-white"
      paragraphs={[
        "Kanzent stands as one of the first completely AI-assisted software development companies in the industry. Our development lifecycle itself was architected with AI technologies from the ground up. This thoughtfully augmented methodology enables unprecedented levels of productivity and quality while maintaining the human expertise."
      ]}
      boxParagraphs={[
        "At Kanzent, we harness the most advanced technologies available to deliver optimal solutions. Our expertise spans Cloud Native Developments, robust Backend systems built on high-performance server technologies, modern Frontend applications leveraging responsive design principles, and intuitive Mobile solutions for cross-platform deployment."
      ]}
      boxTitle="Technology"
      boxImage="/images/section-background-03.png"
      imageDirection="left"
      parallaxSpeed="0.2"
      gradientBackground={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(${parseInt(COLORS.primary.substring(1, 3), 16)}, ${parseInt(COLORS.primary.substring(3, 5), 16)}, ${parseInt(COLORS.primary.substring(5, 7), 16)}, 0.95))`,
      }}
    />

    {/* Case Studies Section */}
    <CaseStudies 
      id="case-studies"
      name="case-studies"
      title="Case Studies"
      backgroundColor="white"
      textColor="text-primary"
      caseStudies={[
        {
          id: "oneportfolio",
          title: "OnePortfolio",
          url: "https://oneportfolio.io",
          text: "Portfolio Management solution",
          icon: "/images/case-studies/oneportfolio.png"
          // Remove the link property as we're now generating it based on id in the component
        },
      
      ]}
    />
      
      {/* Stats Section */}
      <SectionNumbers 
        id="stats"
        name="stats"
        backgroundImage="/images/section-background-04.png"
        stats={[
          { value: "20", label: "Years of Experience" },
          { value: "8", label: "Countries World Wide" },
          { value: "15", label: "Sectors World Wide" },
          { value: "25M", label: "Lines of Code" },
        ]}
      />

      {/* Contact Section */}
      <Element name="contact" id="contact">
        <section className="py-24 px-10 bg-white relative overflow-hidden border-t-4 border-accent" style={{ marginTop: '-4px' }}>
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
                  Ready to transform your business through innovative technology solutions? We're here to answer your questions and discuss how our expertise can help you achieve your goals. Fill out the form, and our team will get back to you promptly
                </p>
                <div className="p-5 bg-gray-50 rounded-sm border border-gray-300/50">
                  {
                  //<p className="mb-2.5"><strong>Email:</strong> info@kanzent.com</p>
                  //<p className="mb-2.5"><strong>Phone:</strong> +41 123-4567-91011</p>
                  //<p><strong>Address:</strong> 123 Innovation St, Tech City, TC 12345</p>
}
                </div>
              </div>
              
              <div className="flex-1 min-w-[300px] max-w-[500px] bg-white rounded-sm p-8 border border-gray-300/50">
                <form name="contact" action="/success" method="POST" data-netlify="true" className="flex flex-col gap-4">
                  <input type="hidden" name="form-name" value="contact" />
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    className="px-4 py-3 rounded border border-gray-200 text-base"
                    required
                  />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email" 
                    className="px-4 py-3 rounded border border-gray-200 text-base"
                    required
                  />
                  <textarea 
                    name="message"
                    placeholder="Your Message" 
                    rows={5}
                    className="px-4 py-3 rounded border border-gray-200 text-base resize-y"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-secondary hover:bg-accent text-white border-none py-3.5 px-5 rounded text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out"
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

export const Head = () => <title>Kanzent - Continuous Improvement</title>