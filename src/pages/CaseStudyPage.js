import * as React from "react"
import { useEffect, useRef } from "react"
import { Link, navigate } from "gatsby"
import Layout from "../components/Layout"
import { COLORS } from "../const/colors"

const CaseStudyPage = ({ pageContext }) => {
  const {
    caseStudy = {
      id: "",
      title: "",
      subtitle: "",
      description: [],
      logo: "",
      screenshot: "",
      backgroundImage: "",
      technologies: [],
      challenge: "",
      solution: "",
      results: "",
      testimonial: {
        quote: "",
        author: "",
        position: ""
      },
      ctaLink: "",
      ctaText: "Visit Website"
    }
  } = pageContext;

  const heroRef = useRef(null);

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
    
    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section with Zooming Background */}
      <section 
        id="case-study-hero" 
        className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden z-10 border-t-4 border-b-4 border-accent"
        ref={heroRef}
      >
        {/* Background image with parallax zoom effect */}
        <div 
          className="parallax-zoom-bg absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover z-[1] origin-center backface-hidden"
          style={{
            backgroundImage: `url("${caseStudy.backgroundImage || "/images/section-background.png"}")`,
            backgroundPosition: 'center center'
          }}
          data-zoom="1.3"
          id="case-study-hero-bg"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-10 w-full">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <div className="mb-6">
                <button 
                  onClick={() => navigate('/#case-studies')}
                  className="flex items-center text-white hover:text-accent transition-colors mb-4"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Case Studies
                </button>
              </div>
              
              {/* <img 
                src={caseStudy.logo} 
                alt={`${caseStudy.title} logo`}
                className="mb-6 max-h-16" 
              /> */}
              
              <h1 className="text-[40px] md:text-[50px] text-white font-bold mb-4">
                {caseStudy.title}
              </h1>
              
              <p className="text-white/80 text-xl mb-6">
                {caseStudy.subtitle}
              </p>
              
              {caseStudy.ctaLink && (
                <a 
                  href={caseStudy.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-secondary hover:bg-accent text-white border-none py-3.5 px-5 rounded text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  {caseStudy.ctaText}
                </a>
              )}
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-[600px] rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={caseStudy.screenshot} 
                  alt={`${caseStudy.title} screenshot`}
                  className="w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Overview */}
      <section className="py-20 bg-white relative overflow-hidden border-b-4 border-accent" style={{ marginTop: '-4px' }}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 pr-10">
              <h2 className="text-[38px] text-primary font-bold mb-10">
                Overview
              </h2>
              
              <div className="space-y-6">
                {caseStudy.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/3 mt-10 md:mt-0">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h3 className="text-xl text-primary font-bold mb-6">Technologies</h3>
                
                <div className="flex flex-wrap gap-3">
                  {caseStudy.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Challenge & Solution */}
      <section className="py-20 bg-primary relative overflow-hidden border-b-4 border-accent" style={{ marginTop: '-4px' }}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-[38px] text-white font-bold mb-8">
                The Challenge
              </h2>
              <p className="text-white/90 leading-relaxed text-lg">
                {caseStudy.challenge}
              </p>
            </div>
            
            <div>
              <h2 className="text-[38px] text-white font-bold mb-8">
                The Solution
              </h2>
              <p className="text-white/90 leading-relaxed text-lg">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="py-20 bg-white relative overflow-hidden border-b-4 border-accent" style={{ marginTop: '-4px' }}>
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-[38px] text-primary font-bold mb-10 text-center">
            Results
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg text-center">
              {caseStudy.results}
            </p>
            
            {caseStudy.testimonial.quote && (
              <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200 relative">
                <svg className="absolute top-0 left-10 -translate-y-1/2 text-accent w-16 h-16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9999 9.00006C11.9999 9.00006 11.9999 7.20006 10992 4.80006C7.99992 2.40006 5.99992 3.00006 5.99992 3.00006C5.99992 3.00006 3.99992 4.20006 5.39992 7.80006C6.79992 11.4001 5.99992 15.0001 5.99992 15.0001H11.9999V9.00006Z" />
                  <path d="M23.9999 9.00006C23.9999 9.00006 23.9999 7.20006 21.9999 4.80006C11099 2.40006 17.9999 3.00006 17.9999 3.00006C17.9999 3.00006 15.9999 4.20006 17.3999 7.80006C18.7999 11.4001 17.9999 15.0001 17.9999 15.0001H23.9999V9.00006Z" />
                </svg>
                
                <p className="text-gray-800 text-lg italic mb-6">
                  "{caseStudy.testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <div>
                    <p className="font-bold text-primary">
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="text-gray-600">
                      {caseStudy.testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary relative overflow-hidden" style={{ marginTop: '-4px' }}>
        <div className="max-w-7xl mx-auto px-10 text-center">
          <h2 className="text-[32px] text-white font-bold mb-8">
            Ready to Work With Us?
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/contact"
              className="bg-secondary hover:bg-accent text-white border-none py-3.5 px-6 rounded text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out"
            >
              Contact Us
            </Link>
            
            {/* 
            <Link 
              to="/case-studies"
              className="bg-transparent hover:bg-white/10 text-white border border-white py-3.5 px-6 rounded text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out"
            >
              View More Case Studies
            </Link>
            */}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CaseStudyPage

export const Head = ({ pageContext }) => {
  const { caseStudy = { title: "Case Study" } } = pageContext;
  return <title>Kanzent - {caseStudy.title} Case Study</title>
}