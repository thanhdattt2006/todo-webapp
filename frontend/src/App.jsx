import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
      </Route>
      <Route path="*" element={
        <div className="relative min-h-screen bg-background-light dark:bg-background-dark">
          <div className="ambient-glow"></div>
          <NotFoundPage />
        </div>
      } />
    </Routes>
  );
}

export default App;
