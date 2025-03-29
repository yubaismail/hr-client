import React from 'react';
import Button from '../ui/Button';

const Header = () => {
  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="w-full bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">HRMS</h1>
      <Button 
        onClick={handleLogout} 
        className="bg-gray-700 hover:bg-gray-800"
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;