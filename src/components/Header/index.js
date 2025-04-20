import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Link as ScrollLink, Events, scrollSpy } from "react-scroll"
import { isMobile } from "../../utils/device"

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');
  const [inHeroSection, setInHeroSection] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isMobileDevice, setIsMobileDevice] = React.useState(false);
  const location = useLocation();
  
  // Check if we're on the case studies page
  const isCaseStudiesPage = React.useMemo(() => {
    return location.pathname.includes('/case-studies/');
  }, [location]);
  
  // Set initial mobile state on mount and add resize listener
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(isMobile());
      
      // Close mobile menu if device is no longer mobile
      if (!isMobile() && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);
  
  // If we're on a case studies page, set the active section
  React.useEffect(() => {
    if (isCaseStudiesPage) {
      setActiveSection('case-studies');
      setInHeroSection(false);
    }
  }, [isCaseStudiesPage]);
  
  React.useEffect(() => {
    // Initialize scrollSpy
    scrollSpy.update();
    
    // Register to the Events to get active section updates
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});
    
    const handleScroll = () => {
      // Get the height of the hero section
      const heroElement = document.getElementById('hero');
      const heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight;
      
      // Skip scroll logic on case studies page
      if (isCaseStudiesPage) {
        setScrolled(true);
        return;
      }
      
      // Check if we're in the hero section
      if (window.scrollY < (heroHeight - 150)) { // Adjust the 150px threshold as needed
        setInHeroSection(true);
        setActiveSection(''); // Clear active section when in hero
      } else {
        setInHeroSection(false);
      }
      
      // Header background logic
      if (window.scrollY > heroHeight * 0.7) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Only find active section if not in hero section
      if (!inHeroSection) {
        const sections = ['history', 'vision', 'technology', 'case-studies', 'contact'];
        
        // Check which section is currently in view
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Calculate the threshold based on the header height
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
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Override react-scroll's active class handling
    const originalSetActive = ScrollLink.prototype.setActiveLink;
    if (originalSetActive) {
      ScrollLink.prototype.setActiveLink = function(to) {
        // Only set active if not in hero section
        if (!inHeroSection) {
          originalSetActive.call(this, to);
        } else {
          // If in hero, don't set active
          this.setState({ active: false });
        }
      };
    }
    
    // Trigger initial update
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
      
      // Restore original function if modified
      if (originalSetActive) {
        ScrollLink.prototype.setActiveLink = originalSetActive;
      }
    };
  }, [inHeroSection, activeSection, isCaseStudiesPage]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Close mobile menu when a link is clicked
  const handleNavItemClick = () => {
    if (isMobileDevice) {
      setMobileMenuOpen(false);
    }
  };
  
  // Navigation items
  const navItems = [
    { name: 'Story', target: 'history' },
    { name: 'Vision', target: 'vision' },
    { name: 'Technology', target: 'technology' },
    { name: 'Case Studies', target: 'case-studies' },
    { name: 'Contact', target: 'contact' }
  ];
  
  // Hamburger icon for mobile
  const HamburgerIcon = () => (
    <button 
      className="flex flex-col justify-center items-center focus:outline-none"
      onClick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      <span className={`block w-6 h-0.5 bg-primary my-0.5 transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-primary my-0.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-primary my-0.5 transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
    </button>
  );
  
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
              src="/images/KaizentLogoHeader.svg" 
              alt="Kaizens Logo" 
              className="h-10 w-auto mr-2.5"
            />
          </Link>
        </div>
        
        <div className="flex items-center">
          {/* Hamburger for mobile */}
          {isMobileDevice && (
            <HamburgerIcon />
          )}
          
          {/* Desktop navigation */}
          {!isMobileDevice && (
            <nav className="flex items-center">
              {navItems.map((item, index, arr) => {
                // On case studies page, use Gatsby Link for all except Case Studies itself
                const isActive = !inHeroSection && activeSection === item.target;
                const isActiveOnCaseStudiesPage = isCaseStudiesPage && item.target === 'case-studies';
                
                // Determine if we should use a Gatsby Link or a ScrollLink
                const useGatsbyLink = isCaseStudiesPage && item.target !== 'case-studies';
                
                return (
                  <React.Fragment key={item.name}>
                    {useGatsbyLink ? (
                      <Link 
                        to={`/#${item.target}`}
                        className={`menu-item-animation px-3 py-2 no-underline cursor-pointer font-medium transition-all duration-200 ease-in-out hover:text-accent relative group ${
                          isActive || isActiveOnCaseStudiesPage ? 'text-accent' : 'text-primary'
                        }`}
                        style={{ 
                          opacity: 1, // Don't animate on case studies page
                          animationDelay: `${1300 + (index * 100)}ms` 
                        }}
                      >
                        <span className="relative">
                          {item.name}
                          <span className={`absolute -bottom-6 left-0 w-full h-[2px] bg-accent transform scale-x-0 origin-center transition-transform duration-300 ease-in-out ${
                            isActive || isActiveOnCaseStudiesPage ? 'scale-x-100' : 'group-hover:scale-x-50'
                          }`}></span>
                        </span>
                      </Link>
                    ) : (
                      <ScrollLink 
                        to={item.target}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className={`menu-item-animation px-3 py-2 no-underline cursor-pointer font-medium transition-all duration-200 ease-in-out hover:text-accent relative group ${
                          isActive || isActiveOnCaseStudiesPage ? 'text-accent' : 'text-primary'
                        }`}
                        style={{ 
                          opacity: isCaseStudiesPage ? 1 : 0, // Ensure it's visible on case studies page
                          animationDelay: `${1300 + (index * 100)}ms` 
                        }}
                        onSetActive={() => {
                          if (!inHeroSection) {
                            setActiveSection(item.target);
                          }
                        }}
                      >
                        <span className="relative">
                          {item.name}
                          <span className={`absolute -bottom-6 left-0 w-full h-[2px] bg-accent transform scale-x-0 origin-center transition-transform duration-300 ease-in-out ${
                            isActive || isActiveOnCaseStudiesPage ? 'scale-x-100' : 'group-hover:scale-x-50'
                          }`}></span>
                        </span>
                      </ScrollLink>
                    )}
                    {index < arr.length - 1 && (
                      <div className="h-4 w-px bg-gray-200 mx-1 menu-divider-animation" style={{ 
                        opacity: isCaseStudiesPage ? 1 : 0,
                        animationDelay: `${1500 + (index * 100)}ms` 
                      }}></div>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}
        </div>
      </div>
      
      {/* Mobile Menu - Slide down when open */}
      {isMobileDevice && (
        <div 
          className={`absolute left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 py-0'
          }`}
          style={{
            top: '72px', // Align with bottom of header
          }}
        >
          <nav className="flex flex-col px-8">
            {navItems.map((item) => {
              // On case studies page, use Gatsby Link for all except Case Studies itself
              const isActive = !inHeroSection && activeSection === item.target;
              const isActiveOnCaseStudiesPage = isCaseStudiesPage && item.target === 'case-studies';
              
              // Determine if we should use a Gatsby Link or a ScrollLink
              const useGatsbyLink = isCaseStudiesPage && item.target !== 'case-studies';
              
              return (
                <React.Fragment key={item.name}>
                  {useGatsbyLink ? (
                    <Link 
                      to={`/#${item.target}`}
                      className={`py-3 no-underline cursor-pointer font-medium transition-all duration-200 ease-in-out border-b border-gray-100 ${
                        isActive || isActiveOnCaseStudiesPage ? 'text-accent' : 'text-primary'
                      }`}
                      onClick={handleNavItemClick}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <ScrollLink 
                      to={item.target}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`py-3 no-underline cursor-pointer font-medium transition-all duration-200 ease-in-out border-b border-gray-100 ${
                        isActive || isActiveOnCaseStudiesPage ? 'text-accent' : 'text-primary'
                      }`}
                      onClick={handleNavItemClick}
                      onSetActive={() => {
                        if (!inHeroSection) {
                          setActiveSection(item.target);
                        }
                      }}
                    >
                      {item.name}
                    </ScrollLink>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header