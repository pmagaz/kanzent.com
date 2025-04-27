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
                src="/images/KaizentLogoHeader.svg" 
                alt="Kaizent Logo" 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-gray-600 leading-relaxed mb-5">
              Engineering Crafted with Excellence<br/>
              Where Quality Meets Possibility
            </p>
            <div className="flex gap-4">
              {['linkedin', 'instagram'].map(platform => (
                <a 
                  key={platform} 
                  href={`https://${platform}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white transition-colors duration-200 hover:bg-accent"
                >
                  <span className="text-sm">{platform.charAt(0).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px] max-w-[250px]">
            <h3 className="text-primary text-xl font-bold mb-5">
              Resources
            </h3>
            <ul className="list-none p-0 m-0">
              {[
                { name: 'Blog', target: 'blog' },
                { name: 'Technology', target: 'technology' },
                { name: 'Case Studies', target: 'case-studies' },
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
          
          {/* <div className="flex-1 min-w-[200px] max-w-[250px]">
            <h3 className="text-primary text-xl font-bold mb-5">
              Resources
            </h3>
            <ul className="list-none p-0 m-0">
              {[
                'Blog',
                'Technology',
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
          </div> */}
          
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
          <p>&copy; {new Date().getFullYear()} Kaizent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer