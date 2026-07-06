import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-fade-in-down">
      <h1 className="text-9xl font-extrabold text-accent mb-4 tracking-tighter">404</h1>
      <h2 className="text-3xl font-bold mb-6 text-content-main-light dark:text-content-main-dark">Page Not Found</h2>
      <p className="text-content-sub-light dark:text-content-sub-dark mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/home" 
        className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-semibold shadow-accent transition-all duration-300 hover:scale-105 flex items-center gap-2"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
