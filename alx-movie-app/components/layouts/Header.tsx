import React from "react";
import Link from "next/link";

const Header: React.FC = () => (
  <header className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        <Link href="/">MovieApp</Link>
      </h1>
      <nav className="space-x-4">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          About
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;