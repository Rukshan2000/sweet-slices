import React, { useEffect } from 'react';

function Splash() {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      // Redirect to the desired page after 2 seconds
      window.location.href = '/passwordpage';
    }, 2000);

    return () => clearTimeout(redirectTimer); // Clear the timer on unmount
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative inline-flex">
        <div className="w-10 h-10 bg-pink-500 rounded-full"></div>
        <div className="absolute top-0 left-0 w-10 h-10 bg-pink-500 rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-10 h-10 bg-pink-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

export default Splash;
