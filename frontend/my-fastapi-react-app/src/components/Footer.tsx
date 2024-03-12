import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 sticky bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} FARM Stack Agency</p>
      </div>
    </footer>
  );
}

export default Footer;
