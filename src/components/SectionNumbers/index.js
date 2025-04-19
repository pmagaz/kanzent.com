import * as React from "react"
import { Element } from "react-scroll"
import { COLORS } from "../../const/colors"

const SectionNumbers = ({
  id,
  name,
  backgroundImage = "/images/section-background-04.png",
  backgroundColor = "black",
  stats = [],
  borderColor = "accent",
  borderStyles = { marginTop: '-4px', marginBottom: '-4px' },
}) => {
  return (
    <Element name={name} id={id}>
      <section 
        className={`py-32 bg-${backgroundColor} relative overflow-hidden border-t-4 border-b-4 border-${borderColor}`}
        style={borderStyles}
      >
        {/* Background with the exact same structure as in the Section component */}
        <div 
          className="section-background absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover origin-center will-change-transform"
          style={{
            backgroundImage: `url("${backgroundImage}")`,
          }}
          data-speed="0.5"
        />
        
        <div className="max-w-7xl mx-auto px-10 relative z-[2]">
          {/* Title */}
          <h2 className="text-[40px] md:text-[48px] text-white text-center font-bold mb-20 reveal-bottom">
            We Take Pride in Our Numbers
          </h2>
          
          <div className="flex flex-wrap justify-between items-start gap-y-16 mb-20">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center reveal-bottom"
              >
                <span 
                  className="text-[4.5rem] md:text-[5.5rem] font-bold leading-none mb-8"
                  style={{ color: COLORS.accent }}
                >
                  {stat.value}
                </span>
                <div className="w-[120px] h-[1px] bg-gray-600 my-4"></div>
                <span className="text-white text-lg">
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