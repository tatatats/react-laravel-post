import React from 'react';
//import headerImage from '../assets/Footer.bmp';

const Footer = () => {
    return (
      <footer style={{
        height: '60px',
        backgroundColor: '#e46f0a',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p style={{ margin: 0 }}>&copy; 2025 My Blog</p>
      </footer>
    );
};
  
export default Footer;