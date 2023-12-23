import React from 'react';
import './Preloader.css';

function Preloader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="preloader">
      <div className="preloader__spinner"/>
    </div>
  );
}

export default Preloader;
