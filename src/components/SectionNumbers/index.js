import * as React from "react"
import { Element } from "react-scroll"
import { COLORS } from "../../const/colors"
import { isMobile } from "../../utils/device"

const SectionNumbers = ({
  id,
  name,
  backgroundImage = "/images/section-background-04.png",
  backgroundColor = "black",
  stats = [],
  borderColor = "accent",
  borderStyles = { marginTop: '-4px', marginBottom: '-4px' },
}) => {
  const [isMobileDevice, setIsMobileDevice] = React.useState(false);
  
  // Set up mobile detection
  React.useEffect(() => {
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

  return (
    <Element name={name} id={id}>
      <section 
        className={`py-16 md:py-32 bg-${backgroundColor} relative overflow-hidden border-t-4 border-b-4 border-${borderColor}`}
        style={borderStyles}
      >
        {/* Background with fixed parallax structure */}
        <div 
          className="section-background absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover origin-center will-change-transform"
          style={{
            backgroundImage: `url("${backgroundImage}")`,
            transform: "scale(1.2)"
          }}
          data-speed="0.5"
        />
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-[2]">
          {/* Title */}
          <h2 className="text-[32px] md:text-[48px] text-white text-center font-bold mb-10 md:mb-20 reveal-bottom">
            We Take Pride in Our Numbers
          </h2>
          
          {/* Stats grid - switches between column on mobile and row on desktop */}
          <div className={`${isMobileDevice ? 'grid grid-cols-1 gap-10' : 'flex flex-wrap justify-between'} items-start gap-y-12 md:gap-y-16 mb-10 md:mb-20`}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center text-center reveal-bottom ${isMobileDevice ? 'w-full' : ''}`}
              >
                <span 
                  className="text-[3.5rem] md:text-[5.5rem] font-bold leading-none mb-4 md:mb-8"
                  style={{ color: COLORS.accent }}
                >
                  {stat.value}
                </span>
                <div className="w-[100px] md:w-[120px] h-[1px] bg-gray-600 my-3 md:my-4"></div>
                <span className="text-white text-base md:text-lg">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  )
}

export default SectionNumbers