import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section className="home-grid">
      <div className="box-container">
        <div className="box">
          <h3 className="title">Error : 404</h3>
          <p className="tutor">Page not found !</p>
          <Link to={`/`} className="inline-btn">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
