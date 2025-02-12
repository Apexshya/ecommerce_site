import React from 'react';

const Footer = () => {
  const footerStyle = {
    position: 'fixed', 
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: '#000000', 
    color: 'white',
    textAlign: 'center',
    padding: '20px 0',
    zIndex: '1000', 
  };

  const containerStyle = {
    textAlign: 'center',
  };

  const paragraphStyle = {
    marginBottom: '0',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={paragraphStyle}>
          <i className="bi bi-shop"></i> E-Shop © 2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
