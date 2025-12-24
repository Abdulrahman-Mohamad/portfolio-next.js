import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 border-t mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
