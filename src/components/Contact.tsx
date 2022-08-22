import React from 'react'

export default function Contact () {
  const FacebookLogo = require('@/assets/facebook.svg')
  const InstaLogo = require('@/assets/instalogoB&W.svg')
  const EmailLogo = require('@/assets/emailLogo.svg')

  return (
    <div className="contact-page-container">
      <p>
        Reach out for information
      </p>
      <div className="contact-logo-container">
        <a href="mailto:example@email.com">
          <img className="social-logo" src={EmailLogo} />
        </a>

        <a href="#">
          <img className="social-logo" src={InstaLogo} />
        </a>
        <a href="#">
          <img className="social-logo" src={FacebookLogo} />
        </a>
      </div>
      <Footer />
    </div>
  )
}

const Footer: React.FC = () => {
  const style: React.CSSProperties = {
    position: 'fixed',
    bottom: '0',
    fontSize: '8px',
    color: 'rgba(0,0,0,0.6)',
    zIndex:'0'
  }

  return (
    <div className="footer" style={style}>
      <div className="footer-text">Copyright © 2021 Daniel Doull</div>
    </div>
  )
}
