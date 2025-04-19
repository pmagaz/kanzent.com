import * as React from "react"
import { Link } from "gatsby"
import { Link as ScrollLink, Events, scrollSpy } from "react-scroll"
import { COLORS } from "../../const/colors"

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');
  
  React.useEffect(() => {
    // Initialize scrollSpy
    scrollSpy.update();
    
    // Register to the Events to get active section updates
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});
    
    const handleScroll = () => {
      // Get the height of the hero section (approximately viewport height)
      const heroHeight = window.innerHeight * 0.7; // 70% of the viewport height
      
      if (window.scrollY > heroHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Find the active section based on scroll position
      const sections = ['history', 'vision', 'programs', 'contact'];
      
      // Check which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calculate the threshold based on the header height (approximately 80px)
          const headerOffset = 80;
          const threshold = window.innerHeight / 3;
          
          // A section is considered in view if its top is above the threshold
          // and its bottom is below the threshold
          const topVisible = rect.top < threshold + headerOffset;
          const bottomVisible = rect.bottom > headerOffset;
          
          if (topVisible && bottomVisible) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial update
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
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
              { name: 'Story', target: 'history' },
              { name: 'Vision', target: 'vision' },
              { name: 'Developments', target: 'programs' }, 
              { name: 'Contact', target: 'contact' }
            ].map((item, index, arr) => (
              <React.Fragment key={item.name}>
                <ScrollLink 
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={`menu-item-animation px-3 py-2 no-underline cursor-pointer font-medium transition-all duration-200 ease-in-out hover:text-accent relative group ${
                    activeSection === item.target ? 'text-accent' : 'text-primary'
                  }`}
                  style={{ 
                    opacity: 0,
                    animationDelay: `${1300 + (index * 100)}ms` 
                  }}
                  activeClass="text-accent"
                  onSetActive={() => setActiveSection(item.target)}
                >
                  <span className="relative">
                    {item.name}
                    <span className={`absolute -bottom-6 left-0 w-full h-[2px] bg-accent transform scale-x-0 origin-center transition-transform duration-300 ease-in-out ${
                      activeSection === item.target ? 'scale-x-100' : 'group-hover:scale-x-50'
                    }`}></span>
                  </span>
                </ScrollLink>
                {index < arr.length - 1 && (
                  <div className="h-4 w-px bg-gray-200 mx-1 menu-divider-animation" style={{ 
                    opacity: 0,
                    animationDelay: `${1500 + (index * 100)}ms` 
                  }}></div>
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