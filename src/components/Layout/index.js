import * as React from "react"
import Header from "../Header"
import Footer from "../Footer"

const Layout = ({ children }) => {
  return (
    <div style={{ background: 'white', color: '#111', minHeight: '100vh' }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout