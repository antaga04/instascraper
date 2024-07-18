import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>
        Built by{' '}
        <a className='devil-detail' href="https://adrian-anta.netlify.app" target="_blank" rel="noopener noreferrer">
          Adrián Anta
        </a>
      </p>
      <ul className="social-media">
        <li>
          <a href="https://www.linkedin.com/in/adrian-anta-gil" target="blank" rel="noopener">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/antaga04" target="blank" rel="noopener">
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
