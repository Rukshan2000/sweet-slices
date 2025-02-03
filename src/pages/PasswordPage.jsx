import React, { useState } from 'react';

function PasswordPage() {
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const correctPassword = '1234';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Set submitted to true when the form is submitted
    if (password === correctPassword) {
      window.location.href = '/locate';
    } else {
      
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="p-8 bg-gray-800 border-4 border-pink-600 rounded">
        {/* Page title */}
        <h1 className="mb-8 text-4xl font-bold text-pink-600">SWEET SICES</h1>
        {/* Password form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label htmlFor="password" className="mb-4 text-white">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-1 mb-4 border border-gray-300 rounded"
          />
          <button type="submit" className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-pink-600">Submit</button>
        </form>
        {/* Alert box for incorrect password */}
        {submitted && password !== correctPassword && (
          <div className="mt-4 text-pink-600">Incorrect password. Please try again.</div>
        )}
      </div>
    </div>
  );
}

export default PasswordPage;
