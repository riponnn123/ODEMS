import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero text-center">
        <h1 className="mb-2">Welcome to ODEMS</h1>
        <p className="mb-2">Your one-stop solution for efficient Event Management</p>
        <Link to="/register" className="btn btn-primary">Get Started</Link>
      </section>

      <section className="features mt-2">
        <div className="card">
          <h2>Features</h2>
          <div className="flex gap-2 mt-1">
            <div className="card">
              <h3>Event Creation</h3>
              <p>Efficiently manage and organize your documents</p>
            </div>
            <div className="card">
              <h3>Event Managing</h3>
              <p>Track and monitor document requests</p>
            </div>
            <div className="card">
              <h3>Participate Your Favourite Events</h3>
              <p>Secure and controlled access to documents</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
