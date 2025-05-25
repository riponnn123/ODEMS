import { Link } from 'react-router-dom';
import '../styles/main.css';
import heroImg from '../assets/hero-event.svg'; // Assuming you have a hero image in your assets

const Home = () => {
  return (
    <div className="homepage-hero">
      <section className="hero text-center">
        <img src={heroImg} alt="Event Management Illustration" />
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
              <p>Bring your ideas to life by creating events that inspire and engage.</p>
            </div>
            <div className="card">
              <h3>Event Managing</h3>
              <p>Stay in control—manage your events seamlessly from start to finish.</p>
            </div>
            <div className="card">
              <h3>Participate Your Favourite Events</h3>
              <p>Join the excitement—participate in your favorite events and make every moment count!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
