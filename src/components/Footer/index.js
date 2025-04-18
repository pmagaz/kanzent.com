import * as React from "react"
import { Link } from "gatsby"
import { Link as ScrollLink } from "react-scroll"

// Define color constants
const COLORS = {
  main: '#03395dfb',
  accent: '#65d0ffff',
};

const Footer = () => {
  return (
    <footer style={{ 
      background: '#f1f5f9',
      padding: '60px 0 30px',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 32px'
      }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '40px',
          marginBottom: '50px'
        }}>
          <div style={{ flex: '1', minWidth: '250px', maxWidth: '400px' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
              <img 
                src="/images/KaizensLogoHeader.svg" 
                alt="Kaizens Logo" 
                style={{ height: '40px', width: 'auto' }} 
              />
            </Link>
            <p style={{ 
              color: '#555', 
              lineHeight: '1.7',
              marginBottom: '20px'
            }}>
              Kaizens is dedicated to helping organizations achieve continuous improvement 
              through small, incremental changes that lead to significant long-term results.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {['twitter', 'facebook', 'linkedin', 'instagram'].map(platform => (
                <a 
                  key={platform} 
                  href={`https://${platform}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: COLORS.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = COLORS.accent}
                  onMouseLeave={(e) => e.target.style.background = COLORS.primary}
                >
                  <span style={{ fontSize: '14px' }}>{platform.charAt(0).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div style={{ flex: '1', minWidth: '200px', maxWidth: '250px' }}>
            <h3 style={{ 
              color: COLORS.primary, 
              fontSize: '20px', 
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Solutions', target: 'solutions' },
                { name: 'Vision', target: 'vision' },
                { name: 'Programs', target: 'programs' },
                { name: 'Contact Us', target: 'contact' }
              ].map(item => (
                <li key={item.name} style={{ marginBottom: '12px' }}>
                  <ScrollLink 
                    to={item.target}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    style={{ 
                      color: '#555', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.color = COLORS.accent}
                    onMouseLeave={(e) => e.target.style.color = '#555'}
                  >
                    {item.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ flex: '1', minWidth: '200px', maxWidth: '250px' }}>
            <h3 style={{ 
              color: COLORS.primary, 
              fontSize: '20px', 
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Resources
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Blog',
                'Case Studies',
                'Whitepapers',
                'Newsletter'
              ].map(item => (
                <li key={item} style={{ marginBottom: '12px' }}>
                  <Link 
                    to="/"
                    style={{ 
                      color: '#555', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = COLORS.accent}
                    onMouseLeave={(e) => e.target.style.color = '#555'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ flex: '1', minWidth: '200px', maxWidth: '250px' }}>
            <h3 style={{ 
              color: COLORS.primary, 
              fontSize: '20px', 
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Legal
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy',
                'Accessibility'
              ].map(item => (
                <li key={item} style={{ marginBottom: '12px' }}>
                  <Link 
                    to="/"
                    style={{ 
                      color: '#555', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = COLORS.accent}
                    onMouseLeave={(e) => e.target.style.color = '#555'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid #e5e7eb',
          paddingTop: '20px',
          textAlign: 'center',
          color: '#777',
          fontSize: '14px'
        }}>
          <p>&copy; {new Date().getFullYear()} Kaizens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer