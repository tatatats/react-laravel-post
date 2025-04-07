import React from 'react';
import headerImage from '../assets/Footer.bmp';

const Footer = () => {
    return (
        <footer style={{
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            textAlign: 'center',
            height: '60px',           // ★ 高さを固定
            padding: '0 1rem',        // ★ 上下paddingをなくす
            display: 'flex',          // ★ 中央配置用
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <p style={{ margin: 0 }}>&copy; 2025 My Blog</p>
        </footer>
    );
};
  
export default Footer;