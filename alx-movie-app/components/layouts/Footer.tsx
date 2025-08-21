import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white p-4 mt-8">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer; 
