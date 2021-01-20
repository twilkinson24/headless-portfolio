import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

import '../assets/style.css'

function Layout({ children }) {
  return (
      <div className="flex flex-col min-h-screen" style={{ animation: 'fadeIn 800ms ease-in'}}>
        <Header />
          <div className="flex-1 w-full mx-auto">
            {children}
            <Footer />
          </div>
      </div>
  );
}

export default Layout;