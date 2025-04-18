import * as React from "react"
import Header from "../Header"
import Footer from "../Footer"

const Layout = ({ children }) => {
  return (
    <div className="bg-background text-gray-900 min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout