import * as React from "react"
import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { COLORS } from "../const/colors"

const SuccessPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation sequence
  useEffect(() => {
    const timeouts = [
      setTimeout(() => {
        setAnimationStep(1);
      }, 300),
      setTimeout(() => {
        setAnimationStep(2);
      }, 800),
      setTimeout(() => {
        setAnimationStep(3);
      }, 1300),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <Layout>
      {/* Success Section with Parallax Background */}
      <section 
        className="py-20 sm:py-24 md:py-32 lg:py-40 px-10 relative overflow-hidden min-h-screen flex items-center justify-center border-t-4 border-b-4 border-accent"
      >
        {/* Background image with parallax effect */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover z-[1] origin-center"
          style={{
            backgroundImage: 'url("/images/hero-background.png")',
            backgroundPosition: 'center center',
            transform: `translateY(${scrollY * 0.3}px)`,
            height: '120%',
            top: '-10%'
          }}
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10 z-[2]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="space-y-8">
            {/* Success Icon */}
            <div 
              className="flex justify-center"
              style={{
                opacity: animationStep >= 1 ? 1 : 0,
                transform: animationStep >= 1 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-in-out'
              }}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M20 6L9 17L4 12" 
                    stroke={COLORS.accent} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Success Messages */}
            <div className="space-y-6">
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-tertiary"
                style={{
                  opacity: animationStep >= 2 ? 1 : 0,
                  transform: animationStep >= 2 ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease-in-out 0.2s'
                }}
              >
                Message Sent!
              </h1>
              
              <div 
                className="space-y-4"
                style={{
                  opacity: animationStep >= 2 ? 1 : 0,
                  transform: animationStep >= 2 ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease-in-out 0.3s'
                }}
              >
                <p className="text-xl md:text-2xl text-white font-normal">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div 
              className="flex justify-center"
              style={{
                opacity: animationStep >= 3 ? 1 : 0,
                transform: animationStep >= 3 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-in-out 0.4s'
              }}
            >
              <button
                onClick={goBack}
                className="bg-secondary hover:bg-accent text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-none cursor-pointer"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = COLORS.secondary;
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SuccessPage

export const Head = () => (
  <>
    <title>Message Sent - Kanzent</title>
    <meta name="description" content="Your message has been sent successfully. Thank you for contacting Kanzent." />
    <meta name="robots" content="noindex, nofollow" />
  </>
)