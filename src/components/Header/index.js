import * as React from "react"
import { Link } from "gatsby"
import { Link as ScrollLink } from "react-scroll"
import { COLORS } from "../../const/colors"

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      // Get the height of the hero section (approximately viewport height)
      const heroHeight = window.innerHeight * 0.7; // 70% of the viewport height
      
      if (window.scrollY > heroHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-20 px-8 py-4 bg-background transition-all duration-300 ease-in-out ${
      scrolled ? 'backdrop-blur-sm shadow-sm' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className={`no-underline flex items-center transition-opacity duration-300 ease-in-out ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}>
            <img 
              src="/images/KaizensLogoHeader.svg" 
              alt="Kaizens Logo" 
              className="h-10 w-auto mr-2.5"
            />
          </Link>
        </div>
        
        <div className="flex items-center">
          <nav className="flex items-center">
            {[
              { name: 'Solutions', target: 'solutions' },
              { name: 'Vision', target: 'vision' },
              { name: 'Programs', target: 'programs' }, 
              { name: 'Contact', target: 'contact' }
            ].map((item, index, arr) => (
              <React.Fragment key={item.name}>
                <ScrollLink 
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-primary px-4 no-underline cursor-pointer font-medium transition-colors duration-200 ease-in-out hover:text-accent"
                  activeClass="text-accent"
                >
                  {item.name}
                </ScrollLink>
                {index < arr.length - 1 && (
                  <div className="h-4 w-px bg-gray-200"></div>
                )}
              </React.Fragment>
            ))}
          </nav>
          
          {/* "Get Started" button removed as per requirement */}
        </div>
      </div>
    </header>
  )
}

export default Header