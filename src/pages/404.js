import * as React from "react"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white mb-8">Page not found</p>
        <a href="/" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded">
          Go back to homepage
        </a>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <title>Not Found | Vista.io</title>