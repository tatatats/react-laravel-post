import React from 'react';
import headerImage from '../assets/Header.bmp';

const Header = () => {
    return (
      <header style={{
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
      </header>
    );
};
  
  export default Header;