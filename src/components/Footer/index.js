import * as React from "react"
import { Link } from "gatsby"
import { Link as ScrollLink } from "react-scroll"
import { COLORS } from "../../const/colors"

const Footer = () => {
  return (
    <footer className="bg-slate-100 py-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-wrap justify-between gap-10 mb-12">
          <div className="flex-1 min-w-[250px] max-w-[400px]">
            <Link to="/" className="inline-block mb-5">
              <img 
                src="/images/KaizensLogoHeader.svg" 
                alt="Kaizens Logo" 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-gray-600 leading-relaxed mb-5">
              Kaizens is dedicated to helping organizations achieve continuous improvement 
              through small, incremental changes that lead to significant long-term results.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map(platform => (
                <a 
                  key={platform} 
                  href={`https://${platform}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white transition-colors duration-200 hover:bg-secondary"
                >
                  <span className="text-sm">{platform.charAt(0).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px] max-w-[250px]">
            <h3 className="text-primary text-xl font-bold mb-5">
              Quick Links
            </h3>
            <ul className="list-none p-0 m-0">
              {[
                { name: 'Story', target: 'history' },
                { name: 'Vision', target: 'vision' },
                { name: 'Developments', target: 'programs' },
                { name: 'Contact Us', target: 'contact' }
              ].map(item => (
                <li key={item.name} className="mb-3">
                  <ScrollLink 
                    to={item.target}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    className="text-gray-600 no-underline transition-colors duration-200 cursor-pointer hover:text-secondary"
                  >
                    {item.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 min-w-[200px] max-w-[250px]">
            <h3 className="text-primary text-xl font-bold mb-5">
              Resources
            </h3>
            <ul className="list-none p-0 m-0">
              {[
                'Blog',
                'Case Studies',
                'Whitepapers',
                'Newsletter'
              ].map(item => (
                <li key={item} className="mb-3">
                  <Link 
                    to="/"
                    className="text-gray-600 no-underline transition-colors duration-200 hover:text-secondary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 min-w-[200px] max-w-[250px]">
            <h3 className="text-primary text-xl font-bold mb-5">
              Legal
            </h3>
            <ul className="list-none p-0 m-0">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy',
                'Accessibility'
              ].map(item => (
                <li key={item} className="mb-3">
                  <Link 
                    to="/"
                    className="text-gray-600 no-underline transition-colors duration-200 hover:text-secondary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-5 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Kaizens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer