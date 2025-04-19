import * as React from "react"
import { Element } from "react-scroll"

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
  
  // Determine text colors based on background
  const titleColor = isLight ? "text-primary" : "text-background";
  const mainTextColor = isLight ? "text-gray-700" : "text-white/90";
  const secondaryTextColor = isLight ? "text-gray-500" : "text-white/70";
  
  // Determine grid order based on direction
  const imageFirst = imageDirection === "left";
  
  return (
    <Element name={name} id={id}>
      <section className={`py-24 bg-${backgroundColor} relative overflow-hidden ${textColor} border-t-4 border-b-4 border-${borderColor}`} style={borderStyles}>
        {/* Parallax Background */}
        <div 
          className="parallax-bg absolute top-0 left-0 right-0 h-full bg-transparent z-[1]"
          style={gradientBackground}
          data-speed={parallaxSpeed}
        />

        <div className="max-w-7xl mx-auto px-10 relative z-[2]">
          <h2 className={`text-[60px] ${titleColor} mb-10 font-bold`}>
            {title}
          </h2>
          
          <div className="flex flex-col mb-16 max-w-[600px]">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={`${mainTextColor} leading-relaxed text-lg ${index < paragraphs.length - 1 ? 'mb-5' : ''}`}>
                {paragraph}
              </p>
            ))}
          </div>
          
          {!hideGrid && (
            <div className="flex flex-wrap items-stretch gap-8 pt-8">
              <div className="flex-1 min-w-[300px] max-w-full relative">
                {/* Content wrapper with reduced gap */}
                <div className="grid grid-cols-2 gap-[25px] w-full border border-gray-400/30 rounded-sm">
                  {/* Image box with overflow hidden to contain parallax */}
                  {imageFirst && (
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
                  
                  {/* Text content with increased right padding */}
                  <div className="py-8 pl-12 pr-[calc(3rem+25px)] flex flex-col justify-center">
                    <p className={`${mainTextColor} leading-relaxed text-base mb-5`}>
                      {boxParagraphs[0]}
                    </p>
                    <p className={`${secondaryTextColor} leading-relaxed text-base`}>
                      {boxParagraphs[1]}
                    </p>
                  </div>
                  
                  {/* Image box with overflow hidden to contain parallax - shown if direction is right */}
                  {!imageFirst && (
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