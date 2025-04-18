import * as React from "react"
import { Link } from "gatsby"
import { Link as ScrollLink } from "react-scroll"

// Define color constants
const COLORS = {
  main: '#03395dfb',
  accent: '#FF499E',
};

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
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 20, 
      padding: '16px 32px',
      background: '#F8FAFB',
      backdropFilter: scrolled ? 'blur(5px)' : 'none',
      boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.05)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}>
            <img 
              src="/images/KaizensLogoHeader.svg" 
              alt="Kaizens Logo" 
              style={{ height: '40px', width: 'auto', marginRight: '10px' }} 
            />
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <nav style={{ display: 'flex', alignItems: 'center' }}>
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
                  style={{ 
                    color: COLORS.primary, 
                    textDecoration: 'none', 
                    padding: '0 16px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}
                  activeStyle={{ color: COLORS.accent }}
                  onMouseEnter={(e) => e.target.style.color = COLORS.accent}
                  onMouseLeave={(e) => e.target.style.color = COLORS.primary}
                >
                  {item.name}
                </ScrollLink>
                {index < arr.length - 1 && (
                  <div style={{ height: '16px', width: '1px', background: '#ddd' }}></div>
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