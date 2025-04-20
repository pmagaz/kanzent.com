import * as React from "react"
import { Element } from "react-scroll"
import { isMobile } from "../../utils/device"

const Section = ({
  id,
  name,
  title,
  backgroundColor,
  textColor,
  paragraphs,
  boxTitle,
  boxImage,
  boxParagraphs,
  imageDirection = "left",
  borderStyles = { marginTop: '-4px', marginBottom: '-4px' },
  parallaxSpeed = "0.15",
  gradientBackground = null,
  borderColor = "accent",
  hideGrid = false
}) => {
  const isLight = backgroundColor === "white" || backgroundColor === "#fff";
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
  
  // Determine text colors based on background
  const titleColor = isLight ? "text-primary" : "text-background";
  const mainTextColor = isLight ? "text-gray-700" : "text-white/90";
  const secondaryTextColor = isLight ? "text-gray-500" : "text-white/70";
  
  // Determine grid order based on direction
  const imageFirst = imageDirection === "left";
  
  return (
    <Element name={name} id={id}>
      <section className={`py-16 md:py-24 bg-${backgroundColor} relative overflow-hidden ${textColor} border-t-4 border-b-4 border-${borderColor}`} style={borderStyles}>
        {/* Parallax Background */}
        <div 
          className="parallax-bg absolute top-0 left-0 right-0 h-full bg-transparent z-[1]"
          style={gradientBackground}
          data-speed={parallaxSpeed}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-[2]">
          <h2 className={`text-[40px] md:text-[60px] ${titleColor} mb-6 md:mb-10 font-bold`}>
            {title}
          </h2>
          
          <div className="flex flex-col mb-10 md:mb-16 max-w-full md:max-w-[600px]">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={`${mainTextColor} leading-relaxed text-base md:text-lg ${index < paragraphs.length - 1 ? 'mb-4 md:mb-5' : ''}`}>
                {paragraph}
              </p>
            ))}
          </div>
          
          {!hideGrid && (
            <div className="flex flex-wrap items-stretch gap-8 pt-4 md:pt-8">
              <div className="flex-1 min-w-[300px] max-w-full relative">
                {/* Content wrapper with responsive layout */}
                <div className={`${isMobileDevice ? 'flex flex-col' : 'grid grid-cols-2'} gap-[25px] w-full border border-gray-400/30 rounded-sm`}>
                  {/* Image box with overflow hidden to contain parallax */}
                  {(imageFirst || isMobileDevice) && (
                    <div className="w-full aspect-square md:aspect-square relative overflow-hidden">
                      {/* Background with constrained horizontal parallax */}
                      <div 
                        className="section-background absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover origin-center will-change-transform"
                        style={{
                          backgroundImage: `url("${boxImage}")`,
                          backgroundSize: isMobileDevice ? '120% 120%' : 'cover'
                        }}
                        data-speed="0.5"
                        data-direction={imageDirection}
                      />
                      {/* Title overlay - centered */}
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
                        <h3 className="text-[30px] md:text-[36px] text-accent font-bold m-0 text-center">
                          {boxTitle}
                        </h3>
                      </div>
                    </div>
                  )}
                  
                  {/* Text content with responsive padding */}
                  <div className="py-6 md:py-8 px-6 md:pl-12 md:pr-[calc(3rem+25px)] flex flex-col justify-center">
                    <p className={`${mainTextColor} leading-relaxed text-base mb-4 md:mb-5`}>
                      {boxParagraphs[0]}
                    </p>
                    <p className={`${secondaryTextColor} leading-relaxed text-base`}>
                      {boxParagraphs[1]}
                    </p>
                  </div>
                  
                  {/* Image box with overflow hidden to contain parallax - shown if direction is right and not mobile */}
                  {!imageFirst && !isMobileDevice && (
                    <div className="w-full aspect-square relative overflow-hidden">
                      {/* Background with constrained horizontal parallax */}
                      <div 
                        className="section-background absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover origin-center will-change-transform"
                        style={{
                          backgroundImage: `url("${boxImage}")`,
                        }}
                        data-speed="0.5"
                        data-direction={imageDirection}
                      />
                      {/* Title overlay - centered */}
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
                        <h3 className="text-[36px] text-accent font-bold m-0 text-center">
                          {boxTitle}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Element>
  )
}

export default Section