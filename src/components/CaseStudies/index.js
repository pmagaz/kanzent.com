import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { Element } from "react-scroll"
import { COLORS } from "../../const/colors"

const CaseStudies = ({
  id,
  name,
  title = "Case Studies",
  caseStudies = [],
  backgroundColor = "white",
  textColor = "text-primary",
  borderColor = "accent",
  borderStyles = { marginTop: '-4px', marginBottom: '-4px' },
  autoSlideInterval = 5000, // 5 seconds per slide
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Calculate how many case studies to show at once based on screen size
  const [itemsToShow, setItemsToShow] = useState(3);
  
  // Update items to show on window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setItemsToShow(1);
        } else if (window.innerWidth < 1024) {
          setItemsToShow(2);
        } else {
          setItemsToShow(Math.min(3, caseStudies.length));
        }
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    
    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [caseStudies.length]);
  
  // Auto-slide functionality
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying && caseStudies.length > itemsToShow) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === caseStudies.length - itemsToShow ? 0 : prevIndex + 1
        );
      }, autoSlideInterval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, autoSlideInterval, caseStudies.length, itemsToShow]);
  
  // Navigation handlers
  const handlePrevClick = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? caseStudies.length - itemsToShow : prevIndex - 1
    );
  }, [caseStudies.length, itemsToShow]);
  
  const handleNextClick = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === caseStudies.length - itemsToShow ? 0 : prevIndex + 1
    );
  }, [caseStudies.length, itemsToShow]);
  
  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  // Check if there's only one case study to center it
  const singleItem = caseStudies.length === 1;
  
  return (
    <Element name={name} id={id}>
      <section 
        className={`py-20 bg-${backgroundColor} relative overflow-hidden ${textColor} border-t-4 border-b-4 border-${borderColor}`}
        style={borderStyles}
      >
        <div className="max-w-7xl mx-auto px-10 relative z-[2]">
          <h2 className={`text-[40px] md:text-[48px] ${textColor} text-center font-bold mb-16 reveal-bottom`}>
            {title}
          </h2>
          
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Navigation buttons - only show if more than one item and more items than can be shown */}
            {caseStudies.length > 1 && caseStudies.length > itemsToShow && (
              <>
                <button 
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-md transition-all duration-200 -ml-4"
                  onClick={handlePrevClick}
                  aria-label="Previous case study"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-md transition-all duration-200 -mr-4"
                  onClick={handleNextClick}
                  aria-label="Next case study"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}
            
            {/* Items container */}
            <div className="overflow-hidden">
              <div 
                className={`flex transition-transform duration-500 ease-in-out ${singleItem ? 'justify-center' : ''}`}
                style={singleItem ? {} : { 
                  transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                  width: `${(caseStudies.length / itemsToShow) * 100}%`
                }}
              >
                {caseStudies.map((study, index) => (
                  <div 
                    key={index}
                    className="px-4"
                    style={singleItem ? { width: '450px', maxWidth: '100%' } : { width: `${100 / (caseStudies.length / itemsToShow * itemsToShow)}%` }}
                  >
                    <div className="bg-primary rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                      {/* Logo section with more vertical space */}
                      <div className="h-64 flex items-center justify-center bg-main py-6 px-[50px]">
                        {study.icon && (
                          <img src={study.icon} alt={study.title} className="w-auto max-h-40" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="py-6 px-[50px] flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-white">{study.title}</h3>
                        
                        {/* Link */}
                        <a href={study.url} target="_blank" rel="noopener noreferrer" className="text-secondary mb-4 hover:text-accent underline">{study.url}</a>
                        
                        {/* text divider */}
                        <div className="w-full h-[1px] bg-gray-700 my-4"></div>
                        
                        {/* text */}
                        <p className="text-white text-lg font-bold mb-6">{study.text}</p>
                        
                        {/* CTA button - using blue button from screenshot */}
                        <a 
                          href={study.link || "#"} 
                          className="bg-secondary hover:bg-accent text-white border-none py-3 px-4 rounded text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out text-center mt-auto"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pagination dots - only show if more than one item and more items than can be shown */}
            {caseStudies.length > 1 && caseStudies.length > itemsToShow && (
              <div className="flex justify-center mt-10 gap-2">
                {Array.from({ length: caseStudies.length - itemsToShow + 1 }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-accent scale-125' : 'bg-gray-300'}`}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default CaseStudies;